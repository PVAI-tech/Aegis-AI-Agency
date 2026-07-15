(function () {
  "use strict";

  const CALENDLY = "https://calendly.com/aegishealthai/30min?back=1&month=2026-06";

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

  // Mouse glow.
  const mglow = document.getElementById("mglow");
  if (mglow) {
    window.addEventListener("mousemove", e => {
      mglow.style.left = e.clientX + "px";
      mglow.style.top = e.clientY + "px";
    });
  }

  // Canvas particle background.
  const cnv = document.getElementById("cnv");
  if (cnv) {
    const ctx = cnv.getContext("2d");
    let w, h, particles = [];
    function resize() {
      w = cnv.width = window.innerWidth;
      h = cnv.height = window.innerHeight;
      particles = Array.from({ length: Math.min(90, Math.floor(w / 18)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        a: Math.random() * 0.55 + 0.15
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${p.a})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    resize();
    draw();
    window.addEventListener("resize", resize);
  }

  // Reveal animation with safe fallback.
  const revealEls = document.querySelectorAll(".rv");
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

  // Counters.
  const counters = document.querySelectorAll("[data-target]");
  const animateCounter = el => {
    const target = Number(el.dataset.target || 0);
    const suffix = el.dataset.suffix || "";
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 45));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + suffix;
    }, 28);
  };
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          co.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => co.observe(c));
  } else {
    counters.forEach(animateCounter);
  }

  // Marquee content.
  const mq = document.getElementById("mqtrack");
  if (mq && !mq.children.length) {
    const items = ["AI Automation", "Premium Websites", "Lead Generation", "AI Chatbots", "CRM Setup", "UK Business Growth", "Fast Delivery", "No Retainers"];
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

  // Testimonial carousel.
  const track = document.getElementById("cartrack");
  const prev = document.getElementById("cprev");
  const next = document.getElementById("cnext");
  const dots = document.getElementById("cdots");
  if (track && prev && next && dots) {
    const cards = Array.from(track.children);
    let idx = 0;
    function visibleCount() {
      if (window.innerWidth < 700) return 1;
      if (window.innerWidth < 1000) return 2;
      return 3;
    }
    function maxIdx() { return Math.max(0, cards.length - visibleCount()); }
    function renderDots() {
      dots.innerHTML = "";
      for (let i = 0; i <= maxIdx(); i++) {
        const d = document.createElement("button");
        d.className = "car-dot" + (i === idx ? " on" : "");
        d.addEventListener("click", () => { idx = i; update(); });
        dots.appendChild(d);
      }
    }
    function update() {
      idx = Math.min(idx, maxIdx());
      const cardW = cards[0] ? cards[0].getBoundingClientRect().width + 24 : 0;
      track.style.transform = `translateX(${-idx * cardW}px)`;
      Array.from(dots.children).forEach((d, i) => d.classList.toggle("on", i === idx));
    }
    prev.addEventListener("click", () => { idx = Math.max(0, idx - 1); update(); });
    next.addEventListener("click", () => { idx = Math.min(maxIdx(), idx + 1); update(); });
    window.addEventListener("resize", () => { renderDots(); update(); });
    renderDots(); update();
  }

  // Card hover glow coordinates.
  document.querySelectorAll(".sc, .portfolio-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--cx", (e.clientX - r.left) + "px");
      card.style.setProperty("--cy", (e.clientY - r.top) + "px");
    });
  });

  // Dashboard mini chart.
  const dchart = document.getElementById("dchart");
  if (dchart) {
    const ctx = dchart.getContext("2d");
    function drawChart() {
      const w = dchart.width = dchart.offsetWidth;
      const h = dchart.height = dchart.offsetHeight;
      ctx.clearRect(0,0,w,h);
      const pts = [20,45,38,70,55,90,82,120,110,145,130,155];
      const max = Math.max(...pts);
      ctx.beginPath();
      pts.forEach((v,i) => {
        const x = (i/(pts.length-1))*w;
        const y = h - (v/max)*(h-25) - 5;
        if (i === 0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      });
      ctx.strokeStyle = "rgba(6,182,212,.95)";
      ctx.lineWidth = 3;
      ctx.shadowBlur = 18;
      ctx.shadowColor = "rgba(59,130,246,.7)";
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
    drawChart();
    window.addEventListener("resize", drawChart);
  }
})();
