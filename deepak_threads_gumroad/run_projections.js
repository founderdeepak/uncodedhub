function calcModel(name, params) {
  let cumulRevenue = 0;
  let cumulBuyers = 0;
  console.log('=== ' + name + ' ===');
  params.forEach(p => {
    const buyers = p.days * p.visitors * p.cr;
    const rev = buyers * p.aov;
    cumulRevenue += rev;
    cumulBuyers += buyers;
    const inr = Math.round(cumulRevenue * 84).toLocaleString('en-IN');
    console.log(`Day ${p.periodEnd.toString().padEnd(3)}: Period Rev: $${rev.toFixed(0).padStart(5)} | Cumul Rev: $${cumulRevenue.toFixed(0).padStart(5)} (~INR ${inr.padStart(10)}) | Cumul Buyers: ${Math.round(cumulBuyers).toString().padStart(4)}`);
  });
}

calcModel('Conservative', [
  { periodEnd: 15, days: 15, visitors: 80, cr: 0.02, aov: 14 },
  { periodEnd: 30, days: 15, visitors: 100, cr: 0.022, aov: 16 },
  { periodEnd: 60, days: 30, visitors: 120, cr: 0.024, aov: 18 },
  { periodEnd: 90, days: 30, visitors: 140, cr: 0.025, aov: 20 },
  { periodEnd: 180, days: 90, visitors: 160, cr: 0.026, aov: 22 }
]);

calcModel('Expected (Realistic Baseline)', [
  { periodEnd: 15, days: 15, visitors: 120, cr: 0.025, aov: 18 },
  { periodEnd: 30, days: 15, visitors: 160, cr: 0.028, aov: 21 },
  { periodEnd: 60, days: 30, visitors: 190, cr: 0.030, aov: 23 },
  { periodEnd: 90, days: 30, visitors: 220, cr: 0.032, aov: 25 },
  { periodEnd: 180, days: 90, visitors: 260, cr: 0.033, aov: 27 }
]);

calcModel('Aggressive (Viral Spikes & Funnel Optimization)', [
  { periodEnd: 15, days: 15, visitors: 180, cr: 0.032, aov: 22 },
  { periodEnd: 30, days: 15, visitors: 240, cr: 0.035, aov: 25 },
  { periodEnd: 60, days: 30, visitors: 300, cr: 0.038, aov: 28 },
  { periodEnd: 90, days: 30, visitors: 360, cr: 0.040, aov: 30 },
  { periodEnd: 180, days: 90, visitors: 450, cr: 0.042, aov: 32 }
]);
