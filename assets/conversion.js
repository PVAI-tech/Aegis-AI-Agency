/* Conversion features: scroll progress bar, sticky CTA bar, and a single
   "Free AI Business Audit" modal triggered by exit-intent on desktop or
   scroll depth on mobile (once per session either way). */
(function () {
  "use strict";

  const CALENDLY = "https://calendly.com/aegishealthai/30min?back=1&month=2026-06";

  // --- Scroll progress bar -------------------------------------------------
  const progress = document.getElementById("scrollProgress");
  function updateProgress() {
    if (!progress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = Math.min(100, Math.max(0, pct)) + "%";
  }

  // --- Sticky CTA bar -------------------------------------------------------
  const stickyCta = document.getElementById("stickyCta");
  const trustEl = document.getElementById("trust");
  const nav = document.getElementById("nav");
  function positionStickyCta() {
    if (!stickyCta || !nav) return;
    stickyCta.style.top = nav.offsetHeight + "px";
  }
  function updateStickyCta() {
    if (!stickyCta || !trustEl) return;
    const past = trustEl.getBoundingClientRect().bottom < 0;
    stickyCta.classList.toggle("show", past);
  }

  function onScroll() {
    updateProgress();
    updateStickyCta();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", positionStickyCta);
  positionStickyCta();
  onScroll();

  // --- Free AI Business Audit modal (exit-intent / scroll-depth) -----------
  const AUDIT_KEY = "aegisAuditShown";
  function showAuditModal() {
    if (sessionStorage.getItem(AUDIT_KEY)) return;
    if (!window.openModal) return;
    sessionStorage.setItem(AUDIT_KEY, "1");
    if (window.trackEvent) trackEvent("audit_modal_open", {});
    window.openModal(`
      <div class="audit-modal-icon">🎯</div>
      <h3 class="modal-title" id="modalTitle">Get a Free AI Business Audit</h3>
      <div class="modal-section"><p>Before you go — want a second pair of eyes on where AI and automation could actually save you time? We'll review your current site and workflow and tell you exactly what's worth building first, no obligation.</p></div>
      <ul class="audit-modal-list">
        <li>15-minute call, no sales pitch</li>
        <li>A clear, prioritised list of quick wins</li>
        <li>Free, even if you never work with us</li>
      </ul>
      <div class="modal-cta">
        <a href="${CALENDLY}" target="_blank" rel="noopener" class="btn-p" onclick="trackEvent('cta_click',{cta:'audit_modal'})">Get My Free Audit</a>
      </div>
    `);
  }

  // Desktop: exit-intent (mouse leaves toward the top of the viewport).
  document.addEventListener("mouseout", e => {
    if (!e.relatedTarget && e.clientY <= 0) showAuditModal();
  });

  // Mobile (and anyone who scrolls deep without leaving): scroll-depth trigger.
  let depthChecked = false;
  window.addEventListener(
    "scroll",
    () => {
      if (depthChecked) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable > 0.7) {
        depthChecked = true;
        showAuditModal();
      }
    },
    { passive: true }
  );
})();
