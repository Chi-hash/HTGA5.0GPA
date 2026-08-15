// Initialization

// Reset scroll
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);
window.addEventListener("load", () => {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, 50);
});

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

// Scroll Reveal
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((el) => observer.observe(el));
}

// Animated Number Counter
function initStatCounters() {
  const counterElements = document.querySelectorAll(".stat-number");
  if (!counterElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetVal = parseFloat(el.getAttribute("data-target") || "0");
          const decimals = parseInt(
            el.getAttribute("data-decimals") || "0",
            10,
          );
          const duration = 1400;
          const startTime = performance.now();

          function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * targetVal;
            el.textContent = currentVal.toFixed(decimals);

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = targetVal.toFixed(decimals);
            }
          }

          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.3 },
  );

  counterElements.forEach((el) => observer.observe(el));
}

// 3D Book Touch & Mouse Tilt Effect
function initBookTilt() {
  const heroBook = document.querySelector(".hero-book");
  const bookCover = document.querySelector(".book-cover");
  if (!heroBook || !bookCover) return;

  const handleTilt = (clientX, clientY) => {
    const rect = heroBook.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const tiltX = -((clientY - centerY) / (rect.height / 2)) * 14;
    const tiltY = ((clientX - centerX) / (rect.width / 2)) * 14;

    bookCover.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
  };

  heroBook.addEventListener("mousemove", (e) => {
    handleTilt(e.clientX, e.clientY);
  });

  heroBook.addEventListener("mouseleave", () => {
    bookCover.style.transform = "";
  });

  heroBook.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length > 0) {
        handleTilt(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true },
  );

  heroBook.addEventListener("touchend", () => {
    bookCover.style.transform = "";
  });
}

initScrollReveal();
initStatCounters();
initBookTilt();
