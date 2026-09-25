/**
 * UNCODED HUB — SERVERLESS EDGE API ROUTES (v2.0)
 * Scalable Headless Endpoints powering 100–200+ Client Websites
 * Built for deployment on Vercel, Supabase Edge Functions, or Cloudflare Workers.
 */

const express = require('express');
const router = express.Router();

// Middleware: Tenant Verification & Rate Limiting
async function verifyTenant(req, res, next) {
  const tenantSlug = req.query.tenant || req.body.tenant_slug || req.headers['x-tenant-slug'];
  if (!tenantSlug) {
    return res.status(400).json({ error: 'Missing required tenant identifier (x-tenant-slug)' });
  }

  // In production, fetch tenant record from Supabase / Redis Cache:
  // const tenant = await db.from('tenants').select('*').eq('slug', tenantSlug).single();
  req.tenantSlug = tenantSlug;
  next();
}

/**
 * 1. GET /api/v1/config
 * Fetches dynamic niche configuration and custom pricing overrides for a client website.
 */
router.get('/config', verifyTenant, async (req, res) => {
  try {
    const { tenantSlug } = req;
    // Mock database fetch:
    res.json({
      success: true,
      tenant: tenantSlug,
      brand_title: 'Meridian Interiors & Architecture',
      currency: '₹',
      currency_unit: 'Lakhs',
      travel_buffer_minutes: 60,
      slot_duration_minutes: 60,
      operating_hours: { start: 8, end: 16, days: [1, 2, 3, 4, 5] },
      status: 'active'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to resolve tenant config', details: error.message });
  }
});

/**
 * 2. POST /api/v1/leads
 * Gated Lead Submission: Saves lead, tags with tenant_id, and dispatches instant WhatsApp/Email alerts.
 */
router.post('/leads', verifyTenant, async (req, res) => {
  try {
    const { tenantSlug } = req;
    const { name, phone, email, address, project_type, project_size, finish_level, estimated_min, estimated_max } = req.body;

    if (!name || !phone || !email) {
      return res.status(422).json({ error: 'Name, phone, and email are required to unlock estimate' });
    }

    const leadRecord = {
      id: `lead_${Date.now()}`,
      tenant_slug: tenantSlug,
      name,
      phone,
      email,
      address: address || '',
      project_type,
      project_size,
      finish_level,
      estimated_min,
      estimated_max,
      status: 'UNRESOLVED',
      created_at: new Date().toISOString()
    };

    // In production:
    // await db.from('leads').insert([leadRecord]);
    // await NotificationService.dispatchImmediateAlert(leadRecord);

    res.status(201).json({
      success: true,
      message: 'Lead captured and queued for instant owner dispatch',
      lead_id: leadRecord.id,
      lead: leadRecord
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process lead capture', details: error.message });
  }
});

/**
 * 3. GET /api/v1/slots
 * Returns available 1-hour time slots with 1-hour travel buffer lockout enforced.
 */
router.get('/slots', verifyTenant, async (req, res) => {
  try {
    const { tenantSlug } = req;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Date parameter (YYYY-MM-DD) is required' });
    }

    // In production, query existing bookings for this tenant and date:
    // const existing = await db.from('bookings').select('booking_time_slot, travel_buffer_slot').eq('tenant_slug', tenantSlug).eq('booking_date', date);

    const startHour = 8;
    const endHour = 16;
    const slots = [];

    for (let h = startHour; h < endHour; h++) {
      const slotTime = `${h % 12 === 0 ? 12 : h % 12}:00 ${h >= 12 ? 'PM' : 'AM'}`;
      const nextHour = h + 1;
      const endSlotTime = `${nextHour % 12 === 0 ? 12 : nextHour % 12}:00 ${nextHour >= 12 ? 'PM' : 'AM'}`;
      const slotLabel = `${slotTime} - ${endSlotTime}`;

      slots.push({
        slot: slotLabel,
        start_hour: h,
        status: h === 11 ? 'travel-buffer' : (h === 10 ? 'booked' : 'available')
      });
    }

    res.json({
      success: true,
      tenant: tenantSlug,
      date,
      slots
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate available slots', details: error.message });
  }
});

/**
 * 4. POST /api/v1/bookings
 * Self-Serve Appointment Booking: Reserves 1-hour slot + locks 1-hour travel buffer.
 */
router.post('/bookings', verifyTenant, async (req, res) => {
  try {
    const { tenantSlug } = req;
    const { name, phone, email, address, project_type, date, time_slot } = req.body;

    if (!name || !phone || !date || !time_slot) {
      return res.status(422).json({ error: 'Missing required booking parameters' });
    }

    // Calculate buffer slot
    const bookingRecord = {
      id: `bk_${Date.now()}`,
      tenant_slug: tenantSlug,
      customer_name: name,
      customer_phone: phone,
      customer_email: email,
      property_address: address,
      project_type,
      booking_date: date,
      booking_time_slot: time_slot,
      status: 'confirmed',
      created_at: new Date().toISOString()
    };

    // In production:
    // await db.from('bookings').insert([bookingRecord]);
    // await NotificationService.dispatchBookingAlert(bookingRecord);

    res.status(201).json({
      success: true,
      message: 'Appointment confirmed with travel buffer locked',
      booking: bookingRecord
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record booking', details: error.message });
  }
});

/**
 * 5. POST /api/v1/chat
 * Logs customer live chat into shared inbox under UNRESOLVED status.
 */
router.post('/chat', verifyTenant, async (req, res) => {
  try {
    const { tenantSlug } = req;
    const { message, customer_name, customer_contact } = req.body;

    const convRecord = {
      id: `conv_${Date.now()}`,
      tenant_slug: tenantSlug,
      customer_name: customer_name || 'Website Visitor',
      customer_contact: customer_contact || 'Live Chat',
      subject: (message || '').slice(0, 40) + '...',
      last_message: message,
      status: 'UNRESOLVED',
      created_at: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      conversation_id: convRecord.id,
      bot_reply: 'Thank you! Your message has been logged into our team inbox. A specialist will call you shortly.'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record chat inquiry', details: error.message });
  }
});

module.exports = router;
