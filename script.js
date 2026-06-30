const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const header = document.getElementById("header");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxClose = document.getElementById("lightboxClose");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", function () {
    nav.classList.toggle("active");
  });

  document.querySelectorAll(".nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("active");
    });
  });
}

window.addEventListener("scroll", function () {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }
});

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealItems.forEach(function (item) {
  revealObserver.observe(item);
});

document.querySelectorAll(".gallery-card").forEach(function (card) {
  card.addEventListener("click", function () {
    const img = card.querySelector("img");
    const title = card.getAttribute("data-title") || "Invitation Preview";

    if (lightbox && lightboxImage && lightboxTitle && img) {
      lightboxImage.src = img.src;
      lightboxImage.alt = title;
      lightboxTitle.textContent = title;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeLightbox();
  }
});