# Frontend Mentor - Crowdfunding product page solution

This is a solution to the [Crowdfunding product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/crowdfunding-product-page-7uvcZe7ZR). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout depending on their device's screen size
- See hover states for interactive elements
- Make a selection of which pledge to make
- See an updated progress bar and total money raised based on their pledge total after confirming a pledge
- See the number of total backers increment by one after confirming a pledge
- Toggle whether or not the product is bookmarked

### Screenshot

![](./images/Screenshot%202023-03-07%20at%2008-43-18%20Frontend%20Mentor%20Crowdfunding%20product%20page.png)


### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- Tailwind CSS
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

This project has a lot of things happening when choosing the rewards, so it was a good practice of JavaScript. I added lines of code to change the total backed value, number of backers, size of the progress bar, pledges left. The user can choose a default pledge value or input a value of his / her choice. Whenever the number of pledges left reaches zero, the corresponding divs become unavailable for the user to choose. One problem I had earlier on my code was when I was trying to remove the click event listener when a pledge became unavailable. At first, I was trying to invoke an anonymous function that in turn would call the function to display the correct page. Later, I couldn't remove the event listener because a new anonymous function was being created everytime I clicked on the button and because of that I could't target it for removal. I solved this issue by associating the event listener function with the .available_button and .unavailable_button classes instead of the button index. I created a function that would check which buttons were available and asign click events to them only. This function is called everytime one of the continue buttons is pressed to make sure the unavailable buttons are not clickable anymore.

## Author

- Website - [Felipe Thomé](https://www.github.com/felipetn1989)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)

