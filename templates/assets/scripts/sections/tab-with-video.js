"use strict";
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelectorAll(".tab-with-video").length > 0) {
    const tabWithVideo = document.querySelectorAll(".tab-with-video");
    const desktopButtons = document.querySelectorAll(
      ".tab-with-video .tab-body .tab h6"
    );
    const mobileButtons = document.querySelectorAll(
      ".tab-with-video .tab-body .mobile-view h6"
    );
    const img = document.querySelectorAll(
      ".tab-with-video .tab-content .inner-content"
    );
    const dropdown = document.querySelector(".tab-with-video .tab-body .open");
    const contentWrap = document.querySelector(
      ".tab-with-video .tab-body .mobile-view"
    );
    const spanHeading = document.querySelector(".tab-with-video .open span");



    if (tabWithVideo.length > 0) {
      img[0].classList.add("active");
      desktopButtons[0].classList.add("active");
      mobileButtons[0].classList.add("active");
      desktopButtons.forEach((btn, index) => {
        btn.addEventListener("click", function () {
          spanHeading.textContent = desktopButtons[index].textContent;
          desktopButtons.forEach((btn) => btn.classList.remove("active"));
          mobileButtons.forEach((btn) => btn.classList.remove("active"));
          img.forEach((image) => image.classList.remove("active"));
          btn.classList.add("active");
          img[index].classList.add("active");
          mobileButtons[index].classList.add("active");
        });
      });
      mobileButtons.forEach((btn, index) => {
        btn.addEventListener("click", function () {
          spanHeading.textContent = mobileButtons[index].textContent;
          mobileButtons.forEach((btn) => btn.classList.remove("active"));
          desktopButtons.forEach((btn) => btn.classList.remove("active"));
          img.forEach((image) => image.classList.remove("active"));
          btn.classList.add("active");
          img[index].classList.add("active");
          desktopButtons[index].classList.add("active");
          contentWrap.classList.toggle("active");
        });
      });
    }
    dropdown.addEventListener("click", function () {
      contentWrap.classList.toggle("active");
      dropdown.classList.toggle("active");
    });
  }
});