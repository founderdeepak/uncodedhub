-- Uncoded Hub — Supabase hardening pass
--
-- Run this once in the Supabase dashboard's SQL Editor (Database -> SQL Editor)
-- after rotating the Postgres password (see the security review that prompted
-- this file). It does not need setup_db.mjs or the DB connection string.
--
-- WHAT THIS FIXES: the anon-insert policies on contact_submissions,
-- leads_backup and chatbot_leads accept unlimited-size text and unlimited
-- request volume. A scripted flood against the public anon key (visible in
-- the client bundle by design — that is how Supabase's anon key is meant to
-- work) could otherwise fill these tables with gigabytes of junk text or
-- thousands of rows per minute, and each insert fans out through the
-- Supabase webhook to the Apps Script mailer, so a flood here becomes a
-- flood of outbound email too. Row-level rate limiting can't be expressed
-- through RLS alone (there is no reliable caller identity to key on for an
-- anonymous public form), so this caps size and enforces a coarse per-email
-- velocity limit as a practical backstop, not a complete replacement for
-- putting a real CAPTCHA in front of these forms later.

-- ── Size caps ──────────────────────────────────────────────────────────
alter table public.contact_submissions
  add constraint contact_submissions_name_len check (char_length(name) <= 255),
  add constraint contact_submissions_email_len check (char_length(email) <= 255),
  add constraint contact_submissions_details_len check (char_length(project_details) <= 8000);

alter table public.leads_backup
  add constraint leads_backup_name_len check (char_length(name) <= 255),
  add constraint leads_backup_email_len check (char_length(email) <= 255),
  add constraint leads_backup_details_len check (char_length(project_details) <= 8000);

alter table public.chatbot_leads
  add constraint chatbot_leads_name_len check (char_length(name) <= 255),
  add constraint chatbot_leads_email_len check (char_length(email) <= 255),
  add constraint chatbot_leads_msg_len check (char_length(initial_message) <= 4000);

-- ── Per-email velocity limit ──────────────────────────────────────────
-- Rejects an insert if the same email address has already submitted 5+
-- rows across these three tables in the last hour. Real visitors never hit
-- this; a script hammering the anon endpoint does.
create or replace function public.enforce_lead_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  recent_count integer;
begin
  select count(*) into recent_count
  from (
    select created_at from public.contact_submissions where email = new.email and created_at > now() - interval '1 hour'
    union all
    select created_at from public.leads_backup where email = new.email and created_at > now() - interval '1 hour'
    union all
    select created_at from public.chatbot_leads where email = new.email and created_at > now() - interval '1 hour'
  ) recent;

  if recent_count >= 5 then
    raise exception 'Too many submissions from this email address recently. Please wait before trying again.';
  end if;

  return new;
end;
$$;

drop trigger if exists lead_rate_limit on public.contact_submissions;
create trigger lead_rate_limit
  before insert on public.contact_submissions
  for each row execute function public.enforce_lead_rate_limit();

drop trigger if exists lead_rate_limit on public.leads_backup;
create trigger lead_rate_limit
  before insert on public.leads_backup
  for each row execute function public.enforce_lead_rate_limit();

drop trigger if exists lead_rate_limit on public.chatbot_leads;
create trigger lead_rate_limit
  before insert on public.chatbot_leads
  for each row execute function public.enforce_lead_rate_limit();
