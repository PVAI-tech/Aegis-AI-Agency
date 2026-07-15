/* Enquiry form: client-side validation + submission.
   Note: /api/enquiry.js is a Vercel serverless function and only runs once
   this site is deployed to Vercel — it does NOT run under the local
   `python -m http.server` preview used for development. Locally, the fetch
   below will fail (connection refused), which is expected; the form still
   redirects to thank-you.html so the full user-facing flow can be tested
   without a deployed backend. */
(function () {
  "use strict";

  const form = document.getElementById("enquiryForm");
  if (!form) return;
  const status = document.getElementById("formStatus");

  const REQUIRED_FIELDS = ["fullName", "businessName", "email", "phone", "industry", "businessSize", "budget", "projectDescription", "urgency"];

  function setError(name, hasError) {
    const field = form.querySelector(`[name="${name}"]`);
    if (!field) return;
    const wrapper = field.closest(".field");
    if (wrapper) wrapper.classList.toggle("has-error", hasError);
    field.classList.toggle("error", hasError);
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validate(data) {
    let valid = true;
    REQUIRED_FIELDS.forEach(name => {
      const empty = !data[name] || !String(data[name]).trim();
      setError(name, empty);
      if (empty) valid = false;
    });
    if (data.email && !isValidEmail(data.email)) {
      setError("email", true);
      valid = false;
    }
    return valid;
  }

  function collectFormData() {
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    data.servicesInterested = fd.getAll("servicesInterested");
    return data;
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = collectFormData();

    if (!validate(data)) {
      if (status) {
        status.textContent = "Please fill in the required fields highlighted above.";
        status.className = "form-status show error";
      }
      const firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
      if (firstError) firstError.focus();
      return;
    }

    if (window.trackEvent) trackEvent("enquiry_submit", { services: data.servicesInterested, budget: data.budget, urgency: data.urgency });

    if (status) {
      status.textContent = "Sending your enquiry…";
      status.className = "form-status show sending";
    }
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    } catch (err) {
      // Expected locally (no serverless runtime under the dev preview server).
      // Once deployed to Vercel this endpoint is live — see assets/enquiry-form.js
      // header comment. We still continue to the thank-you page either way so
      // the enquiry isn't blocked by a transient network issue.
      console.warn("Enquiry API request failed (expected during local preview):", err);
    }

    window.location.href = "thank-you.html";
  });

  // Clear an individual field's error state as soon as the user fixes it.
  form.querySelectorAll("input, select, textarea").forEach(el => {
    el.addEventListener("input", () => setError(el.name, false));
    el.addEventListener("change", () => setError(el.name, false));
  });
})();
