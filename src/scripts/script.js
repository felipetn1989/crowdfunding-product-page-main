pledge_no_reward.checked = true

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

bookmarkIcon.addEventListener("click", (event) => {
  event.preventDefault()
  bookmarkIcon.src = bookmark
    ? "../images/icon-bookmark.svg"
    : "../images/icon-bookmarked.svg";
  bookmarkText.innerHTML = bookmark ? "Bookmark" : "Bookmarked";
  bookmarkText.style.transform = bookmark
    ? "translateX(0)"
    : "translateX(1rem)";
  bookmarkText.style.color = bookmark ? "" : "#147b74";
  bookmark = !bookmark;
});

backProject.addEventListener("click", () => openSelectionPage(undefined));

closeSelectionIcon.addEventListener("click", () => openSelectionPage(undefined));

const rewardButtons = document.querySelectorAll(".available_button");
const radios = document.getElementsByName("pledge")

rewardButtons.forEach((button,index) => {
  button.addEventListener("click",() => openSelectionPage(index));
});

function openSelectionPage(index) {
  console.log(index)
  if (index !== undefined) {
    radios[index+1].checked = true
  } else {
    radios[0].checked = true
  }
  selectionPage.classList.toggle("hidden");
  selectionPage.classList.toggle("grid");
  overlay.classList.toggle("hidden");
  overlay.classList.toggle("fixed");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
