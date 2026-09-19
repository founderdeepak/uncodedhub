/**
 * Uncoded Hub — Lead Magnet Delivery Apps Script (Pre-Sold Prospects Audit)
 *
 * WHAT THIS IS FOR
 * The "Grab Your FREE Pre-Sold Prospects Audit" form on the site
 * (src/components/ui/LeadMagnetForm.tsx) is a native form that POSTs
 * directly here from the browser — no Kit/ConvertKit involved anywhere in
 * this flow. This script's only job is to validate the request and fire a
 * Resend event (`lead_magnet.audit_signup`); the actual audit email —
 * along with the rest of the 6-email nurture sequence — is sent by the
 * Resend Automation already configured in the Resend dashboard
 * (Automations → Pre-Sold Prospects Audit). This script does not build or
 * send any email content itself.
 *
 * WHY THIS SCRIPT EXISTS AT ALL
 * Resend's API key is a full-access secret (unlike Kit's public form
 * endpoint, Resend has no browser-safe public endpoint) — if it sat in the
 * site's JS bundle, anyone could read it out of the bundle and send email
 * or read contacts through your Resend account. This script is the small
 * server that holds that key so the browser never sees it.
 *
 * WHY THIS SCRIPT SETS THE CONTACT'S NAME ITSELF
 * The automation's "Send email" step uses {{FIRST_NAME}}, which is a
 * reserved template variable read from the Resend Contact record, not
 * from the event payload — so this script upserts the contact's
 * first_name via Resend's plain Contacts API (upsertContact() below)
 * before firing the event, rather than relying on a "contact_update" step
 * inside the automation. That step type exists in Resend's automation
 * builder but its variable-binding config (documented as
 * `{"var": "event.first_name"}`) did not reliably resolve when tested —
 * it either wrote the literal string instead of substituting it, or
 * failed to find the contact at all (`contact_id: "none"`) depending on
 * the exact config shape tried. The plain Contacts API has none of that
 * ambiguity: it is a direct, synchronous field write.
 *
 * SETUP (one-time, in script.google.com — nothing in this repo can deploy
 * this directly; see booking-google-script.js's header for why)
 * 1. https://script.google.com → New project → paste this file in as
 *    "Code.gs" (replacing the default content). If a deployment from an
 *    earlier version of this script already exists, edit that same
 *    project instead so the Web App URL doesn't change.
 * 2. Project Settings (gear icon) → Script Properties → add two properties:
 *      RESEND_API_KEY        = the secret value for the Resend API key
 *                               named "Lead Magnet Webhook (Apps Script)"
 *                               in the Resend dashboard (Resend only shows
 *                               a key's value once, at creation — if it was
 *                               never copied down, delete that key in
 *                               Resend and create a fresh one, then use
 *                               that value here instead).
 *      WEBHOOK_SHARED_SECRET  = any random string you make up (e.g. a
 *                               password generator's output). This is
 *                               sent as `token` in the POST body from the
 *                               browser (see LEAD_MAGNET_SECRET in
 *                               LeadMagnetForm.tsx). It is bundled into the
 *                               frontend build, so it does not stop someone
 *                               who reads the JS bundle, but it does stop
 *                               generic scanners/bots hitting this URL
 *                               blind — the real abuse defense is
 *                               withinAuditLimits() below.
 * 3. Deploy → New deployment (or, if editing an existing deployment,
 *    Manage deployments → edit → New version) → type "Web app" →
 *    Execute as "Me", Who has access "Anyone" → Deploy. Authorize the
 *    permissions prompt (this script only calls an external URL).
 * 4. Copy the deployment's Web App URL into LEAD_MAGNET_SCRIPT_URL in
 *    src/components/ui/LeadMagnetForm.tsx, and put the same
 *    WEBHOOK_SHARED_SECRET value into VITE_LEAD_MAGNET_SECRET (see
 *    .env.example) for every environment that builds the frontend.
 *
 * CORS
 * The browser POSTs with `Content-Type: text/plain;charset=utf-8` (see
 * LeadMagnetForm.tsx) specifically so this stays a CORS "simple request"
 * and never triggers a preflight OPTIONS call, which Apps Script Web Apps
 * don't handle. ContentService responses already carry
 * `Access-Control-Allow-Origin: *` on their own (confirmed via
 * booking-google-script.js's live testing), so no extra CORS handling is
 * needed here.
 */

var RESEND_EVENT_NAME = 'lead_magnet.audit_signup';

function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Strips line breaks so a submitted name can't inject extra lines into a
 *  single-line context. */
function singleLine(value) {
  return String(value == null ? '' : value).replace(/[\r\n]+/g, ' ').trim();
}

function resendRequest(apiKey, method, path, body) {
  return UrlFetchApp.fetch('https://api.resend.com' + path, {
    method: method,
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + apiKey },
    payload: body ? JSON.stringify(body) : undefined,
    muteHttpExceptions: true
  });
}

/** Sets the contact's first_name via Resend's plain Contacts API — POST to
 *  create, falling back to PATCH if the contact already exists (email must
 *  be unique, so POST 409s for a returning subscriber). This is what makes
 *  {{FIRST_NAME}} resolve correctly in the automation's emails; skipped
 *  entirely (not an error) when no first name was submitted, so it never
 *  overwrites an existing name with blank. */
function upsertContact(apiKey, email, firstName) {
  if (!firstName) return;

  var payload = { email: email, first_name: firstName, firstName: firstName };
  var createResponse = resendRequest(apiKey, 'post', '/contacts', payload);
  var createCode = createResponse.getResponseCode();
  if (createCode >= 200 && createCode < 300) return;

  var updatePayload = { first_name: firstName, firstName: firstName };
  var updateResponse = resendRequest(apiKey, 'patch', '/contacts/' + encodeURIComponent(email), updatePayload);
  var updateCode = updateResponse.getResponseCode();
  if (updateCode < 200 || updateCode >= 300) {
    Logger.log('Resend contact update notice: create ' + createCode + ': ' + createResponse.getContentText() +
      ' | update ' + updateCode + ': ' + updateResponse.getContentText());
  }
}

/** Fires the Resend event that triggers the audit nurture automation.
 *  Resend auto-creates a Contact for this email if none exists yet (with
 *  no name, if upsertContact() above hasn't already set one), so this is
 *  also what re-establishes the subscriber list Kit used to hold. */
function sendAuditEvent(apiKey, email, firstName) {
  var response = resendRequest(apiKey, 'post', '/events/send', {
    event: RESEND_EVENT_NAME,
    email: email,
    payload: {
      first_name: firstName,
      firstName: firstName,
      FIRST_NAME: firstName,
      name: firstName
    }
  });

  var code = response.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error('Resend API error ' + code + ': ' + response.getContentText());
  }
}

/**
 * Shared caps, keyed by hour/day in CacheService (per-script, self-expiring).
 * This endpoint is public ("Anyone" access, required for the browser to
 * call it directly) and the WEBHOOK_SHARED_SECRET token is visible to
 * anyone who reads the frontend bundle, so these caps — not the token —
 * are the real defense against a scripted flood triggering the automation
 * for arbitrary addresses or burning through the Resend account's quota.
 * Mirrors withinBookingLimits() in booking-google-script.js.
 */
function withinAuditLimits(email) {
  var cache = CacheService.getScriptCache();
  var hourKey = 'audit_count_' + Utilities.formatDate(new Date(), 'UTC', 'yyyyMMddHH');
  var hourCount = parseInt(cache.get(hourKey) || '0', 10) + 1;
  cache.put(hourKey, String(hourCount), 3600);
  if (hourCount > 30) return false;

  var dayKey = 'audit_email_' + Utilities.formatDate(new Date(), 'UTC', 'yyyyMMdd') + '_' + email.trim().toLowerCase();
  var dayCount = parseInt(cache.get(dayKey) || '0', 10) + 1;
  cache.put(dayKey, String(dayCount), 21600); // cache max TTL is 6h; good enough to blunt a burst
  if (dayCount > 3) return false;

  return true;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents || '{}');

    var expectedToken = PropertiesService.getScriptProperties().getProperty('WEBHOOK_SHARED_SECRET');
    if (expectedToken && data.token !== expectedToken) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var email = data.email;
    var firstName = singleLine(data.first_name || data.firstName || data.name || '');

    if (!isValidEmail(email)) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'invalid or missing email' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    email = email.trim();

    if (!withinAuditLimits(email)) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'too many requests — please try again later' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var apiKey = PropertiesService.getScriptProperties().getProperty('RESEND_API_KEY');
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not set in Script Properties.');
    }

    upsertContact(apiKey, email, firstName);
    sendAuditEvent(apiKey, email, firstName);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
