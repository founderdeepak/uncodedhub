import os
import shutil
import re

# 1. Copy the 11 new demos into public/demos/ with clean URL names
mapping_11 = [
    ("Demo Website Template for New Niches/01_educational_academy_demo.html", "public/demos/educational-academy.html"),
    ("Demo Website Template for New Niches/02_gym_fitness_club_demo.html", "public/demos/gym-fitness-club.html"),
    ("Demo Website Template for New Niches/03_business_portfolio_demo.html", "public/demos/business-portfolio.html"),
    ("Demo Website Template for New Niches/04_spa_wellness_sanctuary_demo.html", "public/demos/spa-wellness.html"),
    ("Demo Website Template for New Niches/05_salon_beauty_studio_demo.html", "public/demos/salon-beauty.html"),
    ("Demo Website Template for New Niches/06_fitness_coach_trainer_demo.html", "public/demos/fitness-coach.html"),
    ("Demo Website Template for New Niches/07_yoga_meditation_studio_demo.html", "public/demos/yoga-meditation.html"),
    ("Demo Website Template for New Niches/08_creative_portfolio_demo.html", "public/demos/creative-portfolio.html"),
    ("Demo Website Template for New Niches/09_healthcare_diagnostics_demo.html", "public/demos/healthcare-diagnostics.html"),
    ("Demo Website Template for New Niches/10_clinic_polyclinic_demo.html", "public/demos/clinic-polyclinic.html"),
    ("Demo Website Template for New Niches/11_doctor_specialist_demo.html", "public/demos/doctor-specialist.html"),
]

for src, dst in mapping_11:
    shutil.copyfile(src, dst)
    print(f"[COPIED] {src} -> {dst}")

# 2. Reusable Pitch Modal CSS, HTML, and JS
MODAL_CSS = """
    /* Founder Pitch / Strategy Cover Letter Pop-up Modal */
    .pitch-modal-backdrop {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(10, 15, 29, 0.82);
      backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
      z-index: 100000; display: none; align-items: center; justify-content: center;
      padding: 20px; opacity: 0; transition: opacity 0.3s ease;
    }
    .pitch-modal-backdrop.active {
      display: flex; opacity: 1;
    }
    .pitch-modal-card {
      background: #0f172a; color: #f8fafc;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 20px; max-width: 780px; width: 100%; max-height: 88vh;
      overflow-y: auto; padding: 36px; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
      position: relative; transform: translateY(20px) scale(0.97);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .pitch-modal-backdrop.active .pitch-modal-card {
      transform: translateY(0) scale(1);
    }
    .pitch-close-btn {
      position: absolute; top: 20px; right: 20px;
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.15);
      color: #fff; font-size: 18px; display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.2s ease;
    }
    .pitch-close-btn:hover { background: rgba(255, 255, 255, 0.22); transform: scale(1.08); }
    .pitch-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 12px; border-radius: 30px; font-size: 11px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.08em;
      background: rgba(59, 130, 246, 0.18); color: #60a5fa; border: 1px solid rgba(96, 165, 250, 0.3);
      margin-bottom: 14px;
    }
    .pitch-h2 {
      font-size: 26px; line-height: 1.3; font-weight: 800; color: #ffffff;
      margin-bottom: 12px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .pitch-author-bar {
      display: flex; align-items: center; gap: 12px; margin-bottom: 22px; padding-bottom: 18px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }
    .pitch-author-avatar {
      width: 44px; height: 44px; border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6, #06b6d4);
      display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; color: #fff;
    }
    .pitch-author-name { font-weight: 700; font-size: 14px; color: #f1f5f9; }
    .pitch-author-title { font-size: 12px; color: #94a3b8; }
    .pitch-body {
      font-size: 15px; line-height: 1.7; color: #cbd5e1; display: flex; flex-direction: column; gap: 16px;
    }
    .pitch-body strong { color: #ffffff; }
    .pitch-highlight-box {
      background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px; padding: 18px 20px; margin: 4px 0;
    }
    .pitch-actions {
      display: flex; align-items: center; gap: 14px; margin-top: 26px; padding-top: 22px;
      border-top: 1px solid rgba(255, 255, 255, 0.12); flex-wrap: wrap;
    }
    .pitch-cta-wa {
      background: #22c55e; color: #0b1c11; font-weight: 800; font-size: 14px;
      padding: 13px 26px; border-radius: 10px; text-decoration: none; display: inline-flex;
      align-items: center; gap: 8px; transition: all 0.2s ease;
      box-shadow: 0 4px 15px rgba(34, 197, 94, 0.35);
    }
    .pitch-cta-wa:hover { background: #4ade80; transform: translateY(-2px); }
    .pitch-cta-dismiss {
      background: transparent; border: 1px solid rgba(255, 255, 255, 0.2); color: #cbd5e1;
      padding: 12px 20px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer;
      transition: all 0.2s ease;
    }
    .pitch-cta-dismiss:hover { background: rgba(255, 255, 255, 0.08); color: #fff; }
    .demo-pitch-btn {
      background: rgba(59, 130, 246, 0.22); color: #93c5fd; border: 1px solid rgba(96, 165, 250, 0.4);
      font-weight: 700; padding: 5px 12px; border-radius: 6px; font-size: 11.5px;
      cursor: pointer; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 6px;
    }
    .demo-pitch-btn:hover { background: rgba(59, 130, 246, 0.38); color: #ffffff; border-color: #93c5fd; }
"""

MODAL_HTML = """
  <!-- Founder Pitch & Strategy Cover Letter Modal -->
  <div class="pitch-modal-backdrop" id="uncodedPitchModal" onclick="handleBackdropClick(event)">
    <div class="pitch-modal-card">
      <button class="pitch-close-btn" onclick="closePitchModal()" title="Close dialog">✕</button>
      <div class="pitch-badge">Confidential Founder Pitch • 7-Day Sprint Specimen</div>
      <h2 class="pitch-h2">Why We Hand-Built This Prototype For Your Business Before Asking For A Rupee</h2>
      
      <div class="pitch-author-bar">
        <div class="pitch-author-avatar">UH</div>
        <div>
          <div class="pitch-author-name">Deepak &amp; Geetha</div>
          <div class="pitch-author-title">Founders &amp; Principal Engineers, Uncoded Hub (Bangalore, India)</div>
        </div>
      </div>

      <div class="pitch-body">
        <p>Dear Business Owner / Practice Director,</p>
        <p>Most digital agencies pitch generic 40-page PDF decks, throw around buzzwords like "bespoke omni-channel synergy", and demand ₹1.5L–₹3L before proving they understand a single thing about your real customers. <strong>We do the opposite: we do the work first.</strong></p>

        <div class="pitch-highlight-box">
          <h4 style="color:#60a5fa; margin-bottom:6px; font-size:15px;">1. The Invisible Systems Leak (The Art of Thinking in Systems)</h4>
          <p style="margin:0; font-size:14px; color:#cbd5e1;">In systems thinking, your customer acquisition operates on stocks and flows. You invest money into Google Maps, local SEO, Instagram, or referrals. That is your <em>inflow</em>. But when a prospective client arrives on a slow WordPress site that takes 4+ seconds to load or has confusing navigation, <strong>over 70% bounce silently</strong>. That is your invisible <em>outflow</em>. Pouring more ad spend into a leaking bucket never fixes the problem—re-engineering the conversion asset does.</p>
        </div>

        <div class="pitch-highlight-box">
          <h4 style="color:#60a5fa; margin-bottom:6px; font-size:15px;">2. Direct-Response Conversion Science (Making Websites Win)</h4>
          <p style="margin:0; font-size:14px; color:#cbd5e1;">This website is engineered with DiPS (Diagnose-Problem-Solution) architecture: sub-1.5s mobile speed, upfront treatment/service clarity, interactive self-qualification tools, and direct 1-tap WhatsApp consultation. It resolves your prospect's unvoiced fears within 50 milliseconds so they reach out to you instead of checking your competitors.</p>
        </div>

        <div class="pitch-highlight-box">
          <h4 style="color:#60a5fa; margin-bottom:6px; font-size:15px;">3. Distinct Strategic Identity (Designing Brand Identity)</h4>
          <p style="margin:0; font-size:14px; color:#cbd5e1;">A brand is the gut feeling a customer has about your business. Notice the floating theme dock at the bottom of this page: you can switch between <strong>3 complete aesthetic directions</strong> in real-time. We craft a distinctive visual language that commands premium pricing and local category leadership.</p>
        </div>

        <p><strong>Our 7-Day Sprint Guarantee:</strong> You work directly with us (Deepak &amp; Geetha). In 7 working days, we replace all demo content with your real logo, photos, pricing, and phone number, connect your WhatsApp funnel, and hand you 100% code ownership with zero monthly platform lock-ins.</p>
      </div>

      <div class="pitch-actions">
        <a href="https://wa.me/918660819023?text=Hi%20Deepak%20%26%20Geetha,%20I%20am%20viewing%20the%20live%20demo%20and%20want%20to%20discuss%20claiming%20it%20for%20my%20business." class="pitch-cta-wa" target="_blank">
          Claim This Website on WhatsApp (+91 8660819023) →
        </a>
        <button class="pitch-cta-dismiss" onclick="closePitchModal()">Explore Live Demo Specimen ↓</button>
      </div>
    </div>
  </div>
"""

MODAL_JS = """
  <script>
    // Founder Pitch Modal Functions
    function openPitchModal() {
      const modal = document.getElementById('uncodedPitchModal');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    function closePitchModal() {
      const modal = document.getElementById('uncodedPitchModal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        localStorage.setItem('uncoded_pitch_viewed', 'true');
      }
    }

    function handleBackdropClick(e) {
      if (e.target.id === 'uncodedPitchModal') {
        closePitchModal();
      }
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closePitchModal();
      }
    });

    // Gentle auto-open for first-time visitors after 2.5s delay
    window.addEventListener('DOMContentLoaded', function() {
      setTimeout(function() {
        if (!localStorage.getItem('uncoded_pitch_viewed')) {
          openPitchModal();
        }
      }, 2500);
    });
  </script>
"""

# 3. Update the 6 original demos in both public/demos/ and Demo Website Template for 6 NIches/
original_demos = [
    "public/demos/interior-design.html",
    "public/demos/real-estate.html",
    "public/demos/dental-clinic.html",
    "public/demos/wedding-photography.html",
    "public/demos/home-renovation.html",
    "public/demos/executive-coaching.html",
    "Demo Website Template for 6 NIches/meridian-interiors-demo.html",
    "Demo Website Template for 6 NIches/marlow-realty-demo.html",
    "Demo Website Template for 6 NIches/willowmere-dental-demo.html",
    "Demo Website Template for 6 NIches/alder-wren-photography-demo.html",
    "Demo Website Template for 6 NIches/halbrook-renovation-demo.html",
    "Demo Website Template for 6 NIches/naomi-reyes-coaching-demo.html",
]

for file_path in original_demos:
    if not os.path.exists(file_path):
        continue
    with open(file_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Check if modal already present
    if "uncodedPitchModal" not in html:
        # Inject CSS before </style>
        if "</style>" in html:
            html = html.replace("</style>", MODAL_CSS + "\n  </style>", 1)
        
        # Inject Modal HTML and JS before </body>
        if "</body>" in html:
            html = html.replace("</body>", MODAL_HTML + "\n" + MODAL_JS + "\n</body>", 1)

    # In public/demos, enhance top banner if present
    if "Book Your 7-Day Sprint →" in html and "openPitchModal()" not in html:
        replacement = """<button class="demo-pitch-btn" onclick="openPitchModal()" style="margin-right: 8px;">✨ Why We Built This Demo</button>
      <a href="https://wa.me/918660819023?text=Hi%20Uncoded%20Hub,%20I%20want%20to%20claim%20this%20website%20for%20my%20business." style="background: #22C55E; color: #0B1C11; font-weight: 700; padding: 6px 14px; border-radius: 5px; text-decoration: none; font-size: 12px; display: inline-flex; align-items: center; gap: 6px;" target="_blank">
        Claim This Website For My Business
      </a>"""
        html = re.sub(r'<a href="/contact"[^>]*>.*?Book Your 7-Day Sprint →.*?</a>', replacement, html, flags=re.DOTALL)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[UPDATED] {file_path} with pitch modal & WhatsApp claim button")

print("All demos successfully synchronized and updated!")
