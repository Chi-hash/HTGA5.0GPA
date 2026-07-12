
// Config
const LAUNCH_DATE = new Date(Date.now() + 5000); // 5s demo countdown
const WAITLIST_ENDPOINT = "https://script.google.com/macros/s/AKfycbxH13j1yDpFszvXR9AhU5wtPAVxGzac5ZODHGQX4LrPrfGorPCgu1l-n424-Ya8iJ2JWg/exec";


// COUNTDOWN


function pad(n) {
  return String(n).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const diff = LAUNCH_DATE - now;

  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minutesEl = document.getElementById("cd-minutes");
  const secondsEl = document.getElementById("cd-seconds");

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    activateBuyButtons();
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

function formatLaunchDate() {
  const options = { year: "numeric", month: "long", day: "numeric" };
  document.getElementById("launchDateLabel").textContent =
    "Official launch date: " + LAUNCH_DATE.toLocaleDateString("en-US", options);
}


// BUY BUTTON STATE


function activateBuyButtons() {
  [
    document.getElementById("buyBtn"),
    document.getElementById("buyBtnHero"),
  ].forEach((btn) => {
    if (!btn || btn.classList.contains("btn-active")) return;
    btn.disabled = false;
    btn.classList.remove("btn-disabled");
    btn.classList.add("btn-active");
    btn.innerHTML = "Buy Now";
  });

  // Hide instruction hint
  const hintEl = document.querySelector(".hint");
  if (hintEl) {
    hintEl.style.display = "none";
  }
}

const buyBtn = document.getElementById("buyBtn");
const platformModal = document.getElementById("platformModal");
const modalBackdrop = document.getElementById("modalBackdrop");

function openModal() {
  platformModal.classList.remove("hidden");
  platformModal.classList.add("open");
  modalBackdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  platformModal.classList.remove("open");
  modalBackdrop.classList.remove("open");
  document.body.style.overflow = "";
}

buyBtn.addEventListener("click", () => {
  if (buyBtn.disabled) return;
  openModal();
});

document.getElementById("buyBtnHero").addEventListener("click", () => {
  if (document.getElementById("buyBtnHero").disabled) return;
  openModal();
});

modalBackdrop.addEventListener("click", closeModal);


// WAITLIST FORM

const form = document.getElementById('waitlistForm');
const successMessage = document.getElementById('successMessage');
 
form.addEventListener('submit', async (e) => {
  e.preventDefault();
 
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalLabel = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting…';
 
  const payload = {
    fullName: document.getElementById('fullName').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    submittedAt: new Date().toISOString(),
  };
 
  try {
    if (WAITLIST_ENDPOINT) {
      // Apps Script redirects can trigger false browser errors, so treat as fire-and-forget
      fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      }).catch((err) => {
        console.warn('Waitlist fetch reported an error (often a false alarm with Apps Script):', err);
      });
    } else {
      // Development logging
      console.log('Waitlist signup (no endpoint configured):', payload);
    }
 
    form.reset();
    form.classList.add('hidden');
    successMessage.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
});


// INIT


formatLaunchDate();
updateCountdown();
setInterval(updateCountdown, 1000);

// Header scrolled class toggle
const header = document.querySelector(".site-header");
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}
