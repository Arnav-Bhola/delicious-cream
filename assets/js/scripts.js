const toggleBtn = document.querySelector("#toggle-nav");
const navbar = document.querySelector(".navbar-links")

toggleBtn.addEventListener("click", function () {
    navbar.classList.toggle("navbar-show")
})
