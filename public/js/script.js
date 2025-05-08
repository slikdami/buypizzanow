// popup script
// const popup = document.querySelector(".popup");
// const popupOpen = document.querySelector(".popup-open");
// const popupClose = document.querySelector(".popup-close");

document.addEventListener("click", function (e) {
  const target = e.target.closest(".popup-open");
  if (!target) return;

  const popup = document.querySelector(".popup");
  if (popup) {
    popup.classList.add("popup--visible");
  }
});

document.addEventListener("click", function (e) {
  const target = e.target.closest(".popup-close");
  if (!target) return;

  const popup = document.querySelector(".popup");
  if (popup) {
    popup.classList.remove("popup--visible");
  }
});

// document.addEventListener("click", function (e) {
//   const target = document.querySelector(".popup-close");
//   if (!target) return;
//   document.querySelector(".popup").classList.remove("popup--visible");
// });
