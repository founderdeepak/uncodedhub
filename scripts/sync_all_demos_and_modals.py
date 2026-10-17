import os
import shutil
import re

# 1. First, re-run generator for the 11 new demos if needed, or copy them into public/demos/
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
    if os.path.exists(src):
        shutil.copyfile(src, dst)
        print(f"[COPIED] {src} -> {dst}")


# 2. Reusable Uncoded Hub Theme Pitch Modal CSS, HTML, and JS
MODAL_CSS = """
    /* Uncoded Hub Studio Popup Modal */
    .pitch-modal-backdrop {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(20, 19, 15, 0.78);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      z-index: 100000; display: none; align-items: center; justify-content: center;
      padding: 20px; opacity: 0; transition: opacity 0.25s ease;
    }
    .pitch-modal-backdrop.active {
      display: flex; opacity: 1;
    }
    .pitch-modal-card {
      background: #FAF8F5; color: #14130F;
      border: 1.5px solid #C4BDB0;
      border-radius: 24px; max-width: 820px; width: 100%; max-height: 90vh;
      overflow-y: auto; padding: 36px 40px; box-shadow: 0 30px 80px rgba(20, 19, 15, 0.45);
      position: relative; transform: translateY(16px) scale(0.98);
      transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .pitch-modal-backdrop.active .pitch-modal-card {
      transform: translateY(0) scale(1);
    }
    .pitch-close-btn {
      position: absolute; top: 22px; right: 24px;
      width: 38px; height: 38px; border-radius: 50%;
      background: #EDEAE4; border: 1px solid #DDD8CE;
      color: #14130F; font-size: 16px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.2s ease;
    }
    .pitch-close-btn:hover { background: #C7074B; color: #FFFFFF; border-color: #C7074B; transform: scale(1.06); }
    
    /* Header styling matching Uncoded Hub */
    .uh-popup-header {
      display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1.5px solid #DDD8CE; padding-bottom: 18px; margin-bottom: 22px;
      flex-wrap: wrap; gap: 12px;
    }
    .uh-brand-group {
      display: flex; align-items: center; gap: 12px;
    }
    .uh-brand-logo-img {
      width: 44px; height: 44px; object-fit: contain;
    }
    .uh-brand-name {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 24px; font-weight: 700; color: #14130F; line-height: 1; letter-spacing: -0.01em;
    }
    .uh-brand-sub {
      font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em;
      color: #C7074B; font-weight: 700; margin-top: 3px; font-family: -apple-system, sans-serif;
    }
    .uh-badge-studio {
      background: #FBE8EF; color: #C7074B; border: 1px solid rgba(199, 7, 75, 0.25);
      font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
      padding: 5px 12px; border-radius: 20px;
    }

    /* Founders Presentation Row */
    .founders-row {
      display: grid; grid-template-columns: auto 1fr; gap: 24px; align-items: center;
      background: #FBFAF8; border: 1px solid #DDD8CE; border-radius: 18px;
      padding: 20px 24px; margin-bottom: 22px;
    }
    .founders-photos {
      display: flex; gap: 10px;
    }
    .founder-pic-box {
      width: 68px; text-align: center;
    }
    .founder-pic {
      width: 68px; height: 80px; object-fit: cover; border-radius: 12px;
      border: 1px solid #C4BDB0; filter: grayscale(15%);
    }
    .founder-name {
      font-size: 11px; font-weight: 700; color: #14130F; margin-top: 4px; display: block;
    }
    .founder-role {
      font-size: 9.5px; color: #5F5B53; text-transform: uppercase; letter-spacing: 0.05em; display: block;
    }
    .founders-intro h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 24px; line-height: 1.18; font-weight: 700; color: #14130F; margin-bottom: 6px;
    }
    .founders-intro p {
      font-size: 13.5px; line-height: 1.5; color: #5F5B53; margin: 0;
    }

    /* Letter Body */
    .pitch-body {
      font-size: 14.5px; line-height: 1.68; color: #38352E; display: flex; flex-direction: column; gap: 16px;
    }
    .pitch-body strong { color: #14130F; font-weight: 700; }
    
    .insight-card {
      background: #FBFAF8; border: 1px solid #DDD8CE;
      border-radius: 14px; padding: 18px 22px;
    }
    .insight-card h4 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 18px; font-weight: 700; color: #14130F; margin-bottom: 6px;
    }
    .insight-card p {
      font-size: 13.5px; color: #5F5B53; line-height: 1.55; margin: 0;
    }

    /* About Belief Callout */
    .belief-card {
      background: #FAF8F5; border-left: 3.5px solid #C7074B; border-top: 1px solid #DDD8CE;
      border-right: 1px solid #DDD8CE; border-bottom: 1px solid #DDD8CE;
      border-radius: 0 14px 14px 0; padding: 18px 22px;
    }
    .belief-card .belief-quote {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 16.5px; font-style: italic; color: #14130F; margin-bottom: 10px; line-height: 1.45;
    }
    .commitments-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px; padding-top: 10px; border-top: 1px solid #EDEAE4;
    }
    .comm-item { font-size: 12px; color: #5F5B53; line-height: 1.4; }
    .comm-item strong { display: block; color: #C7074B; font-size: 11.5px; margin-bottom: 2px; text-transform: uppercase; letter-spacing: 0.04em; }

    /* Lead Magnet Download Box */
    .lead-magnet-box {
      background: #FFFFFF; border: 1.5px solid #C7074B;
      border-radius: 16px; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; gap: 20px;
      box-shadow: 0 4px 16px rgba(199, 7, 75, 0.08);
    }
    .lm-badge {
      display: inline-block; font-size: 10.5px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.08em; color: #C7074B; background: #FBE8EF; padding: 3px 8px; border-radius: 4px; margin-bottom: 6px;
    }
    .lm-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 19px; font-weight: 700; color: #14130F; line-height: 1.25; margin-bottom: 4px;
    }
    .lm-desc {
      font-size: 12.5px; color: #5F5B53; line-height: 1.45; margin: 0;
    }
    .lm-download-btn {
      background: #14130F; color: #FAF8F5; font-weight: 700; font-size: 13px;
      padding: 12px 20px; border-radius: 8px; text-decoration: none; white-space: nowrap;
      display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(20, 19, 15, 0.2);
    }
    .lm-download-btn:hover { background: #C7074B; color: #FFFFFF; transform: translateY(-2px); }

    /* Actions */
    .pitch-actions {
      display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-top: 24px; padding-top: 20px;
      border-top: 1.5px solid #DDD8CE; flex-wrap: wrap;
    }
    .pitch-cta-wa {
      background: #C7074B; color: #FFFFFF; font-weight: 700; font-size: 14px;
      padding: 14px 28px; border-radius: 10px; text-decoration: none; display: inline-flex;
      align-items: center; gap: 10px; transition: all 0.2s ease;
      box-shadow: 0 6px 20px rgba(199, 7, 75, 0.3);
    }
    .pitch-cta-wa:hover { background: #A0053C; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(199, 7, 75, 0.4); }
    .pitch-cta-dismiss {
      background: transparent; border: 1.5px solid #C4BDB0; color: #5F5B53;
      padding: 13px 22px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer;
      transition: all 0.2s ease;
    }
    .pitch-cta-dismiss:hover { background: #EDEAE4; color: #14130F; border-color: #14130F; }

    .demo-pitch-btn {
      background: rgba(199, 7, 75, 0.15); color: #C7074B; border: 1px solid rgba(199, 7, 75, 0.35);
      font-weight: 700; padding: 5px 12px; border-radius: 6px; font-size: 11.5px;
      cursor: pointer; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 6px;
    }
    .demo-pitch-btn:hover { background: #C7074B; color: #FFFFFF; }

    @media (max-width: 768px) {
      .pitch-modal-card { padding: 24px 20px; }
      .founders-row { grid-template-columns: 1fr; gap: 16px; text-align: center; }
      .founders-photos { justify-content: center; }
      .commitments-grid { grid-template-columns: 1fr; gap: 10px; }
      .lead-magnet-box { flex-direction: column; align-items: flex-start; gap: 14px; }
      .lm-download-btn { width: 100%; justify-content: center; }
      .pitch-actions { flex-direction: column; align-items: stretch; }
      .pitch-cta-wa, .pitch-cta-dismiss { width: 100%; justify-content: center; text-align: center; }
    }
"""

MODAL_HTML = """
  <!-- Uncoded Hub Studio Pitch & Cover Letter Modal -->
  <div class="pitch-modal-backdrop" id="uncodedPitchModal" onclick="handleBackdropClick(event)">
    <div class="pitch-modal-card">
      <button class="pitch-close-btn" onclick="closePitchModal()" title="Close dialog">✕</button>
      
      <!-- Header matching Uncoded Hub site -->
      <div class="uh-popup-header">
        <div class="uh-brand-group">
          <img src="/logo-medium.webp" alt="Uncoded Hub" class="uh-brand-logo-img">
          <div>
            <div class="uh-brand-name">Uncoded Hub</div>
            <div class="uh-brand-sub">Two-Person Studio · Bengaluru</div>
          </div>
        </div>
        <span class="uh-badge-studio">7-Day Sprint Prototype</span>
      </div>

      <!-- Founders Introduction Row with Real Photos -->
      <div class="founders-row">
        <div class="founders-photos">
          <div class="founder-pic-box">
            <img src="/deepak.webp" alt="Deepak, co-founder" class="founder-pic">
            <span class="founder-name">Deepak</span>
            <span class="founder-role">Engineering</span>
          </div>
          <div class="founder-pic-box">
            <img src="/geetha.webp" alt="Geetha, co-founder" class="founder-pic">
            <span class="founder-name">Geetha</span>
            <span class="founder-role">Design &amp; Strategy</span>
          </div>
        </div>
        <div class="founders-intro">
          <h2>Why We Hand-Built This Live Prototype For Your Business Before Asking For A Rupee.</h2>
          <p>A personal note from Deepak &amp; Geetha to the founder or practice director reviewing this website.</p>
        </div>
      </div>

      <div class="pitch-body">
        <p>Dear Founder / Business Owner,</p>
        <p>Most digital agencies pitch generic 40-page PDF decks, throw around corporate jargon, and demand lakhs before proving they understand a single thing about your real clients. <strong>We do the opposite: we do the work first.</strong></p>

        <!-- Customer Empathy & 50ms Trust Insight -->
        <div class="insight-card">
          <h4>The 50-Millisecond Silent Decision</h4>
          <p>When a prospective client or patient searches for your service in your city, they don't judge your years of dedication or credentials on paper. <strong>They judge you in the first 50 milliseconds based on visual certainty.</strong> In high-ticket services, clients do not buy a service—they buy <em>relief from the fear of making an expensive mistake</em>. If your site takes 4+ seconds to load, breaks on mobile, or looks like a template from 2018, over 70% bounce silently and hire the competitor who looks established.</p>
        </div>

        <!-- What this prototype delivers -->
        <div class="insight-card">
          <h4>What This Live Prototype Solves For Your Business</h4>
          <p>We didn't build an aesthetic brochure. We built a high-conversion client acquisition engine: sub-1.5s load time on Indian mobile 4G networks, upfront service clarity, interactive self-qualification tools, and direct 1-tap WhatsApp consultation. It answers your prospect's unvoiced fears before they ever hesitate.</p>
        </div>

        <!-- Our Belief from About page -->
        <div class="belief-card">
          <div class="belief-quote">
            "Uncoded Hub is a brother and sister who got tired of watching competent, high-quality businesses lose work to worse competitors simply because the competitor had a faster, clearer website."
          </div>
          <div class="commitments-grid">
            <div class="comm-item">
              <strong>1. Senior Delivery Only</strong>
              No hidden junior team, no account managers. Deepak and Geetha engineer and design every single line.
            </div>
            <div class="comm-item">
              <strong>2. 7-Day Turnaround</strong>
              Live and launched in 7 working days flat—not 3 months of agency delays.
            </div>
            <div class="comm-item">
              <strong>3. 100% Asset Ownership</strong>
              Domain, hosting, code, and content in your name from day one with zero monthly platform lock-ins.
            </div>
          </div>
        </div>

        <!-- Free 2-Page PDF Lead Magnet -->
        <div class="lead-magnet-box">
          <div>
            <span class="lm-badge">FREE 2-PAGE STRATEGIC BRIEFING</span>
            <div class="lm-title">The High-Trust Advantage: Why Top Local Businesses Dominate</div>
            <p class="lm-desc">An executive 2-page PDF on why waiting to build a real website costs you high-ticket clients every month, and the 4 compounding privileges of owning your digital flagship.</p>
          </div>
          <a href="/downloads/the-high-trust-advantage.pdf" download="The_High_Trust_Advantage_Uncoded_Hub.pdf" target="_blank" class="lm-download-btn">
            📥 Download 2-Page PDF
          </a>
        </div>
      </div>

      <div class="pitch-actions">
        <button class="pitch-cta-dismiss" onclick="closePitchModal()">Explore Live Demo Specimen ↓</button>
        <a href="https://wa.me/918660819023?text=Hi%20Deepak%20%26%20Geetha,%20I%20am%20viewing%20the%20live%20demo%20and%20want%20to%20discuss%20claiming%20it%20for%20my%20business." class="pitch-cta-wa" target="_blank">
          Claim This Website on WhatsApp (+91 8660819023) →
        </a>
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

# Update the 6 original demos in both public/demos/ and Demo Website Template for 6 NIches/
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

    # Clean out any previous pitch modal CSS
    html = re.sub(r'/\* Founder Pitch.*?\*/.*?\.demo-pitch-btn:hover\s*\{[^}]*\}', '', html, flags=re.DOTALL)
    html = re.sub(r'/\* Uncoded Hub Studio Popup Modal.*?\*/.*?\.pitch-cta-dismiss:hover\s*\{[^}]*\}', '', html, flags=re.DOTALL)
    
    # Inject new CSS before </style>
    if "</style>" in html:
        html = html.replace("</style>", MODAL_CSS + "\n  </style>", 1)

    # Clean out any previous pitch modal HTML
    html = re.sub(r'<!-- (?:Founder Pitch|Uncoded Hub Studio Pitch).*?-->\s*<div class="pitch-modal-backdrop".*?</div>\s*</div>\s*</div>', '', html, flags=re.DOTALL)
    # Clean out old script block if present
    html = re.sub(r'<script>\s*// Founder Pitch Modal Functions.*?</script>', '', html, flags=re.DOTALL)

    # Inject Modal HTML and JS before </body>
    if "</body>" in html:
        html = html.replace("</body>", MODAL_HTML + "\n" + MODAL_JS + "\n</body>", 1)

    # Enhance top banner if present in public/demos
    if "Book Your 7-Day Sprint →" in html or "Claim This Website For My Business" in html:
        # Standardize sprint bar
        bar_replacement = """<div style="background: #14130F; color: #F5F3EF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; padding: 10px 20px; border-bottom: 1px solid rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 99999; backdrop-filter: blur(12px); box-shadow: 0 4px 20px rgba(0,0,0,0.25);">
    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
      <a href="/portfolio" style="color: #FFFFFF; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 12px; padding: 5px 12px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; transition: all 0.2s ease;">
        ← Back to Portfolio
      </a>
      <span style="color: rgba(245,243,239,0.4); display: inline-block;">|</span>
      <span style="color: #F5F3EF; font-weight: 500; font-size: 12.5px;">
        Handcrafted 7-Day Sprint Prototype • Built Exclusively by Uncoded Hub
      </span>
      <button class="demo-pitch-btn" onclick="openPitchModal()">✨ Why We Built This Demo</button>
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <a href="https://wa.me/918660819023?text=Hi%20Uncoded%20Hub,%20I%20want%20to%20claim%20this%20website%20for%20my%20business." style="background: #22C55E; color: #0B1C11; font-weight: 700; padding: 6px 14px; border-radius: 6px; text-decoration: none; font-size: 12px; display: inline-flex; align-items: center; gap: 6px;" target="_blank">
        Claim This Website For My Business
      </a>
    </div>
  </div>"""
        html = re.sub(r'<!-- Top Uncoded Hub Specimen Banner -->.*?</div>\s*</div>', '<!-- Top Uncoded Hub Specimen Banner -->\n  ' + bar_replacement, html, flags=re.DOTALL)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[UPDATED] {file_path}")

print("Syncing completed successfully.")
