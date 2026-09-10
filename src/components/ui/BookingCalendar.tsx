import React, { useEffect, useMemo, useState } from 'react';
import { submitLead } from '../../lib/supabase';

/* ═══════════════════════════════════════════════════════════════════
   BOOKING CALENDAR

   Rewritten from CalendlySlotPicker. Three defects were fixed there,
   all of which were losing or corrupting real bookings:

   1. DATE OFF BY ONE.
      The old code sent `selectedDate.toISOString().split('T')[0]`.
      Calendar cells are constructed at local midnight, so in IST
      (UTC+5:30) toISOString() rolls back to 18:30 the previous day —
      every booking made from India was written to the database and the
      calendar with yesterday's date. Dates are now formatted from the
      local calendar fields directly.

   2. TIMEZONE.
      Slots were generated in the *visitor's* local wall clock, and the
      page claimed availability "8:00 AM to 8:00 PM in your local
      timezone" — while the two hosts are in India and another panel on
      the same page said 8:00–20:00 IST. A visitor in New York could
      book 7:40 PM their time, which is 6:10 AM in Bengaluru.
      Availability is now defined once, in IST, converted to a real UTC
      instant, and only then rendered in the visitor's timezone. The
      offered times are always inside working hours for both parties.

   3. MONTH PAGING ACROSS A YEAR BOUNDARY.
      `prev.getMonth() >= today.getMonth()` compares bare month indices,
      so in January the back button was stuck. It now compares instants.

   A fourth defect is fixed here: nothing previously checked whether a
   slot was already booked before offering it. The Apps Script now
   reports busy ranges for the selected day (fetched below) so taken
   slots are hidden, and it re-checks for a conflict again immediately
   before creating the event — the client-side filter is a UX nicety,
   the server-side check is what actually prevents a double-booking if
   two people pick the same slot within moments of each other.

   India does not observe daylight saving, so the +5:30 offset is a
   constant and no timezone library is needed.
   ═══════════════════════════════════════════════════════════════════ */

const IST_OFFSET_MIN = 330;
const SLOT_MINUTES = 20;
const DAY_START_HOUR = 8; // 08:00 IST
const DAY_END_HOUR = 20; // last call ends at 20:00 IST
const LEAD_TIME_MIN = 60; // no bookings inside the next hour

export interface Host {
  name: string;
  role: string;
  image: string;
  description: string;
}

export const HOSTS: Host[] = [
  {
    name: 'Deepak',
    role: 'Co-founder, Engineering',
    image: '/deepak.webp',
    description:
      'Deepak walks you through structure, build approach, and what is realistic inside a week for your project.',
  },
  {
    name: 'Geetha',
    role: 'Co-founder, Design',
    image: '/geetha.webp',
    description:
      'Geetha walks you through the design direction, and how your site will read to the customers you are trying to reach.',
  },
];

/* ── Qualification quiz ─────────────────────────────────────────────
   Short and single-tap on purpose — this call is sold as "20 minutes,
   no deck, no friction," so the quiz cannot itself become the friction.
   Answers are stored alongside the booking (Supabase + the booking
   sheet), not used to block anyone from booking. */
const NICHES = [
  'Interior design & architecture',
  'Real estate & builders',
  'Dental & aesthetic clinic',
  'Wedding & events',
  'Home renovation & modular kitchen',
  'Something else',
];
const WEBSITE_STATUS = [
  'No website yet',
  "Yes, but it's not working for us",
  "Yes, and it's working fine",
];
const TIMELINES = ['As soon as possible', 'Within a month', 'Just exploring for now'];

type Quiz = { niche: string; hasWebsite: string; timeline: string };
const quizComplete = (q: Quiz) => !!(q.niche && q.hasWebsite && q.timeline);

/* Wall-clock time in IST → the actual instant it refers to. */
function istToInstant(y: number, m: number, d: number, h: number, min: number) {
  return new Date(Date.UTC(y, m, d, h, min) - IST_OFFSET_MIN * 60_000);
}

/* Local calendar fields, never toISOString(). */
function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyX3OAhuWqclLsVXs1Wcb27s5BwfWTiyQtJxZ7s-SQ4XuGxiY81JkA5gLt68325jOIz/exec';

export function BookingCalendar({ host }: { host: Host }) {
  const viewerTz = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
    } catch {
      return 'Asia/Kolkata';
    }
  }, []);
  /* Compare offsets, not names. Chromium on Windows reports the legacy
     alias 'Asia/Calcutta' rather than 'Asia/Kolkata', so a string match
     told Indian visitors they were abroad and showed them a redundant
     "10:20 (10:20 IST)" on every slot. */
  const viewerIsIndian = useMemo(() => -new Date().getTimezoneOffset() === IST_OFFSET_MIN, []);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Date>(today);
  const [slot, setSlot] = useState<Date | null>(null);
  const [step, setStep] = useState<'quiz' | 'slot' | 'details' | 'done'>('quiz');

  const [quiz, setQuiz] = useState<Quiz>({ niche: '', hasWebsite: '', timeline: '' });
  const [form, setForm] = useState({ name: '', email: '', phone: '', business: '' });
  const [busy, setBusy] = useState(false);
  const [meetLink, setMeetLink] = useState('');
  const [failed, setFailed] = useState(false);
  const [conflict, setConflict] = useState(false);

  /* ── Live availability ────────────────────────────────────────────
     Busy ranges for the selected day, straight from the calendar.
     Fetch failure (older deployment without doGet, network hiccup) is
     swallowed on purpose: an empty busy list just means every computed
     slot is shown, same as before this existed, rather than the whole
     booking flow breaking because one GET request failed. */
  const [busyRanges, setBusyRanges] = useState<{ start: number; end: number }[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoadingAvailability(true);
    fetch(`${GOOGLE_SCRIPT_URL}?date=${toDateKey(selected)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled || !json?.busy) return;
        setBusyRanges(
          json.busy.map((b: { start: string; end: string }) => ({
            start: new Date(b.start).getTime(),
            end: new Date(b.end).getTime(),
          })),
        );
      })
      .catch(() => {
        if (!cancelled) setBusyRanges([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingAvailability(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selected]);

  /* ── Availability ──────────────────────────────────────────────── */
  const slots = useMemo(() => {
    const out: Date[] = [];
    const earliest = Date.now() + LEAD_TIME_MIN * 60_000;

    for (let h = DAY_START_HOUR; h < DAY_END_HOUR; h++) {
      for (let m = 0; m < 60; m += SLOT_MINUTES) {
        // Reserve the final slot so a 20-minute call still ends by 20:00.
        if (h === DAY_END_HOUR - 1 && m > 60 - SLOT_MINUTES) continue;

        const instant = istToInstant(
          selected.getFullYear(),
          selected.getMonth(),
          selected.getDate(),
          h,
          m,
        );
        if (instant.getTime() <= earliest) continue;

        const slotEnd = instant.getTime() + SLOT_MINUTES * 60_000;
        const taken = busyRanges.some((b) => instant.getTime() < b.end && slotEnd > b.start);
        if (!taken) out.push(instant);
      }
    }
    return out;
  }, [selected, busyRanges]);

  /* ── Calendar grid, Monday-first, with correct leading blanks ──── */
  const grid = useMemo(() => {
    const y = cursor.getFullYear();
    const m = cursor.getMonth();
    const daysIn = new Date(y, m + 1, 0).getDate();
    const firstWeekday = (new Date(y, m, 1).getDay() + 6) % 7; // Sun=0 → Mon=0

    const cells: (Date | null)[] = Array(firstWeekday).fill(null);
    for (let i = 1; i <= daysIn; i++) cells.push(new Date(y, m, i));
    return cells;
  }, [cursor]);

  const atFirstMonth =
    cursor.getFullYear() === today.getFullYear() && cursor.getMonth() === today.getMonth();

  const fmtTime = (d: Date) =>
    d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  /* Same locale as fmtTime so the two readings are directly comparable —
     mixing a 24-hour local time with a 12-hour IST time made them look
     like different kinds of measurement. */
  const fmtIst = (d: Date) =>
    d.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
    });

  /* ── Submit ────────────────────────────────────────────────────── */
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot) return;
    setBusy(true);
    setFailed(false);
    setConflict(false);

    const dateKey = toDateKey(selected);
    const details =
      `20-minute discovery call with ${host.name} — ${slot.toLocaleString(undefined, {
        dateStyle: 'full',
        timeStyle: 'short',
      })} (${viewerTz}) / ${fmtIst(slot)} IST\n\n` +
      `Quiz — Niche: ${quiz.niche}; Has website: ${quiz.hasWebsite}; Timeline: ${quiz.timeline}`;

    let ok = false;

    /* The calendar invite is the part the client actually experiences,
       so it is awaited first and its result drives the UI. */
    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          business: form.business,
          date: dateKey,
          time: fmtIst(slot),
          start_time: slot.toISOString(), // a true instant, unambiguous
          timezone: viewerTz,
          host: host.name,
          niche: quiz.niche,
          hasWebsite: quiz.hasWebsite,
          timeline: quiz.timeline,
        }),
      });
      if (res.ok) {
        const json = await res.json().catch(() => null);
        if (json?.status === 'conflict') {
          // Someone else took this slot between it being offered and
          // this submit — refresh availability and send them back to
          // pick again rather than silently retrying.
          setBusy(false);
          setConflict(true);
          setSlot(null);
          setStep('slot');
          fetch(`${GOOGLE_SCRIPT_URL}?date=${dateKey}`)
            .then((r) => (r.ok ? r.json() : null))
            .then((j) => {
              if (j?.busy) {
                setBusyRanges(
                  j.busy.map((b: { start: string; end: string }) => ({
                    start: new Date(b.start).getTime(),
                    end: new Date(b.end).getTime(),
                  })),
                );
              }
            })
            .catch(() => {});
          return;
        }
        if (json?.meetLink) setMeetLink(json.meetLink);
        ok = true;
      }
    } catch {
      /* fall through to the database write below */
    }

    const stored = await submitLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      business_type: form.business || 'Discovery booking',
      project_details: details,
    });
    if (stored) ok = true;

    setBusy(false);
    if (ok) setStep('done');
    else setFailed(true);
  };

  /* ═══════════════════════════════════════════════════════════════ */

  if (step === 'done') {
    return (
      <div className="border border-rule-strong bg-paper-raised p-10 md:p-16 text-center">
        <span className="label text-signal">Confirmed</span>
        <h2 className="font-display text-display mt-6">
          You are booked with {host.name}.
        </h2>
        <p className="text-lead text-muted mt-6">
          {slot?.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}
        </p>
        {!viewerIsIndian && slot && (
          <p className="label text-muted mt-3">{fmtIst(slot)} IST</p>
        )}
        <p className="text-muted leading-relaxed mt-8 max-w-md mx-auto">
          A calendar invitation is on its way to {form.email}. If it has not arrived in ten
          minutes, check your spam folder and then email us — we will resend it.
        </p>
        {meetLink && (
          <a href={meetLink} target="_blank" rel="noreferrer noopener" className="btn-primary mt-8">
            Open the meeting link
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="border border-rule-strong bg-paper-raised">
      {/* ── Host ─────────────────────────────────────────────────── */}
      <div className="flex items-start gap-5 p-7 md:p-9 border-b border-rule">
        <img
          src={host.image}
          alt=""
          width={80}
          height={80}
          loading="lazy"
          className="w-14 h-14 object-cover object-[50%_20%] grayscale border border-rule-strong shrink-0"
        />
        <div>
          <span className="label text-signal">{host.role}</span>
          <h2 className="font-display text-title mt-2">
            20 minutes with {host.name}
          </h2>
          <p className="text-muted leading-relaxed mt-3 max-w-md">{host.description}</p>
        </div>
      </div>

      {step === 'quiz' ? (
        <div className="p-7 md:p-9 max-w-xl">
          <span className="label text-muted">Before you pick a time</span>
          <h3 className="font-display text-title mt-3">Three quick questions.</h3>
          <p className="text-muted leading-relaxed mt-3">
            So {host.name} can walk in already knowing the shape of your business — not part of
            the 20 minutes, just before it.
          </p>

          <QuizGroup
            label="Which best describes your business?"
            options={NICHES}
            value={quiz.niche}
            onChange={(v) => setQuiz({ ...quiz, niche: v })}
          />
          <QuizGroup
            label="Do you have a website right now?"
            options={WEBSITE_STATUS}
            value={quiz.hasWebsite}
            onChange={(v) => setQuiz({ ...quiz, hasWebsite: v })}
          />
          <QuizGroup
            label="What's your timeline?"
            options={TIMELINES}
            value={quiz.timeline}
            onChange={(v) => setQuiz({ ...quiz, timeline: v })}
          />

          <button
            onClick={() => setStep('slot')}
            disabled={!quizComplete(quiz)}
            className="btn-primary w-full mt-9 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue to times
          </button>
        </div>
      ) : step === 'slot' ? (
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-rule">
          {/* ── Month ─────────────────────────────────────────────── */}
          <div className="p-7 md:p-9">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-title">
                {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
              </h3>
              <div className="flex gap-1">
                <button
                  onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
                  disabled={atFirstMonth}
                  aria-label="Previous month"
                  className="w-9 h-9 border border-rule-strong hover:border-ink disabled:opacity-30 disabled:hover:border-rule-strong transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
                  aria-label="Next month"
                  className="w-9 h-9 border border-rule-strong hover:border-ink transition-colors"
                >
                  →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mt-8">
              {WEEKDAYS.map((d) => (
                <div key={d} className="label text-muted text-center pb-2">
                  {d[0]}
                </div>
              ))}
              {grid.map((d, i) => {
                if (!d) return <div key={`b${i}`} />;
                const past = d.getTime() < today.getTime();
                const isSelected = toDateKey(d) === toDateKey(selected);
                return (
                  <button
                    key={toDateKey(d)}
                    disabled={past}
                    onClick={() => {
                      setSelected(d);
                      setSlot(null);
                      setConflict(false);
                    }}
                    aria-pressed={isSelected}
                    className={`aspect-square text-[0.9375rem] transition-colors ${
                      past
                        ? 'text-rule-strong cursor-not-allowed'
                        : isSelected
                          ? 'bg-ink text-paper'
                          : 'hover:bg-paper-sunk'
                    }`}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Times ─────────────────────────────────────────────── */}
          <div className="p-7 md:p-9">
            <h3 className="font-display text-title">
              {selected.toLocaleDateString(undefined, {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </h3>

            <p className="label text-muted mt-3">
              Times shown in {viewerTz.replace(/_/g, ' ')}
            </p>
            {!viewerIsIndian && (
              <p className="text-[0.8125rem] text-muted leading-relaxed mt-3">
                Our studio hours are 08:00–20:00 in India, so you are only offered slots that fall
                inside the working day for both of us. The India time is shown beside each one.
              </p>
            )}

            {conflict && (
              <p className="text-[0.875rem] text-signal mt-4" role="alert">
                That time was just booked by someone else. Availability below is refreshed — pick
                another time.
              </p>
            )}

            {loadingAvailability && (
              <p className="label text-muted mt-4">Checking live availability…</p>
            )}

            {slots.length === 0 ? (
              <p className="text-muted leading-relaxed mt-8">
                Nothing left on this day. Try tomorrow — or message us and we will find a time.
              </p>
            ) : (
              <div className="mt-7 grid grid-cols-2 gap-2 max-h-[22rem] overflow-y-auto pr-1">
                {slots.map((s) => {
                  const active = slot?.getTime() === s.getTime();
                  return (
                    <button
                      key={s.toISOString()}
                      onClick={() => {
                        setSlot(s);
                        setConflict(false);
                      }}
                      aria-pressed={active}
                      className={`border px-3 py-2.5 text-[0.9375rem] transition-colors ${
                        active
                          ? 'bg-ink text-paper border-ink'
                          : 'border-rule-strong hover:border-ink'
                      }`}
                    >
                      <span className="block">{fmtTime(s)}</span>
                      {!viewerIsIndian && (
                        <span
                          className={`block font-mono text-[0.6875rem] mt-0.5 ${
                            active ? 'text-paper/60' : 'text-muted'
                          }`}
                        >
                          {fmtIst(s)} IST
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <button
              onClick={() => setStep('details')}
              disabled={!slot}
              className="btn-primary w-full mt-7 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {slot ? `Continue — ${fmtTime(slot)}` : 'Choose a time'}
            </button>
          </div>
        </div>
      ) : (
        /* ── Details ───────────────────────────────────────────────── */
        <form onSubmit={submit} className="p-7 md:p-9 max-w-xl">
          <button
            type="button"
            onClick={() => setStep('slot')}
            className="label text-muted hover:text-ink transition-colors"
          >
            ← Change time
          </button>

          <p className="text-lead mt-6">
            {slot?.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}
            {!viewerIsIndian && slot && (
              <span className="text-muted"> · {fmtIst(slot)} IST</span>
            )}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <BookingField label="Your name" name="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <BookingField label="Email" name="email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            <BookingField label="Phone or WhatsApp" name="phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <BookingField label="What does your business do?" name="business" value={form.business} onChange={(v) => setForm({ ...form, business: v })} />
          </div>

          {failed && (
            <p className="text-[0.875rem] text-signal mt-6" role="alert">
              We could not confirm that booking. Nothing was charged and nothing was lost — email
              hello@uncodedhub.com or message us on WhatsApp and we will book it manually.
            </p>
          )}

          <button type="submit" disabled={busy} className="btn-primary w-full mt-8 disabled:opacity-55">
            {busy ? 'Confirming…' : 'Confirm the call'}
          </button>
          <p className="label text-muted text-center mt-4">
            Free · No obligation · Calendar invite sent immediately
          </p>
        </form>
      )}
    </div>
  );
}

function QuizGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-7">
      <span className="label text-muted block mb-3">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={active}
              className={`border px-4 py-2 text-[0.875rem] transition-colors ${
                active ? 'bg-ink text-paper border-ink' : 'border-rule-strong hover:border-ink'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BookingField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  const id = `booking-${name}`;
  return (
    <div>
      <label htmlFor={id} className="label text-muted block mb-2">
        {label}
        {required && <span className="text-signal"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-paper border border-rule-strong px-3.5 py-2.5 text-[0.9375rem] rounded-[3px] focus:border-ink transition-colors"
      />
    </div>
  );
}
