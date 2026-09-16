document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  const form = document.getElementById("contact-form");
  if (!form) return;

  const submitBtn = document.getElementById("submit-btn");
  const successMsg = document.getElementById("success-msg");
  const errorMsg = document.getElementById("error-msg");

  function showFieldError(field, message) {
    const errorEl = form.querySelector(`[data-error-for="${field}"]`);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove("hidden");
    }
  }

  function clearFieldErrors() {
    form.querySelectorAll(".error-text").forEach((el) => {
      el.textContent = "";
      el.classList.add("hidden");
    });
  }

  function validate(data) {
    const errors = {};
    if (!data.name.trim()) errors.name = "Name is required.";
    if (!data.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email.";
    if (!data.phone.trim()) errors.phone = "Phone number is required.";
    else if (!/^[0-9+\-\s()]{7,15}$/.test(data.phone)) errors.phone = "Enter a valid phone number.";
    if (!data.message.trim()) errors.message = "Please add a short message.";
    return errors;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearFieldErrors();
    successMsg.classList.add("hidden");
    errorMsg.classList.add("hidden");

    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      message: form.message.value,
    };

    const errors = validate(data);
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, msg]) => showFieldError(field, msg));
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");

      successMsg.classList.remove("hidden");
      form.reset();
    } catch (err) {
      errorMsg.classList.remove("hidden");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
});