 const form = document.getElementById("form");
 if (form) {
    // Dynamically set redirect URL
    const redirectInput = document.createElement("input");
    redirectInput.type = "hidden";
    redirectInput.name = "redirect";
    redirectInput.value = `${window.location.origin}/?success=true#contact`;
    form.appendChild(redirectInput);

    // Detect redirect back to #contact with success
    const successMsg = document.getElementById("success-message");
    const queryString = window.location.search || window.location.hash.split('?')[1] || "";
    const urlParams = new URLSearchParams(queryString);
    const wasSuccessful = urlParams.get("success") === "true";

    if (wasSuccessful && successMsg) {
        form.style.display = "none";
        localStorage.removeItem("contact-form");
        successMsg.classList.add("show");

        // Smooth scroll to the success message
        successMsg.scrollIntoView({ behavior: "smooth", block: "start" });
        
        // add a short fade-in effect
        successMsg.classList.add("fade-in");

        // clean up URL
        history.replaceState(null, "", window.location.pathname + "#contact");
    } else {
        // Restore saved values if not a success redirect
        const savedFormData = JSON.parse(localStorage.getItem("contact-form")) || {};
        for (const [key, value] of Object.entries(savedFormData)) {
            const input = form.elements[key];
            if (input) input.value = value;
        }
    }

    // Save input values
    form.addEventListener("input", () => {
    const formData = {};
    Array.from(form.elements).forEach(el => {
        if (el.name && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) {
        formData[el.name] = el.value;
        }
    });
    localStorage.setItem("contact-form", JSON.stringify(formData));
    });

    // hCaptcha validation
    const errorText = form.querySelector("#captcha-error");
    form.addEventListener("submit", function (e) {
    const hCaptcha = form.querySelector('textarea[name="h-captcha-response"]')?.value;
    if (!hCaptcha) {
        e.preventDefault();
        errorText.style.display = "block";
        return;
    }
    errorText.style.display = "none";
    });

    const captchaBox = form.querySelector(".h-captcha");
    captchaBox?.addEventListener("click", () => {
    errorText.style.display = "none";
    });
}