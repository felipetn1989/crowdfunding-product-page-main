mobileMenuIcon.addEventListener("click", () => {
    const check = menu.classList.contains("hidden")

    menu.classList.toggle("hidden",!check)
    menu.classList.toggle("block",check)
    overlay.classList.toggle("hidden",!check)
    overlay.classList.toggle("fixed",check)

    mobileMenuIcon.src = !check
      ? "../images/icon-hamburger.svg"
      : "../images/icon-close-menu.svg";
})