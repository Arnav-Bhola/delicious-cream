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