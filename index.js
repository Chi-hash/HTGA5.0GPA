
// Config
const LAUNCH_DATE = new Date("2026-08-15T00:00:00"); // Launch: August 15, 2026
const WAITLIST_ENDPOINT = "https://script.google.com/macros/s/AKfycbxH13j1yDpFszvXR9AhU5wtPAVxGzac5ZODHGQX4LrPrfGorPCgu1l-n424-Ya8iJ2JWg/exec";

// Countdown
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

// Buy buttons
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


// Phone Country Selector
const COUNTRIES = [
  { name: "Nigeria", code: "+234", iso: "ng" },
  { name: "United States", code: "+1", iso: "us" },
  { name: "United Kingdom", code: "+44", iso: "gb" },
  { name: "Canada", code: "+1", iso: "ca" },
  { name: "Ghana", code: "+233", iso: "gh" },
  { name: "Kenya", code: "+254", iso: "ke" },
  { name: "South Africa", code: "+27", iso: "za" },
  { name: "Germany", code: "+49", iso: "de" },
  { name: "France", code: "+33", iso: "fr" },
  { name: "India", code: "+91", iso: "in" },
  { name: "United Arab Emirates", code: "+971", iso: "ae" },
  { name: "Saudi Arabia", code: "+966", iso: "sa" },
  { name: "Ireland", code: "+353", iso: "ie" },
  { name: "Australia", code: "+61", iso: "au" },
  { name: "China", code: "+86", iso: "cn" },
  { name: "Brazil", code: "+55", iso: "br" },
  { name: "Egypt", code: "+20", iso: "eg" },
  { name: "Cameroon", code: "+237", iso: "cm" },
  { name: "Rwanda", code: "+250", iso: "rw" },
  { name: "Uganda", code: "+256", iso: "ug" },
  { name: "Senegal", code: "+221", iso: "sn" },
  { name: "Spain", code: "+34", iso: "es" },
  { name: "Italy", code: "+39", iso: "it" },
  { name: "Netherlands", code: "+31", iso: "nl" },
  { name: "Ukraine", code: "+380", iso: "ua" },
  { name: "Switzerland", code: "+41", iso: "ch" },
  { name: "Sweden", code: "+46", iso: "se" },
  { name: "Norway", code: "+47", iso: "no" },
  { name: "Denmark", code: "+45", iso: "dk" },
  { name: "Finland", code: "+358", iso: "fi" },
  { name: "Belgium", code: "+32", iso: "be" },
  { name: "Austria", code: "+43", iso: "at" },
  { name: "Portugal", code: "+351", iso: "pt" },
  { name: "Greece", code: "+30", iso: "gr" },
  { name: "Turkey", code: "+90", iso: "tr" },
  { name: "Israel", code: "+972", iso: "il" },
  { name: "Japan", code: "+81", iso: "jp" },
  { name: "South Korea", code: "+82", iso: "kr" },
  { name: "Singapore", code: "+65", iso: "sg" },
  { name: "Malaysia", code: "+60", iso: "my" },
  { name: "Indonesia", code: "+62", iso: "id" },
  { name: "Thailand", code: "+66", iso: "th" },
  { name: "Philippines", code: "+63", iso: "ph" },
  { name: "Vietnam", code: "+84", iso: "vn" },
  { name: "New Zealand", code: "+64", iso: "nz" },
  { name: "Mexico", code: "+52", iso: "mx" },
  { name: "Argentina", code: "+54", iso: "ar" },
  { name: "Colombia", code: "+57", iso: "co" },
  { name: "Chile", code: "+56", iso: "cl" },
  { name: "Peru", code: "+51", iso: "pe" },
  { name: "Venezuela", code: "+58", iso: "ve" },
  { name: "Morocco", code: "+212", iso: "ma" },
  { name: "Algeria", code: "+213", iso: "dz" },
  { name: "Tunisia", code: "+216", iso: "tn" },
  { name: "Ethiopia", code: "+251", iso: "et" },
  { name: "Tanzania", code: "+255", iso: "tz" },
  { name: "Ivory Coast", code: "+225", iso: "ci" },
  { name: "Angola", code: "+244", iso: "ao" },
  { name: "Zimbabwe", code: "+263", iso: "zw" },
  { name: "Zambia", code: "+260", iso: "zm" },
  { name: "Malawi", code: "+265", iso: "mw" },
  { name: "Mozambique", code: "+258", iso: "mz" },
  { name: "Madagascar", code: "+261", iso: "mg" },
  { name: "Namibia", code: "+264", iso: "na" },
  { name: "Botswana", code: "+267", iso: "bw" },
  { name: "Gabon", code: "+241", iso: "ga" },
  { name: "Republic of the Congo", code: "+242", iso: "cg" },
  { name: "Democratic Republic of the Congo", code: "+243", iso: "cd" },
  { name: "Mali", code: "+223", iso: "ml" },
  { name: "Niger", code: "+227", iso: "ne" },
  { name: "Chad", code: "+235", iso: "td" },
  { name: "Sudan", code: "+249", iso: "sd" },
  { name: "Libya", code: "+218", iso: "ly" },
  { name: "Sierra Leone", code: "+232", iso: "sl" },
  { name: "Liberia", code: "+231", iso: "lr" },
  { name: "Togo", code: "+228", iso: "tg" },
  { name: "Benin", code: "+229", iso: "bj" },
  { name: "Burkina Faso", code: "+226", iso: "bf" },
  { name: "Mauritania", code: "+222", iso: "mr" },
  { name: "Gambia", code: "+220", iso: "gm" },
  { name: "Guinea", code: "+224", iso: "gn" },
  { name: "Guinea-Bissau", code: "+245", iso: "gw" },
  { name: "Equatorial Guinea", code: "+240", iso: "gq" },
  { name: "Cape Verde", code: "+238", iso: "cv" },
  { name: "Mauritius", code: "+230", iso: "mu" },
  { name: "Seychelles", code: "+248", iso: "sc" },
  { name: "Cyprus", code: "+357", iso: "cy" },
  { name: "Malta", code: "+356", iso: "mt" },
  { name: "Iceland", code: "+354", iso: "is" },
  { name: "Poland", code: "+48", iso: "pl" },
  { name: "Czech Republic", code: "+420", iso: "cz" },
  { name: "Slovakia", code: "+421", iso: "sk" },
  { name: "Hungary", code: "+36", iso: "hu" },
  { name: "Romania", code: "+40", iso: "ro" },
  { name: "Bulgaria", code: "+359", iso: "bg" },
  { name: "Croatia", code: "+385", iso: "hr" },
  { name: "Slovenia", code: "+386", iso: "si" },
  { name: "Serbia", code: "+381", iso: "rs" },
  { name: "Bosnia and Herzegovina", code: "+387", iso: "ba" },
  { name: "Montenegro", code: "+382", iso: "me" },
  { name: "North Macedonia", code: "+389", iso: "mk" },
  { name: "Albania", code: "+355", iso: "al" },
  { name: "Estonia", code: "+372", iso: "ee" },
  { name: "Latvia", code: "+371", iso: "lv" },
  { name: "Lithuania", code: "+370", iso: "lt" },
  { name: "Russia", code: "+7", iso: "ru" },
  { name: "Belarus", code: "+375", iso: "by" },
  { name: "Azerbaijan", code: "+994", iso: "az" },
  { name: "Georgia", code: "+995", iso: "ge" },
  { name: "Armenia", code: "+374", iso: "am" },
  { name: "Qatar", code: "+974", iso: "qa" },
  { name: "Kuwait", code: "+965", iso: "kw" },
  { name: "Bahrain", code: "+973", iso: "bh" },
  { name: "Oman", code: "+968", iso: "om" },
  { name: "Jordan", code: "+962", iso: "jo" },
  { name: "Lebanon", code: "+961", iso: "lb" },
  { name: "Iraq", code: "+964", iso: "iq" },
  { name: "Pakistan", code: "+92", iso: "pk" },
  { name: "Bangladesh", code: "+880", iso: "bd" },
  { name: "Sri Lanka", code: "+94", iso: "lk" },
  { name: "Nepal", code: "+977", iso: "np" },
  { name: "Taiwan", code: "+886", iso: "tw" },
  { name: "Hong Kong", code: "+852", iso: "hk" },
  { name: "Macao", code: "+853", iso: "mo" },
  { name: "Jamaica", code: "+1", iso: "jm" },
  { name: "Bahamas", code: "+1", iso: "bs" },
  { name: "Barbados", code: "+1", iso: "bb" },
  { name: "Trinidad and Tobago", code: "+1", iso: "tt" },
  { name: "Costa Rica", code: "+506", iso: "cr" },
  { name: "Panama", code: "+507", iso: "pa" },
  { name: "Dominican Republic", code: "+1", iso: "do" },
  { name: "Puerto Rico", code: "+1", iso: "pr" }
];

function initCountryDropdown() {
  const selectBtn = document.getElementById('countrySelectBtn');
  const dropdown = document.getElementById('countryDropdown');
  const searchInput = document.getElementById('countrySearchInput');
  const listContainer = document.getElementById('countryList');
  const selectedFlag = document.getElementById('selectedFlag');
  const selectedCode = document.getElementById('selectedCode');

  if (!selectBtn || !dropdown || !listContainer) return;

  const sortedCountries = [...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name));

  function render(filter = '') {
    const query = filter.toLowerCase().trim();
    const filtered = sortedCountries.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.code.includes(query)
    );

    listContainer.innerHTML = '';

    if (filtered.length === 0) {
      listContainer.innerHTML = '<div class="no-countries">No results found</div>';
      return;
    }

    filtered.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'country-item';
      btn.innerHTML = `
        <span class="country-item-left">
          <span class="flag">
            <img src="https://flagcdn.com/20x15/${c.iso}.png" class="flag-img" alt="${c.name}">
          </span>
          <span class="name">${c.name}</span>
        </span>
        <span class="code">${c.code}</span>
      `;
      btn.addEventListener('click', () => {
        selectedFlag.innerHTML = `<img src="https://flagcdn.com/20x15/${c.iso}.png" class="flag-img" alt="${c.name}">`;
        selectedCode.textContent = c.code;
        dropdown.classList.remove('show');
        searchInput.value = '';
        render();
      });
      listContainer.appendChild(btn);
    });
  }

  selectBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isShowing = dropdown.classList.toggle('show');
    if (isShowing) {
      searchInput.value = '';
      render();
      searchInput.focus();
    }
  });

  searchInput.addEventListener('input', (e) => {
    render(e.target.value);
  });

  searchInput.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && e.target !== selectBtn) {
      dropdown.classList.remove('show');
    }
  });

  render();
}

// WAITLIST FORM

const form = document.getElementById('waitlistForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalLabel = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting…';

  const selectedCode = document.getElementById('selectedCode').textContent.trim();
  let phoneVal = document.getElementById('phone').value.trim();
  const fullPhone = phoneVal.startsWith('+') ? phoneVal : `${selectedCode} ${phoneVal}`;

  const payload = {
    fullName: document.getElementById('fullName').value.trim(),
    phone: fullPhone,
    email: document.getElementById('email').value.trim(),
    submittedAt: new Date().toISOString(),
  };

  try {
    if (WAITLIST_ENDPOINT) {
      // Send form payload
      fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      }).catch((err) => {
        console.warn('Waitlist fetch notice:', err);
      });
    }

    form.reset();
    form.classList.add('hidden');
    successMessage.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
});


// Initialization

// Reset scroll
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
window.addEventListener('load', () => {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 50);
});

initCountryDropdown();
formatLaunchDate();
updateCountdown();
setInterval(updateCountdown, 1000);

// Sticky header
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

// Confirmation handler
function checkConfirmation() {
  const urlParams = new URLSearchParams(window.location.search);
  const confirmStatus = urlParams.get('confirm');
  const name = urlParams.get('name');
  const confirmToken = urlParams.get('confirm_token');

  const confirmModal = document.getElementById('confirmModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('closeConfirmBtn');
  const confirmNameEl = document.getElementById('confirmName');
  const confirmMessageEl = document.getElementById('confirmMessage');

  const openModal = () => {
    confirmModal.classList.remove('hidden');
    confirmModal.classList.add('open');
    modalBackdrop.classList.add('open');
    document.body.style.overflow = "hidden";
  };

  const closeConfirmModal = () => {
    confirmModal.classList.remove('open');
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = "";
    
    // Reset URL
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
  };

  if (closeBtn) closeBtn.addEventListener('click', closeConfirmModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeConfirmModal);

  // Direct redirect fallback
  if (confirmStatus === 'success' || confirmStatus === 'already') {
    if (confirmNameEl && name) {
      confirmNameEl.textContent = decodeURIComponent(name);
    }
    if (confirmMessageEl) {
      if (confirmStatus === 'already') {
        confirmMessageEl.textContent = "You're already confirmed on the waitlist! Come back in:";
      } else {
        confirmMessageEl.textContent = "You have successfully been added to the waitlist. Come back in:";
      }
    }
    openModal();
  } 
  // Token verification
  else if (confirmToken) {
    if (confirmNameEl) confirmNameEl.textContent = "Waitlist";
    if (confirmMessageEl) confirmMessageEl.textContent = "Verifying your waitlist spot...";
    openModal();

    fetch(`${WAITLIST_ENDPOINT}?confirm=${encodeURIComponent(confirmToken)}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' || data.status === 'already') {
          if (confirmNameEl && data.name) {
            confirmNameEl.textContent = data.name;
          }
          if (confirmMessageEl) {
            if (data.status === 'already') {
              confirmMessageEl.textContent = "You're already confirmed on the waitlist! Come back in:";
            } else {
              confirmMessageEl.textContent = "You have successfully been added to the waitlist. Come back in:";
            }
          }
        } else {
          if (confirmNameEl) confirmNameEl.textContent = "Oops!";
          if (confirmMessageEl) confirmMessageEl.textContent = "This confirmation link is invalid or has expired.";
        }
      })
      .catch(err => {
        console.error("Verification fetch error:", err);
        if (confirmNameEl) confirmNameEl.textContent = "Connection Error";
        if (confirmMessageEl) confirmMessageEl.textContent = "Could not reach verification server. Please try again.";
      });
  }
}

checkConfirmation();


