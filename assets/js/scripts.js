const toggleBtn = $("#toggle-nav");
const navbar = $(".navbar");
const navbarLinks = $(".navbar-links");

toggleBtn.on("click", function () {
    navbar.toggleClass("navbar-show");
    navbarLinks.toggleClass("navbar-links-show");
});


const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if(!isMobile) {
    window.addEventListener("scroll", scrollAnimation);
}


const imgContainer = document.querySelector('.heroImage').style
const initialWidth = imgContainer.width

function scrollAnimation() {
    const content = document.querySelector(".heroImage").getBoundingClientRect()
    const initialHeight = content.height;
    const finalHeight = initialHeight * 0.7;
    const factor = (initialHeight - finalHeight) / 30;
    let result = content.bottom / factor;

    if (result > 100) {
        result = 100
    }
    if (result < 60) {
        result = 60
    }
    imgContainer.width = result + '%'
}
