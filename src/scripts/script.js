// adding a function to open the menu when clicking on the hamburger icon on the mobile version

mobileMenuIcon.addEventListener("click", () => {
  const check = menu.classList.contains("hidden");

  menu.classList.toggle("hidden", !check);
  menu.classList.toggle("block", check);
  overlay.classList.toggle("hidden", !check);
  overlay.classList.toggle("fixed", check);

  mobileMenuIcon.src = !check
    ? "../images/icon-hamburger.svg"
    : "../images/icon-close-menu.svg"; //ternary operator displaying the appropriate menu icon when the menu is open or closed
});

let bookmark = false; // aux variable to display the bookmark icon correctly

// this next part change the visual display of the bookmark icon when it is clicked on, toggling between active and inactive

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

closeSelectionIcon.addEventListener(
  "click",
  () => openSelectionPage(undefined) // when clicking on the "x" icon the selection page will close
);

// these following two addEventListener are applying a hover state to the "x" icon on the selection page

closeSelectionIcon.addEventListener("mouseenter", () => {
  closeSelectionIcon.src = "../images/icon-close-modal-dark.svg";
});

closeSelectionIcon.addEventListener("mouseout", () => {
  closeSelectionIcon.src = "../images/icon-close-modal.svg";
});

//creating variables to access the buttons for each backing / reward and the radio inputs

const backingButtons = document.querySelectorAll(".backing_button");
const radios = document.getElementsByName("pledge");

// the function addEvents will add click events to the buttons only if they are available (i.e there are still objects available to be purchased)

function addEvents() {
  backingButtons.forEach((button, index) => {
    if (button.classList.contains("available_button") && index !== 0) {
      //the index !== 0 part means that only the select reward buttons can become unavailable (but no the "back this project" one)
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

addEvents(); //onvoking the function to add click events to the buttons

//the function openSelectionPage displays the selection page with the different backing options

function openSelectionPage(index) {
  selectionPage.classList.toggle("hidden");
  selectionPage.classList.toggle("grid");
  overlay.classList.toggle("hidden");
  overlay.classList.toggle("fixed");
  window.scrollTo({ top: 0, behavior: "smooth" });
  defaultPledgeValues(); //everytime the selection page is opened, the pledge values will show the default prices; the user has to click on them to open a box to input another value

  if (index !== undefined) {
    radios[index].checked = true;
    displayPledge(index);
  } else {
    radios[0].checked = true;
    hidePledges();
  }
}

//adding a change event for the radio inputs. whenever the user clicks on one of them, it will open the corresponding price div and close the others

radios.forEach((radio, index) => {
  radio.addEventListener("change", () => {
    const enterPledges = document.querySelectorAll(".enter_pledge");
    defaultPledgeValues();
    displayPledge(index);
  });
});

//the function hidePledges close all of the price divs

function hidePledges() {
  const enterPledges = document.querySelectorAll(".enter_pledge");
  enterPledges.forEach((enterPledge) => {
    enterPledge.classList.add("hidden");
    enterPledge.classList.remove("flex");
  });
}

const rewardBoxes = document.querySelectorAll(".reward_box"); //variable to target the border of the div when the user selects the corresponding radio input

//the function displayPledge opens the div with the pledge price and continue button corresponding to the radio input the user selected and closes the other ones

function displayPledge(i) {
  const enterPledges = document.querySelectorAll(".enter_pledge");
  enterPledges[i].classList.toggle("hidden");
  enterPledges[i].classList.toggle("flex");
  rewardBoxes[i].classList.add("border-[#3cb4ac]");

  for (let j = 0; j < enterPledges.length; j++) {
    if (j !== i) {
      enterPledges[j].classList.add("hidden");
      enterPledges[j].classList.remove("flex");
      rewardBoxes[j].classList.remove("border-[#3cb4ac]");
    }
  }
}

//this next part of the code displays the box for the user to input a price other than the default one

const pledgeValueButtons = document.querySelectorAll(".pledge_value_button");
const pledgeValueFixed = document.querySelectorAll(".pledge_value_fixed");
const pledgeValueUser = document.querySelectorAll(".pledge_value_user");
const backingPage = document.querySelector(".backing_page");

pledgeValueButtons.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    pledgeValueButtons[index].classList.add("hidden");
    pledgeValueUser[index].classList.remove("hidden");
    pledgeValueUser[index].classList.add("block");
  });
});

function defaultPledgeValues() {
  //this function displays the default price and hides the user input price whenever it's invoked
  pledgeValueButtons.forEach((element) => {
    element.classList.remove("hidden");
  });

  pledgeValueUser.forEach((element) => {
    element.value = "";
    element.classList.add("hidden");
    element.classList.remove("block");
  });
}

//the next part of the code performs the appropriate changes when one of the continue buttons is pressed

const continueButtons = document.querySelectorAll(".continue_button");

continueButtons.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    addEvents(); // this function is invoked to make sure that only the available buttons have functions assigned to their respective click events
    progressBar.classList.remove("w-[89.9%]"); //removing the default width of the progress bar
    event.preventDefault();
    hidePledges();
    selectionPage.classList.remove("grid");
    selectionPage.classList.add("hidden"); //closing the selection page

    //this next block takes the value of the plegde and adds it to the total value backed and adds 1 to total backers number
    let num = parseInt(backingValue.innerHTML.replace(",", ""));
    if (index !== 0 && pledgeValueUser[index - 1].classList.contains("block")) {
      num += parseInt(pledgeValueUser[index - 1].value); //user input
    } else if (index === 1) {
      num += 25; //default value
    } else if (index === 2) {
      num += 75; //default value
    }
    numStr = num.toString().split(""); //removing and then re-adding the coma later to allow for proper calculation and number display
    numStr.splice(numStr.length - 3, 0, ",");
    backingValue.innerHTML = numStr.join("");
    let backers = parseInt(totalBackers.innerHTML.replace(",", ""));
    backers++;
    backersStr = backers.toString().split("");
    backersStr.splice(backersStr.length - 3, 0, ",");
    totalBackers.innerHTML = backersStr.join("");

    let percentage = ((num / 100000) * 100).toFixed(0); //dynamic change of the progress bar, keeping its max length at 100% to avoid breaking the page design
    progressBar.style.width = "0%";
    if (percentage <= 100) {
      progressBar.style.width = `${percentage}%`;
    } else {
      progressBar.style.width = "100%";
    }

    /* the next part of the code will change the number of pledges available each time an user does a pledge, and then checks if there are still pledges available. Once one of them becomes equal to 0, it will do the cosmetic changes and remove the function invoking when the button is clicked */

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
      if (left == 0) {
        selectRewards[index - 1].classList.add("disabled");
        backingButtons[index].classList.remove("available_button");
        backingButtons[index].classList.add("unavailable_button");
        const pledgeBlocs = document.querySelectorAll(".pledge_bloc");
        pledgeBlocs[index - 1].classList.add("disabled");
        radios[index].setAttribute("disabled", "disabled");
      }
    }
    addEvents(); //invoking the function again to make sure only available buttons are able to invoke click functions
    thankYouPage.classList.remove("hidden");
    thankYouPage.classList.add("grid"); //displaying the thank you page
  });
});

//function called when the got it button on the thank you page is clicked

gotItButton.addEventListener("click", () => {
  thankYouPage.classList.remove("grid");
  thankYouPage.classList.add("hidden");
  overlay.classList.toggle("hidden");
  overlay.classList.toggle("fixed");
});
