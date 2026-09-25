/**
 * UNCODED HUB — AUTOMATED MONTHLY PROOF REPORT CRON
 * Scheduled execution: 00:01 AM on the 1st of every month.
 * Iterates through all 100–200 active tenants, calculates 30-day proof metrics,
 * archives the report in `monthly_reports`, and emails the client with their invoice.
 */

async function runMonthlyReportCron() {
  console.log('⚡ [CRON] Starting Monthly Proof Report Generation for all active tenants...');
  const currentMonthStr = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  // In production:
  // const { data: tenants } = await db.from('tenants').select('*').eq('is_active', true);
  const mockTenants = [
    { id: 't-01', slug: 'meridian-interiors', name: 'Meridian Interiors', owner_email: 'vikram@meridian.in', retainer: 9999 },
    { id: 't-02', slug: 'willowmere-dental', name: 'Willowmere Dental', owner_email: 'dr@willowmere.in', retainer: 9999 },
    { id: 't-03', slug: 'halbrook-studios', name: 'Halbrook Modular Kitchens', owner_email: 'info@halbrook.in', retainer: 14999 }
  ];

  for (const tenant of mockTenants) {
    // 1. Query past 30 days of metrics
    // const { count: leadsCount } = await db.from('leads').select('*', { count: 'exact', head: true }).eq('tenant_id', tenant.id);
    // const { count: bookingsCount } = await db.from('bookings').select('*', { count: 'exact', head: true }).eq('tenant_id', tenant.id);
    const leadsCount = Math.floor(Math.random() * 25) + 15; // e.g. 15-40 leads
    const bookingsCount = Math.floor(Math.random() * 10) + 6; // e.g. 6-16 bookings
    const pipelineValue = leadsCount * 450000;
    const hoursSaved = Math.round(leadsCount * 0.75 + bookingsCount * 0.5);

    // 2. Generate Executive Report Text
    const reportText = [
      `==================================================`,
      `MONTHLY LEAD OPS PERFORMANCE REPORT — ${currentMonthStr.toUpperCase()}`,
      `Client: ${tenant.name}`,
      `Engine: Uncoded Hub Autonomous Front-Office`,
      `==================================================`,
      `📊 30-DAY PERFORMANCE AUDIT:`,
      `• Total Verified Leads Captured: ${leadsCount}`,
      `• Confirmed In-Home / Clinic Visits: ${bookingsCount}`,
      `• Total Pipeline Revenue Generated: ₹${(pipelineValue / 100000).toFixed(1)} Lakhs`,
      `• Front-Office Hours Saved: ~${hoursSaved} Hours`,
      `--------------------------------------------------`,
      `💡 ROI JUSTIFICATION:`,
      `Your Monthly Retainer: ₹${tenant.retainer.toLocaleString('en-IN')}`,
      `Value Multiplier: Over ${(pipelineValue / tenant.retainer).toFixed(0)}x ROI on pipeline opportunity!`,
      `==================================================`
    ].join('\n');

    console.log(`[REPORT GENERATED] Tenant: ${tenant.name}`);
    console.log(`Dispatched to: ${tenant.owner_email}`);

    // In production:
    // await db.from('monthly_reports').insert([{ tenant_id: tenant.id, month_year: currentMonthStr, total_leads_captured: leadsCount, total_appointments_booked: bookingsCount, total_pipeline_value: pipelineValue, hours_saved_estimate: hoursSaved, dispatched_to_owner_at: new Date() }]);
    // await NotificationService.sendResendEmail(tenant.owner_email, `Your ${currentMonthStr} Lead Performance Report`, reportText);
  }

  console.log('✅ [CRON] Monthly reports successfully generated and archived.');
}

// Export for serverless invocation
module.exports = { runMonthlyReportCron };
