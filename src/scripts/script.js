mobileMenuIcon.addEventListener("click", () => {
  const check = menu.classList.contains("hidden");

  menu.classList.toggle("hidden", !check);
  menu.classList.toggle("block", check);
  overlay.classList.toggle("hidden", !check);
  overlay.classList.toggle("fixed", check);

  mobileMenuIcon.src = !check
    ? "../images/icon-hamburger.svg"
    : "../images/icon-close-menu.svg";
});


let bookmark = false;

bookmarkIcon.addEventListener("click", () => {
  bookmarkIcon.src = bookmark
    ? "../images/icon-bookmark.svg"
    : "../images/icon-bookmarked.svg";
  bookmarkText.innerHTML = bookmark ? "Bookmark" : "Bookmarked";
  bookmarkIcon.style.transform = bookmark
    ? "translateX(0)"
    : "translateX(-1rem)";
  bookmarkText.style.color = bookmark ? "" : "#147b74";
  bookmark = !bookmark;
});

backProject.addEventListener("click", openSelectionPage);

closeSelectionIcon.addEventListener("click", openSelectionPage);

const rewardButtons = document.querySelectorAll(".available_button");

rewardButtons.forEach((button) => {
  button.addEventListener("click", openSelectionPage);
});

function openSelectionPage() {
  selectionPage.classList.toggle("hidden");
  selectionPage.classList.toggle("grid");
  overlay.classList.toggle("hidden");
  overlay.classList.toggle("fixed");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
