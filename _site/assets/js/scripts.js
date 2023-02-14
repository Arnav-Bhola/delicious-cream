const toggleBtn = $("#toggle-nav");
const navbar = $(".navbar");
const navbarLinks = $(".navbar-links");

toggleBtn.on("click", function () {
    navbar.toggleClass("navbar-show");
    navbarLinks.toggleClass("navbar-links-show");
});
var mostLovedCarousel = document.querySelector('.most-loved-carousel');
  var flkty = new Flickity( mostLovedCarousel, {
    // options
    cellAlign: 'left',
    contain: true
  });

  window.addEventListener("scroll", scrollAnimation);


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
    console.log(result);
    imgContainer.width = result + '%'
}