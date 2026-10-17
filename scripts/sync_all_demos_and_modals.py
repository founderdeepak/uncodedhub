import os
import shutil
import re

# 1. First, copy the freshly built 11 new demos from "Demo Website Template for New Niches" into "public/demos/"
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
      font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;
      color: #555046; font-weight: 600; margin-top: 3px; font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .uh-badge-studio {
      background: #14130F; color: #FAF8F5; border: 1px solid #14130F;
      font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
      padding: 5px 12px; border-radius: 20px;
    }

    /* Founders Presentation Row */
    .founders-row {
      display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: center;
      background: #F4F1EA; border: 1px solid #DDD8CE; border-radius: 16px;
      padding: 18px 22px; margin-bottom: 20px;
    }
    .founders-photos {
      display: flex; gap: 10px;
    }
    .founder-pic-box {
      width: 66px; text-align: center;
    }
    .founder-pic {
      width: 66px; height: 76px; object-fit: cover; border-radius: 10px;
      border: 1px solid #C4BDB0; filter: grayscale(10%);
    }
    .founder-name {
      font-size: 11.5px; font-weight: 700; color: #14130F; margin-top: 4px; display: block;
    }
    .founder-role {
      font-size: 9.5px; color: #555046; text-transform: uppercase; letter-spacing: 0.05em; display: block;
    }
    .founders-intro h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 23px; line-height: 1.2; font-weight: 700; color: #14130F; margin-bottom: 5px;
    }
    .founders-intro p {
      font-size: 13.5px; line-height: 1.5; color: #2D2B26; margin: 0;
    }

    /* Letter Body */
    .pitch-body {
      font-size: 14.5px; line-height: 1.68; color: #14130F; display: flex; flex-direction: column; gap: 16px;
    }
    .pitch-body p {
      color: #2D2B26; margin: 0;
    }
    .pitch-body strong { color: #14130F; font-weight: 700; }
    
    .insight-card {
      background: #FFFFFF; border: 1px solid #DDD8CE;
      border-radius: 14px; padding: 18px 22px;
    }
    .insight-card h4 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 18px; font-weight: 700; color: #14130F; margin-bottom: 6px;
    }
    .insight-card p {
      font-size: 13.5px; color: #2D2B26; line-height: 1.55; margin: 0;
    }

    /* About Belief Callout */
    .belief-card {
      background: #FAF8F5; border-left: 3.5px solid #C7074B; border-top: 1px solid #DDD8CE;
      border-right: 1px solid #DDD8CE; border-bottom: 1px solid #DDD8CE;
      border-radius: 0 14px 14px 0; padding: 18px 22px;
    }}
    .belief-card .belief-quote {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 16.5px; font-style: italic; color: #14130F; margin-bottom: 10px; line-height: 1.45;
    }
    .commitments-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px; padding-top: 10px; border-top: 1px solid #EDEAE4;
    }
    .comm-item { font-size: 12px; color: #2D2B26; line-height: 1.4; }
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
      font-size: 12.5px; color: #2D2B26; line-height: 1.45; margin: 0;
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
      background: transparent; border: 1.5px solid #C4BDB0; color: #555046;
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

    /* Floating Right Corner Lead Magnet Trigger & Pop-out Bubble */
    .lead-magnet-floating-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99990;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    }

    .lm-speech-bubble {
      background: #14130F;
      color: #FAF8F5;
      padding: 14px 18px 14px 16px;
      border-radius: 14px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      box-shadow: 0 12px 36px rgba(20, 19, 15, 0.35);
      max-width: 310px;
      position: relative;
      cursor: pointer;
      transform-origin: bottom right;
      animation: gentleFloat 4s ease-in-out infinite;
      transition: all 0.25s ease;
    }
    .lm-speech-bubble:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 16px 42px rgba(20, 19, 15, 0.45);
      border-color: rgba(199, 7, 75, 0.6);
    }
    .lm-speech-bubble::after {
      content: "";
      position: absolute;
      bottom: -8px;
      right: 24px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid #14130F;
    }

    .lm-bubble-close {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: #D6D0C5;
      font-size: 11px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .lm-bubble-close:hover {
      background: #C7074B;
      color: #FFFFFF;
    }

    .lm-bubble-badge {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #FFFFFF;
      background: #C7074B;
      padding: 2px 7px;
      border-radius: 4px;
      margin-bottom: 6px;
    }
    .lm-bubble-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #FFFFFF;
      line-height: 1.3;
      margin-bottom: 4px;
    }
    .lm-bubble-sub {
      font-size: 11.5px;
      color: #D6D0C5;
      line-height: 1.4;
      margin-bottom: 8px;
    }
    .lm-bubble-cta {
      font-size: 11.5px;
      font-weight: 700;
      color: #FF5A8D;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .lm-floating-btn {
      background: #14130F;
      color: #FAF8F5;
      border: 1.5px solid rgba(255, 255, 255, 0.25);
      border-radius: 50px;
      padding: 10px 18px 10px 14px;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(20, 19, 15, 0.4);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }
    .lm-floating-btn:hover {
      background: #C7074B;
      border-color: #C7074B;
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 12px 28px rgba(199, 7, 75, 0.45);
    }
    .lm-btn-icon-wrap {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #C7074B;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
    .lm-floating-btn:hover .lm-btn-icon-wrap {
      background: #FFFFFF;
      color: #C7074B;
    }

    .lm-pulse-ping {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #C7074B;
      box-shadow: 0 0 0 0 rgba(199, 7, 75, 0.7);
      animation: pulsePing 2s infinite;
    }

    @keyframes gentleFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    @keyframes pulsePing {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(199, 7, 75, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(199, 7, 75, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(199, 7, 75, 0); }
    }

    @media (max-width: 768px) {
      .pitch-modal-card { padding: 24px 20px; }
      .founders-row { grid-template-columns: 1fr; gap: 16px; text-align: center; }
      .founders-photos { justify-content: center; }
      .commitments-grid { grid-template-columns: 1fr; gap: 10px; }
      .lead-magnet-box { flex-direction: column; align-items: flex-start; gap: 14px; }
      .lm-download-btn { width: 100%; justify-content: center; }
      .pitch-actions { flex-direction: column; align-items: stretch; }
      .pitch-cta-wa, .pitch-cta-dismiss { width: 100%; justify-content: center; text-align: center; }
      .lead-magnet-floating-widget {
        bottom: 80px;
        right: 14px;
      }
      .lm-speech-bubble {
        max-width: 260px;
        padding: 12px 14px;
      }
      .lm-bubble-title { font-size: 12.5px; }
      .lm-bubble-sub { font-size: 11px; }
      .lm-floating-btn { font-size: 12px; padding: 8px 14px; }
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

  <!-- Floating Right-Corner Lead Magnet Button & Pop-out Speech Bubble -->
  <div class="lead-magnet-floating-widget" id="leadMagnetWidget">
    <div class="lm-speech-bubble" id="lmSpeechBubble" onclick="openPitchModal()">
      <button class="lm-bubble-close" onclick="closeLeadMagnetBubble(event)" title="Dismiss bubble">✕</button>
      <span class="lm-bubble-badge">FREE 2-PAGE STRATEGY BRIEFING</span>
      <div class="lm-bubble-title">Why Top Businesses Win Local Clients</div>
      <div class="lm-bubble-sub">The 50ms trust decision &amp; why delaying a website costs you clients every week.</div>
      <div class="lm-bubble-cta">Read Pitch &amp; Download 2-Page PDF →</div>
    </div>
    <button class="lm-floating-btn" onclick="openPitchModal()" title="Free 2-Page Executive Guide">
      <span class="lm-btn-icon-wrap">📄</span>
      <span>Free 2-Page Guide</span>
      <span class="lm-pulse-ping"></span>
    </button>
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

    function closeLeadMagnetBubble(e) {
      if (e) e.stopPropagation();
      const bubble = document.getElementById('lmSpeechBubble');
      if (bubble) bubble.style.display = 'none';
      sessionStorage.setItem('uncoded_bubble_dismissed', 'true');
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

    // Check if bubble was previously dismissed in session
    window.addEventListener('DOMContentLoaded', function() {
      if (sessionStorage.getItem('uncoded_bubble_dismissed')) {
        const bubble = document.getElementById('lmSpeechBubble');
        if (bubble) bubble.style.display = 'none';
      }
    });

    // Gentle auto-open for first-time visitors after 15 seconds
    window.addEventListener('DOMContentLoaded', function() {
      setTimeout(function() {
        if (!localStorage.getItem('uncoded_pitch_viewed')) {
          openPitchModal();
        }
      }, 15000);
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
    html = re.sub(r'/\* Uncoded Hub Studio Popup Modal.*?\*/.*?\.lm-floating-btn\s*\{[^}]*\}\s*\}', '', html, flags=re.DOTALL)
    
    # Inject new CSS before </style>
    if "</style>" in html:
        html = html.replace("</style>", MODAL_CSS + "\n  </style>", 1)

    # Clean out any previous pitch modal HTML & floating widget HTML
    html = re.sub(r'<!-- (?:Founder Pitch|Uncoded Hub Studio Pitch).*?-->\s*<div class="pitch-modal-backdrop".*?</div>\s*</div>\s*</div>', '', html, flags=re.DOTALL)
    html = re.sub(r'<!-- Floating Right-Corner Lead Magnet Button.*?-->\s*<div class="lead-magnet-floating-widget".*?</div>\s*</div>', '', html, flags=re.DOTALL)
    
    # Clean out old script block if present
    html = re.sub(r'<script>\s*// Founder Pitch Modal Functions.*?</script>', '', html, flags=re.DOTALL)

    # Inject Modal HTML and JS before </body>
    if "</body>" in html:
        html = html.replace("</body>", MODAL_HTML + "\n" + MODAL_JS + "\n</body>", 1)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[UPDATED] {file_path}")

print("Syncing completed successfully.")
