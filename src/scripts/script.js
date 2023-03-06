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

closeSelectionIcon.addEventListener("click", () =>
  openSelectionPage(undefined)
);

const backingButtons = document.querySelectorAll(".backing_button");
const radios = document.getElementsByName("pledge");

function addEvents() {
  backingButtons.forEach((button, index) => {
    if (button.classList.contains("available_button") && index !== 0) {
      button.innerHTML = "Select Reward";
    } else if (button.classList.contains("unavailable_button")) {
      button.innerHTML = "Out of Stock";
    }
    button.addEventListener("click", () => {
      if (button.classList.contains("available_button")) {
        openSelectionPage(index);
      }
    });
  });
}

addEvents();

function openSelectionPage(index) {
  selectionPage.classList.toggle("hidden");
  selectionPage.classList.toggle("grid");
  overlay.classList.toggle("hidden");
  overlay.classList.toggle("fixed");
  window.scrollTo({ top: 0, behavior: "smooth" });
  defaultPledgeValues();

  if (index !== undefined) {
    radios[index].checked = true;
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
    displayPledge(index);
  });
});

function hidePledges() {
  const enterPledges = document.querySelectorAll(".enter_pledge");
  enterPledges.forEach((enterPledge) => {
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

continueButtons.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    addEvents();
    progressBar.classList.remove("w-[89.9%]");
    event.preventDefault();
    hidePledges();
    selectionPage.classList.remove("grid");
    selectionPage.classList.add("hidden");
    let num = parseInt(backingValue.innerHTML.replace(",", ""));
    if (index !== 0 && pledgeValueUser[index - 1].classList.contains("block")) {
      num += parseInt(pledgeValueUser[index - 1].value);
    } else if (index === 1) {
      num += 25;
    } else if (index === 2) {
      num += 75;
    }
    numStr = num.toString().split("");
    numStr.splice(numStr.length - 3, 0, ",");
    backingValue.innerHTML = numStr.join("");
    let backers = parseInt(totalBackers.innerHTML.replace(",", ""));
    backers++;
    backersStr = backers.toString().split("");
    backersStr.splice(backersStr.length - 3, 0, ",");
    totalBackers.innerHTML = backersStr.join("");

    let percentage = ((num / 100000) * 100).toFixed(0);
    progressBar.style.width = "0%";
    if (percentage <= 100) {
      progressBar.style.width = `${percentage}%`;
    } else {
      progressBar.style.width = "100%";
    }

    const pledgesLeft = document.querySelectorAll(".pledge_left");
    const pledgesLeftSelectionPage = document.querySelectorAll(
      ".pledge_left_selection_page"
    );
    const selectRewards = document.querySelectorAll(".select_reward");

    if (index !== 0) {
      let left = parseInt(pledgesLeft[index - 1].innerHTML);
      left--;
      pledgesLeft[index - 1].innerHTML = left;
      pledgesLeftSelectionPage[index - 1].innerHTML = left;
      console.log(left);
      if (left == 0) {
        selectRewards[index - 1].classList.add("disabled");
        backingButtons[index].classList.remove("available_button");
        backingButtons[index].classList.add("unavailable_button");
        const pledgeBlocs = document.querySelectorAll(".pledge_bloc");
        pledgeBlocs[index - 1].classList.add("disabled");
        radios[index].setAttribute("disabled", "disabled");
      }
    }
    addEvents();
    thankYouPage.classList.remove("hidden");
    thankYouPage.classList.add("grid");
  });
});

gotItButton.addEventListener("click", () => {
  thankYouPage.classList.remove("grid");
  thankYouPage.classList.add("hidden");
  overlay.classList.toggle("hidden");
  overlay.classList.toggle("fixed");
});
