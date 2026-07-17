(function () {
  "use strict";

  const CALENDLY = "https://calendly.com/aegishealthai/30min?back=1&month=2026-06";

  // Conversion tracking helper. Safe no-op until a real GA4/GTM snippet is
  // enabled (see M10) — pushes to dataLayer if present so events aren't lost
  // once tracking goes live, and never throws if called from inline onclick
  // handlers before dataLayer exists.
  window.trackEvent = function (name, data) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, data || {}));
  };

  // Force-hide loader after a short delay and again after full load.
  function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("out", "force-hide");
      setTimeout(() => loader.remove(), 900);
    }
    document.querySelectorAll("main, section, .hero, .hero-inner, .wrap, .wrap-sm, .wrap-xs, .rv, .fade-up, .reveal, [data-animate]").forEach(el => {
      el.style.opacity = "1";
      el.style.visibility = "visible";
      el.style.transform = "none";
    });
  }
  document.addEventListener("DOMContentLoaded", hideLoader);
  window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, 1800);
  setTimeout(hideLoader, 3500);

  // Calendly links for all sales CTAs.
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".nav-cta, .btn-p, .btn-price").forEach(a => {
      const text = (a.textContent || "").toLowerCase();
      if (text.includes("book") || text.includes("started") || text.includes("schedule") || text.includes("website") || text.includes("system")) {
        a.href = CALENDLY;
        a.target = "_blank";
        a.rel = "noopener";
      }
    });
  });

  // Sticky nav.
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
  });

  // Mobile menu.
  const hbg = document.getElementById("hbg");
  const mob = document.getElementById("mobmenu");
  window.closeMob = function () {
    if (hbg) hbg.classList.remove("open");
    if (mob) mob.classList.remove("open");
  };
  if (hbg && mob) {
    hbg.addEventListener("click", () => {
      hbg.classList.toggle("open");
      mob.classList.toggle("open");
    });
  }

  // Reveal animation with safe fallback.
  const revealEls = document.querySelectorAll(".rv, .process-timeline");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("show"));
  }
  // Safety net: most .rv content stays visible even without "show" thanks to
  // the !important overrides above, but a few effects (like the process
  // timeline's drawn connecting line) have no visual fallback — force them
  // in after a short delay in case the observer never fires.
  setTimeout(() => {
    document.querySelectorAll(".process-timeline:not(.show)").forEach(el => el.classList.add("show"));
  }, 2500);

  // "Built With" marquee — real technologies Aegis actually builds with.
  const mq = document.getElementById("mqtrack");
  if (mq && !mq.children.length) {
    const items = ["OpenAI API", "Vercel", "HTML5", "CSS3", "JavaScript", "Python", "Whisper", "n8n"];
    const html = items.concat(items).map(x => `<div class="mq-item">✦ ${x}</div>`).join("");
    mq.innerHTML = html;
  }

  // FAQ.
  document.querySelectorAll(".faq-q").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      if (item) item.classList.toggle("open");
    });
  });

  // Card hover glow coordinates.
  document.querySelectorAll(".sc, .portfolio-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--cx", (e.clientX - r.left) + "px");
      card.style.setProperty("--cy", (e.clientY - r.top) + "px");
    });
  });

})();
