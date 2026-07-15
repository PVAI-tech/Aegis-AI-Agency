/* Jarvis — AI Business Consultant widget.
   Currently answers from a small canned knowledge base so the widget feels
   real without a backend. To connect a real model later: replace the body
   of getJarvisResponse() with a fetch('/api/jarvis', {...}) call — every
   caller already awaits it and only cares about the returned string, so
   nothing else in this file needs to change. */
(function () {
  "use strict";

  const launcher = document.getElementById("jarvisLauncher");
  const panel = document.getElementById("jarvisPanel");
  const closeBtn = document.getElementById("jarvisClose");
  const body = document.getElementById("jarvisBody");
  const promptsEl = document.getElementById("jarvisPrompts");
  const form = document.getElementById("jarvisForm");
  const input = document.getElementById("jarvisInput");
  if (!launcher || !panel || !body || !form || !input) return;

  const KNOWLEDGE_BASE = [
    {
      match: ["cost", "price", "pricing", "how much", "expensive", "budget"],
      reply:
        "Our Starter Presence website is £699 (delivered in 5 days), and the Growth System with a full AI + automation pipeline is £1,499 (10 days). For multi-system or custom builds we scope Enterprise pricing on a call. Want a precise quote for your project?"
    },
    {
      match: ["automation", "automate", "workflow", "what automation", "need"],
      reply:
        "That depends on where you're losing the most time — lead follow-up, scheduling, admin or customer questions are the most common. On a free consultation we map your actual workflow and recommend exactly what's worth automating first."
    },
    {
      match: ["booking", "book a", "appointment", "schedule", "calendar"],
      reply:
        "Yes — we build booking flows directly into your website with real-time availability, automated reminders and rescheduling, so you stop losing time to back-and-forth messages. Typical delivery is 5–7 days."
    },
    {
      match: ["industr", "sector", "niche", "type of business", "who do you work"],
      reply:
        "We've built for beauty & e-commerce, hospitality, and personal AI systems so far — but our approach (website + automation + AI) works for most service-based and product-based UK businesses. Tell me about yours and I can point you in the right direction."
    },
    {
      match: ["chatbot", "chat bot", "ai assistant", "ai chat"],
      reply:
        "We build custom-trained AI chatbots on your actual business — services, pricing, FAQs — not a generic script. They qualify visitors, answer questions and book calls 24/7. Typical delivery is 7–10 business days."
    },
    {
      match: ["timeline", "how long", "delivery", "how fast", "when"],
      reply:
        "Most projects go live in 5–10 business days depending on scope — a website alone is usually 5–7 days, a full AI + automation system is closer to 10. We'll give you an exact timeline on your discovery call."
    }
  ];

  const FALLBACK_REPLY =
    "Good question — that's exactly the kind of thing we cover on a free consultation call, where I can give you a precise answer for your specific business.";

  async function getJarvisResponse(promptText) {
    const lower = promptText.toLowerCase();
    const hit = KNOWLEDGE_BASE.find(entry => entry.match.some(kw => lower.includes(kw)));
    // Simulated thinking delay so the widget feels alive even on canned answers.
    await new Promise(resolve => setTimeout(resolve, 650 + Math.random() * 500));
    return hit ? hit.reply : FALLBACK_REPLY;
  }

  function addMessage(text, who) {
    const el = document.createElement("div");
    el.className = "jarvis-msg jarvis-msg-" + who;
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }

  function showTyping() {
    const el = document.createElement("div");
    el.className = "jarvis-typing";
    el.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }

  async function sendPrompt(text) {
    if (!text.trim()) return;
    addMessage(text, "user");
    if (window.trackEvent) trackEvent("jarvis_prompt", { prompt: text });
    const typing = showTyping();
    const reply = await getJarvisResponse(text);
    typing.remove();
    addMessage(reply, "bot");
  }

  function openPanel() {
    panel.classList.add("open");
    launcher.setAttribute("aria-expanded", "true");
    if (window.trackEvent) trackEvent("jarvis_open", {});
    setTimeout(() => input.focus(), 300);
  }

  function closePanel() {
    panel.classList.remove("open");
    launcher.setAttribute("aria-expanded", "false");
  }

  launcher.addEventListener("click", () => {
    panel.classList.contains("open") ? closePanel() : openPanel();
  });
  if (closeBtn) closeBtn.addEventListener("click", closePanel);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && panel.classList.contains("open")) closePanel();
  });

  if (promptsEl) {
    promptsEl.querySelectorAll(".jarvis-prompt").forEach(btn => {
      btn.addEventListener("click", () => sendPrompt(btn.textContent));
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const text = input.value;
    input.value = "";
    sendPrompt(text);
  });
})();
