/* Shared modal engine — used by service-card detail modals and the
   exit-intent / scroll-depth consultation modal. Any page that includes
   a #modalOverlay/#modalBody/#modalClose set (see index.html) gets
   window.openModal(html) / window.closeModal() for free. */
(function () {
  "use strict";

  const overlay = document.getElementById("modalOverlay");
  const body = document.getElementById("modalBody");
  const closeBtn = document.getElementById("modalClose");
  if (!overlay || !body || !closeBtn) return;

  let lastFocused = null;

  function trapTab(e) {
    if (e.key === "Escape") {
      closeModal();
      return;
    }
    if (e.key !== "Tab") return;
    const focusables = overlay.querySelectorAll(
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function openModal(html) {
    lastFocused = document.activeElement;
    body.innerHTML = html;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", trapTab);
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", trapTab);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", e => {
    if (e.target === overlay) closeModal();
  });

  window.openModal = openModal;
  window.closeModal = closeModal;
})();
