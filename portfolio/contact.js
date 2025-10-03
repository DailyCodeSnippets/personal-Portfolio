// Import EmailJS library in HTML file
// <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>

// ✅ Initialize EmailJS
(function () {
	emailjs.init("5ZREdyqOqxJqblPsE"); // Replace with your EmailJS Public Key
})();

// ✅ DOM Elements
const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");
const btnText = document.getElementById("btnText");
const btnSpinner = document.getElementById("btnSpinner");
const toastEl = document.getElementById("formToast");
const toastMessage = document.getElementById("toastMessage");
const toast = new bootstrap.Toast(toastEl);

// ✅ Form Submission
contactForm.addEventListener("submit", function (e) {
	e.preventDefault();

	// Show spinner & update button text
	btnSpinner.style.display = "inline-block";
	btnText.textContent = "Sending...";
	sendBtn.disabled = true;

	// Send Email via EmailJS
	emailjs
		.sendForm("service_syk2qpt", "template_oemjrfm", this)
		.then(() => {
			showToast("✅ Message sent successfully!", "success");
			contactForm.reset();
		})
		.catch((error) => {
			showToast("❌ Failed to send message. Please try again.", "danger");
			console.error("EmailJS Error:", error);
		})
		.finally(() => {
			// Reset button state
			btnSpinner.style.display = "none";
			btnText.textContent = "Send Message";
			sendBtn.disabled = false;
		});
});

// ✅ Show Toast Notification (Reusable)
function showToast(message, type) {
	toastMessage.textContent = message;

	// Change toast color based on type
	if (type === "success") {
		toastEl.classList.remove("bg-danger");
		toastEl.classList.add("bg-success");
	} else {
		toastEl.classList.remove("bg-success");
		toastEl.classList.add("bg-danger");
	}

	toast.show();

	// Optional: Highlight form area briefly
	highlightForm();
}

// ✅ Highlight Contact Form on Toast Display
function highlightForm() {
	contactForm.classList.add("form-highlight");
	setTimeout(() => contactForm.classList.remove("form-highlight"), 1500);
}
