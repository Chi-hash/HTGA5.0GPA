
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

  const miniDaysEl = document.getElementById("mini-days");
  const miniHoursEl = document.getElementById("mini-hours");
  const miniMinutesEl = document.getElementById("mini-minutes");
  const miniSecondsEl = document.getElementById("mini-seconds");

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    if (miniDaysEl) {
      miniDaysEl.textContent = "00";
      miniHoursEl.textContent = "00";
      miniMinutesEl.textContent = "00";
      miniSecondsEl.textContent = "00";
    }
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

  if (miniDaysEl) {
    miniDaysEl.textContent = pad(days);
    miniHoursEl.textContent = pad(hours);
    miniMinutesEl.textContent = pad(minutes);
    miniSecondsEl.textContent = pad(seconds);
  }
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
      // Fire-and-forget request to bypass redirect issues
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

// Force scroll to top on refresh/load
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
window.addEventListener('load', () => {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 50);
});

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

// URL confirmation check
function checkConfirmation() {
  const urlParams = new URLSearchParams(window.location.search);
  const confirmStatus = urlParams.get('confirm');
  const name = urlParams.get('name');

  if (confirmStatus === 'success' || confirmStatus === 'already') {
    const confirmNameEl = document.getElementById('confirmName');
    if (confirmNameEl && name) {
      confirmNameEl.textContent = decodeURIComponent(name);
    }
    
    const confirmMessageEl = document.getElementById('confirmMessage');
    if (confirmMessageEl && confirmStatus === 'already') {
      confirmMessageEl.textContent = "You're already confirmed on the waitlist! Come back in:";
    }
    
    const confirmModal = document.getElementById('confirmModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const closeBtn = document.getElementById('closeConfirmBtn');
    
    confirmModal.classList.remove('hidden');
    confirmModal.classList.add('open');
    modalBackdrop.classList.add('open');
    document.body.style.overflow = "hidden";

    const closeConfirmModal = () => {
      confirmModal.classList.remove('open');
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = "";
      
      // Clean URL query
      const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
    };

    closeBtn.addEventListener('click', closeConfirmModal);
    modalBackdrop.addEventListener('click', closeConfirmModal);
  }
}

checkConfirmation();
