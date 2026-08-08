(function () {
  "use strict";

  // ---- Footer year ----
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Mobile nav ----
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navClose = document.querySelector("[data-nav-close]");
  var nav = document.querySelector("[data-nav]");
  var backdrop = document.querySelector("[data-nav-backdrop]");

  function openNav() {
    nav.setAttribute("data-open", "true");
    backdrop.setAttribute("data-open", "true");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    navClose.focus();
  }

  function closeNav() {
    nav.setAttribute("data-open", "false");
    backdrop.setAttribute("data-open", "false");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    navToggle.focus();
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", openNav);
    navClose.addEventListener("click", closeNav);
    backdrop.addEventListener("click", closeNav);
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 899px)").matches) closeNav();
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.getAttribute("data-open") === "true") closeNav();
    });
  }

  // ---- FAQ accordion ----
  document.querySelectorAll("[data-faq-trigger]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var answer = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(!expanded));
      if (answer) answer.setAttribute("data-open", String(!expanded));
    });
  });

  // ---- Gallery lightbox ----
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll("[data-gallery-trigger]"));
  var lightbox = document.querySelector("[data-lightbox]");
  var lightboxImg = document.querySelector("[data-lightbox-image]");
  var lightboxCaption = document.querySelector("[data-lightbox-caption]");
  var lightboxClose = document.querySelector("[data-lightbox-close]");
  var lightboxPrev = document.querySelector("[data-lightbox-prev]");
  var lightboxNext = document.querySelector("[data-lightbox-next]");
  var currentIndex = 0;
  var lastFocused = null;

  function showImage(index) {
    if (!galleryItems.length) return;
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    var item = galleryItems[currentIndex];
    var img = item.querySelector("img");
    lightboxImg.src = img.getAttribute("src");
    lightboxImg.alt = img.getAttribute("alt");
    lightboxCaption.textContent = item.getAttribute("data-caption") || "";
  }

  function openLightbox(index) {
    lastFocused = document.activeElement;
    showImage(index);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () {
      openLightbox(index);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrev.addEventListener("click", function () { showImage(currentIndex - 1); });
    lightboxNext.addEventListener("click", function () { showImage(currentIndex + 1); });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showImage(currentIndex - 1);
      if (e.key === "ArrowRight") showImage(currentIndex + 1);
    });
  }
})();
