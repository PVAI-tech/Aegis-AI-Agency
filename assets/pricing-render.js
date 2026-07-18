/* Renders the Productised AI cards, comparison table, add-ons and
   exclusions from window.PRICING_DATA (assets/pricing-data.js) — the
   single source those numbers live in. See docs/PRICING_IMPLEMENTATION.md. */
(function () {
  "use strict";
  const D = window.PRICING_DATA;
  if (!D) return;

  function money(n) {
    return "£" + n.toLocaleString("en-GB");
  }

  function planUrl(planId) {
    return "enquiry.html?plan=" + encodeURIComponent(planId);
  }

  // --- Pricing cards ---------------------------------------------------
  function renderCard(plan) {
    const featuredClass = plan.featured ? " pc-featured" : "";
    const badge = plan.featured
      ? `<span class="pc-badge pb-best" role="note" aria-label="Recommended plan">Recommended</span>`
      : "";

    const priceBlock = plan.customPricing
      ? `<div class="pc-price-split">
           <div class="pc-setup">One-time setup: <strong>Custom</strong></div>
           <div class="pc-monthly" style="font-size:1.7rem;">Custom monthly plan</div>
         </div>`
      : `<div class="pc-price-split">
           <div class="pc-setup">One-time setup: <strong>${money(plan.setupFee)}</strong></div>
           <div class="pc-monthly">${money(plan.monthlyFee)} <span>per month</span></div>
         </div>`;

    const visibleFeatures = plan.features.slice(0, 7);
    const featureItems = visibleFeatures.map(f => `<li><span class="fi">✓</span>${f}</li>`).join("");
    const footnote = plan.featureFootnote ? `<p class="pc-footnote">${plan.featureFootnote}</p>` : "";

    return `
      <div class="pc rv${featuredClass}" data-plan="${plan.id}">
        ${badge}
        <div class="pc-name">${plan.name}</div>
        <p class="pc-tagline">${plan.tagline}</p>
        ${priceBlock}
        <ul class="pc-feats">${featureItems}</ul>
        ${footnote}
        <a href="${planUrl(plan.id)}" class="btn-price ${plan.featured ? "btn-fill" : "btn-out"}" data-plan-cta="${plan.id}">${plan.ctaLabel} →</a>
        <button type="button" class="pc-details-toggle" aria-expanded="false" aria-controls="details-${plan.id}">View full plan details</button>
        <div class="pc-details" id="details-${plan.id}" hidden>
          <ul class="legal-list">
            <li>Included usage: ${plan.conversationsIncluded ? plan.conversationsIncluded.toLocaleString("en-GB") + " conversations/month" : (plan.overageLabel || "Tailored allowance")}</li>
            <li>Assistants: ${plan.assistants}</li>
            <li>Channels: ${plan.channels}</li>
            <li>Knowledge sources: ${plan.knowledgeSourcesLabel || (plan.knowledgeSources + " approved sources")}</li>
            <li>Support: ${plan.supportWindow}</li>
            <li>Estimated implementation: ${plan.implementationEstimate}</li>
            <li>Overage: ${plan.overageRate ? `£${plan.overageRate} per additional 100 conversations` : (plan.overageLabel || "Agreed with Enterprise")}</li>
          </ul>
        </div>
      </div>`;
  }

  const cardsContainer = document.getElementById("productisedAiCards");
  if (cardsContainer) {
    cardsContainer.innerHTML = D.plans.map(renderCard).join("");

    cardsContainer.querySelectorAll(".pc-details-toggle").forEach(btn => {
      btn.addEventListener("click", () => {
        const panel = document.getElementById(btn.getAttribute("aria-controls"));
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        panel.hidden = open;
        btn.textContent = open ? "View full plan details" : "Hide plan details";
      });
    });

    cardsContainer.querySelectorAll("[data-plan-cta]").forEach(a => {
      a.addEventListener("click", () => {
        if (window.trackEvent) trackEvent("cta_click", { cta: "pricing_plan_" + a.dataset.planCta });
      });
    });
  }

  // --- Comparison table (desktop table / mobile accordion) --------------
  const rows = [
    { label: "One-time setup", get: p => (p.customPricing ? "Custom" : money(p.setupFee)) },
    { label: "Monthly service", get: p => (p.customPricing ? "Custom" : money(p.monthlyFee) + "/mo") },
    { label: "Included conversations", get: p => (p.conversationsIncluded ? p.conversationsIncluded.toLocaleString("en-GB") + "/mo" : "Custom") },
    { label: "AI assistants", get: p => p.assistants },
    { label: "Channels", get: p => p.channels },
    { label: "Knowledge sources", get: p => p.knowledgeSourcesLabel || (p.knowledgeSources + " sources") },
    { label: "Lead capture", get: p => p.leadCapture },
    { label: "Booking", get: p => (p.booking === false ? "—" : (p.booking === true ? "Included" : p.booking)) },
    { label: "CRM integration", get: p => (p.crm === false ? "—" : p.crm) },
    { label: "Analytics", get: p => p.analytics },
    { label: "Optimisation reviews", get: p => (p.optimisationReview === false ? "—" : p.optimisationReview) },
    { label: "Support", get: p => p.supportWindow },
    { label: "Overage rate", get: p => (p.overageRate ? `£${p.overageRate}/100 conversations` : (p.overageLabel || "—")) },
    { label: "Est. implementation", get: p => p.implementationEstimate }
  ];

  const tableEl = document.getElementById("pricingComparisonTable");
  if (tableEl) {
    const head = `<tr><th scope="col">Compare plans</th>${D.plans.map(p => `<th scope="col">${p.name}</th>`).join("")}</tr>`;
    const body = rows.map(r => `<tr><th scope="row">${r.label}</th>${D.plans.map(p => `<td>${r.get(p)}</td>`).join("")}</tr>`).join("");
    tableEl.innerHTML = `<thead>${head}</thead><tbody>${body}</tbody>`;
  }

  // Mobile accordion version of the same data
  const accordionEl = document.getElementById("pricingComparisonAccordion");
  if (accordionEl) {
    accordionEl.innerHTML = D.plans.map(p => `
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">${p.name}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <div class="faq-a"><div class="faq-a-in">
          <ul class="legal-list">${rows.map(r => `<li><strong>${r.label}:</strong> ${r.get(p)}</li>`).join("")}</ul>
        </div></div>
      </div>`).join("");
    accordionEl.querySelectorAll(".faq-q").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const open = item.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(open));
      });
    });
  }

  // --- Add-ons -----------------------------------------------------------
  const addOnsEl = document.getElementById("pricingAddOns");
  if (addOnsEl) {
    addOnsEl.innerHTML = D.addOns.map(a => `<li><span>${a.name}</span><strong>${a.price}</strong></li>`).join("");
  }

  // --- Exclusions ----------------------------------------------------------
  const exclusionsEl = document.getElementById("pricingExclusions");
  if (exclusionsEl) {
    exclusionsEl.innerHTML = D.exclusions.map(e => `<li>${e} <span class="excl-note">— available by separate quotation where appropriate</span></li>`).join("");
  }

  // --- Client responsibilities ---------------------------------------------
  const respEl = document.getElementById("pricingClientResponsibilities");
  if (respEl) {
    respEl.innerHTML = D.clientResponsibilities.map(r => `<li>${r}</li>`).join("");
  }

  // --- Dynamic numbers inside static copy (usage policy, VAT, etc.) --------
  document.querySelectorAll("[data-pricing-field]").forEach(el => {
    const path = el.dataset.pricingField.split(".");
    let value = D;
    for (const key of path) value = value && value[key];
    if (value !== undefined) el.textContent = value;
  });
})();
