pledge_no_reward.checked = true;

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
  event.preventDefault();
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

closeSelectionIcon.addEventListener("click", () =>
  openSelectionPage(undefined)
);

const rewardButtons = document.querySelectorAll(".available_button");
const radios = document.getElementsByName("pledge");

rewardButtons.forEach((button, index) => {
  button.addEventListener("click", () => openSelectionPage(index));
});

function openSelectionPage(index) {
  selectionPage.classList.toggle("hidden");
  selectionPage.classList.toggle("grid");
  overlay.classList.toggle("hidden");
  overlay.classList.toggle("fixed");
  window.scrollTo({ top: 0, behavior: "smooth" });
  defaultPledgeValues();

  if (index !== undefined) {
    radios[index + 1].checked = true;
    displayPledge(index);
  } else {
    radios[0].checked = true;
    hidePledges();
  }
}

radios.forEach((radio, index) => {
  radio.addEventListener("change", () => {
    console.log(index);
    const enterPledges = document.querySelectorAll(".enter_pledge");
    defaultPledgeValues();
    if (index !== 0) {
      displayPledge(index - 1);
    } else {
      hidePledges();
    }
  });
});

function hidePledges() {
  const enterPledges = document.querySelectorAll(".enter_pledge");
  enterPledges.forEach((enterPledge, index) => {
    enterPledge.classList.add("hidden");
    enterPledge.classList.remove("flex");
  });
}

function displayPledge(i) {
  const enterPledges = document.querySelectorAll(".enter_pledge");
  enterPledges[i].classList.toggle("hidden");
  enterPledges[i].classList.toggle("flex");

  for (let j = 0; j < enterPledges.length; j++) {
    if (j !== i) {
      enterPledges[j].classList.add("hidden");
      enterPledges[j].classList.remove("flex");
    }
  }
}

const pledgeValueButtons = document.querySelectorAll(".pledge_value_button");
const pledgeValueFixed = document.querySelectorAll(".pledge_value_fixed");
const pledgeValueUser = document.querySelectorAll(".pledge_value_user");
const backingPage = document.querySelector(".backing_page");

pledgeValueButtons.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    pledgeValueFixed[index].classList.add("hidden");
    pledgeValueUser[index].classList.remove("hidden");
    pledgeValueUser[index].classList.add("block");
  });
});

function defaultPledgeValues() {
  pledgeValueFixed.forEach((element) => {
    element.classList.remove("hidden");
  });

  pledgeValueUser.forEach((element) => {
    element.value = "";
    element.classList.add("hidden");
    element.classList.remove("block");
  });
}

const continueButtons = document.querySelectorAll(".continue_button");

continueButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    hidePledges()
    selectionPage.classList.remove("grid");
    selectionPage.classList.add("hidden");
    overlay.classList.add("hidden");
    overlay.classList.remove("fixed");
    let num = parseInt(backingValue.innerHTML.replace(",",""))
    num += 25
    numStr = num.toString().split("")
    numStr.splice(numStr.length - 3,0,",")
    backingValue.innerHTML = numStr.join("")
  });
});
