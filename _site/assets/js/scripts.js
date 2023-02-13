const toggleBtn = $("#toggle-nav");
const navbar = $(".navbar");
const navbarLinks = $(".navbar-links");

toggleBtn.on("click", function () {
    navbar.toggleClass("navbar-show");
    navbarLinks.toggleClass("navbar-links-show");
});

const mostLovedCarousel = $('.most-loved.carousel')
var mostLoved = new Flickity( carousel, {
    cellAlign: 'left',
    wrapAround: true,
    freeScroll: true,
})