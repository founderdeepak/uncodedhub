/**
 * UNCODED HUB — SUPER WEBSITE FEATURES ENGINE (v2.0)
 * Reactive Client-Side Core & Lead Ops Engine
 * Powers: Live Chat, 3-Step Gated Estimator, Calendar with Travel Buffer,
 * 2-Way Notifications, and Staff CRM Dashboard.
 */

const SuperEngine = (function() {
  'use strict';

  // In-memory / LocalStorage State Keys
  const STORAGE_KEYS = {
    CONFIG: 'sf_niche_config',
    LEADS: 'sf_leads_data',
    BOOKINGS: 'sf_bookings_data',
    CONVERSATIONS: 'sf_conversations_data'
  };

  let activeConfig = null;
  let listeners = [];

  // Seed Default Starter Data if empty
  function initStorage(config) {
    activeConfig = config;
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
      
      if (!localStorage.getItem(STORAGE_KEYS.LEADS)) {
        const seedLeads = [
          {
            id: 'lead-101',
            created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
            niche_id: config.nicheId,
            name: 'Vikramaditya Singhania',
            phone: '+91 98200 45678',
            email: 'vikram.singhania@corp.in',
            property_address: '402 The Pavilion, Indiranagar, Bangalore',
            project_type: config.estimator.step1.options[1].label,
            project_size: config.estimator.step2.options[1].label,
            finish_level: config.estimator.step3.options[1].label,
            estimated_min: 2600000,
            estimated_max: 4200000,
            status: 'UNRESOLVED',
            notes: 'Client wants move-in by Diwali. Needs verified trade-cost invoices.'
          },
          {
            id: 'lead-102',
            created_at: new Date(Date.now() - 3600000 * 26).toISOString(),
            niche_id: config.nicheId,
            name: 'Pooja Hegde',
            phone: '+91 98450 11223',
            email: 'pooja.h@creative.studio',
            property_address: 'Villa 14, Palm Meadows, Whitefield',
            project_type: config.estimator.step1.options[3] ? config.estimator.step1.options[3].label : config.estimator.step1.options[0].label,
            project_size: config.estimator.step2.options[2].label,
            finish_level: config.estimator.step3.options[2].label,
            estimated_min: 7500000,
            estimated_max: 14000000,
            status: 'WAITING_ON_CUSTOMER',
            notes: 'Sent preliminary 3D concept deck. Waiting on client confirmation for site visit.'
          }
        ];
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(seedLeads));
      }

      if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
        const today = new Date().toISOString().split('T')[0];
        const seedBookings = [
          {
            id: 'bk-201',
            created_at: new Date().toISOString(),
            niche_id: config.nicheId,
            customer_name: 'Dr. Suresh Nambiar',
            customer_phone: '+91 98888 77665',
            customer_email: 'suresh.nambiar@health.org',
            property_address: 'Flat 8B, Embassy Boulevard, Bangalore',
            project_type: config.estimator.step1.options[1].label,
            booking_date: today,
            booking_time_slot: '10:00 AM - 11:00 AM',
            travel_buffer_slot: '11:00 AM - 12:00 PM',
            status: 'confirmed'
          }
        ];
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(seedBookings));
      }

      if (!localStorage.getItem(STORAGE_KEYS.CONVERSATIONS)) {
        const seedConvs = [
          {
            id: 'conv-301',
            created_at: new Date().toISOString(),
            customer_name: 'Aditya Verma',
            customer_contact: '+91 98111 00223',
            subject: 'Inquiry regarding 3D renders before procurement',
            status: 'UNRESOLVED',
            last_message: 'Hi, do you provide full factory invoices for fittings?'
          }
        ];
        localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(seedConvs));
      }
    } catch (e) {
      console.warn('Storage quota or private mode error:', e);
    }
  }

  // --- Currency Formatting Engine ---
  function formatCurrency(amount, unit) {
    if (!amount) return '₹0';
    if (amount >= 10000000) {
      const cr = (amount / 10000000).toFixed(2);
      return `₹${cr} Cr`;
    } else if (amount >= 100000) {
      const lk = (amount / 100000).toFixed(2);
      return `₹${lk} Lakhs`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  }

  // --- Estimator Calculation Logic ---
  function calculateProjectEstimate(typeId, sizeId, finishId) {
    if (!activeConfig || !activeConfig.estimator) {
      throw new Error('SuperEngine not initialized with niche config');
    }

    const matrix = activeConfig.estimator.pricingMatrix;
    const finishOption = activeConfig.estimator.step3.options.find(o => o.id === finishId);
    const multiplier = finishOption ? finishOption.multiplier : 1.0;

    let baseRange = [50000, 100000];
    if (matrix[typeId] && matrix[typeId][sizeId]) {
      baseRange = matrix[typeId][sizeId];
    } else {
      const firstType = Object.keys(matrix)[0];
      baseRange = matrix[firstType][sizeId] || [100000, 200000];
    }

    const min = Math.round(baseRange[0] * multiplier);
    const max = Math.round(baseRange[1] * multiplier);

    return {
      min,
      max,
      formattedMin: formatCurrency(min, activeConfig.currencyUnit),
      formattedMax: formatCurrency(max, activeConfig.currencyUnit),
      disclaimer: activeConfig.estimator.disclaimer
    };
  }

  // --- Gated Lead Capture Submission ---
  function submitLeadCapture(leadData) {
    const leads = JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADS) || '[]');
    const newLead = {
      id: 'lead-' + Date.now(),
      created_at: new Date().toISOString(),
      niche_id: activeConfig ? activeConfig.nicheId : 'general',
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email,
      property_address: leadData.address || '',
      project_type: leadData.projectType,
      project_size: leadData.projectSize,
      finish_level: leadData.finishLevel,
      estimated_min: leadData.estimatedMin,
      estimated_max: leadData.estimatedMax,
      status: 'UNRESOLVED',
      notes: leadData.notes || 'Inbound estimation lead'
    };

    leads.unshift(newLead);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));

    // Trigger Notification Simulation
    dispatch2WayNotification('lead', newLead);
    notifySubscribers();
    return newLead;
  }

  // --- Calendar Booking Engine with Travel Buffer Logic ---
  function getAvailableSlots(dateStr) {
    const config = activeConfig || {};
    const startHour = (config.operatingHours && config.operatingHours.start) || 8;
    const endHour = (config.operatingHours && config.operatingHours.end) || 16;
    const travelBufferMinutes = config.travelBufferMinutes || 0;

    const bookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]');
    const daysBookings = bookings.filter(b => b.booking_date === dateStr && b.status !== 'cancelled');

    const slots = [];
    for (let h = startHour; h < endHour; h++) {
      const slotTime = `${h % 12 === 0 ? 12 : h % 12}:00 ${h >= 12 ? 'PM' : 'AM'}`;
      const nextHour = h + 1;
      const endSlotTime = `${nextHour % 12 === 0 ? 12 : nextHour % 12}:00 ${nextHour >= 12 ? 'PM' : 'AM'}`;
      const slotLabel = `${slotTime} - ${endSlotTime}`;

      // Check if slot is booked
      const isBooked = daysBookings.some(b => b.booking_time_slot === slotLabel);
      
      // Check if slot falls in a travel buffer of previous appointment
      const isBuffer = daysBookings.some(b => b.travel_buffer_slot === slotLabel);

      slots.push({
        label: slotLabel,
        startHour: h,
        status: isBooked ? 'booked' : (isBuffer ? 'travel-buffer' : 'available')
      });
    }

    return slots;
  }

  function bookAppointment(bookingData) {
    const bookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]');
    
    // Calculate travel buffer slot (the 1 hour block right after)
    const slotParts = bookingData.timeSlot.split(' - ');
    let bufferSlot = null;
    if (activeConfig && activeConfig.travelBufferMinutes > 0) {
      // Find start hour
      const slots = getAvailableSlots(bookingData.date);
      const chosen = slots.find(s => s.label === bookingData.timeSlot);
      if (chosen) {
        const nextHour = chosen.startHour + 1;
        const nextNextHour = nextHour + 1;
        bufferSlot = `${nextHour % 12 === 0 ? 12 : nextHour % 12}:00 ${nextHour >= 12 ? 'PM' : 'AM'} - ${nextNextHour % 12 === 0 ? 12 : nextNextHour % 12}:00 ${nextNextHour >= 12 ? 'PM' : 'AM'}`;
      }
    }

    const newBooking = {
      id: 'bk-' + Date.now(),
      created_at: new Date().toISOString(),
      niche_id: activeConfig ? activeConfig.nicheId : 'general',
      customer_name: bookingData.name,
      customer_phone: bookingData.phone,
      customer_email: bookingData.email,
      property_address: bookingData.address,
      project_type: bookingData.projectType,
      booking_date: bookingData.date,
      booking_time_slot: bookingData.timeSlot,
      travel_buffer_slot: bufferSlot,
      status: 'confirmed'
    };

    bookings.unshift(newBooking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

    dispatch2WayNotification('booking', newBooking);
    notifySubscribers();
    return newBooking;
  }

  // --- 1-Tap Calendar Export (.ics Generator) ---
  function generateIcsCalendar(booking) {
    const title = `${activeConfig ? activeConfig.brandName : 'Appointment'}: ${booking.project_type}`;
    const desc = `In-Home Consultation and Project Audit. Confirmation: ${booking.id}`;
    const location = booking.property_address || 'Client Address';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Uncoded Hub//Super Website Features//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${location}`,
      `DTSTART;VALUE=DATE:${booking.booking_date.replace(/-/g, '')}`,
      `DTEND;VALUE=DATE:${booking.booking_date.replace(/-/g, '')}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `appointment-${booking.booking_date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // --- 2-Way Automated Notification Loop ---
  function dispatch2WayNotification(type, data) {
    const ownerEmail = (activeConfig && activeConfig.notifications && activeConfig.notifications.ownerEmail) || 'owner@studio.com';
    const ownerPhone = (activeConfig && activeConfig.notifications && activeConfig.notifications.ownerPhone) || '+91 98000 00000';
    
    console.log(`%c[SUPER ENGINE: 2-WAY DISPATCH] Type: ${type.toUpperCase()}`, 'color:#B25A24; font-weight:bold;');
    console.log(`→ Immediate Owner Alert sent to: ${ownerEmail}`);
    console.log(`→ Auto-Reassurance SMS/Email dispatched to: ${data.customer_email || data.email}`);
  }

  // --- Staff Admin Actions ---
  function getAdminData() {
    const leads = JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADS) || '[]');
    const bookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]');
    const convs = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONVERSATIONS) || '[]');

    const totalPipelineValue = leads.reduce((sum, l) => sum + (Number(l.estimated_min) || 0), 0);
    const unresolvedCount = leads.filter(l => l.status === 'UNRESOLVED').length;
    const confirmedBookingsCount = bookings.filter(b => b.status === 'confirmed').length;

    return {
      leads,
      bookings,
      convs,
      totalPipelineValue,
      formattedPipelineValue: formatCurrency(totalPipelineValue),
      unresolvedCount,
      confirmedBookingsCount,
      totalLeadsCount: leads.length
    };
  }

  function updateLeadStatus(leadId, newStatus) {
    const leads = JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADS) || '[]');
    const target = leads.find(l => l.id === leadId);
    if (target) {
      target.status = newStatus;
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
      notifySubscribers();
    }
  }

  // --- Monthly Proof Report Generator ---
  function generateMonthlyProofReport() {
    const data = getAdminData();
    const config = activeConfig || {};
    const reportText = `==================================================
MONTHLY LEAD OPS PERFORMANCE REPORT
Studio: ${config.brandName || 'Client Studio'}
Niche: ${config.nicheTitle || 'High-Ticket Local Service'}
Generated: ${new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
==================================================

📊 LEAD CONVERSION METRICS:
• Total Qualified Leads Captured: ${data.totalLeadsCount}
• In-Home / Clinical Appointments Booked: ${data.confirmedBookingsCount}
• Total Pipeline Value Added: ${data.formattedPipelineValue}

⏱️ ESTIMATED HOURS SAVED BY SYSTEM:
• Automated Estimator Triage: ~${Math.round(data.totalLeadsCount * 0.75)} Hours
• Automated Scheduling & Travel Buffering: ~${Math.round(data.confirmedBookingsCount * 0.5)} Hours

STATUS BREAKDOWN:
• Converted / In-Progress: ${data.leads.filter(l => l.status === 'RESOLVED').length}
• Waiting on Client Reply: ${data.leads.filter(l => l.status === 'WAITING_ON_CUSTOMER').length}
• New Unresolved Leads: ${data.unresolvedCount}
==================================================
Report provided by Uncoded Hub Autonomous Website Engine.`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `monthly-proof-report-${config.nicheId || 'studio'}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Reactive Subscription
  function subscribe(fn) { listeners.push(fn); }
  function notifySubscribers() { listeners.forEach(fn => fn()); }

  return {
    init: initStorage,
    formatCurrency,
    calculateProjectEstimate,
    submitLeadCapture,
    getAvailableSlots,
    bookAppointment,
    generateIcsCalendar,
    getAdminData,
    updateLeadStatus,
    generateMonthlyProofReport,
    subscribe
  };
})();

// Attach globally for browser use
if (typeof window !== 'undefined') {
  window.SuperEngine = SuperEngine;
}
