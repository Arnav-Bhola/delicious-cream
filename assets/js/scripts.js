// ***** NAVBAR *****
const toggleBtn = $("#toggle-nav");
const navbar = $(".navbar");
const navbarLinks = $(".navbar-links");

toggleBtn.on("click", function () {
    navbar.toggleClass("navbar-show");
    navbarLinks.toggleClass("navbar-links-show");
});

// ***** CAROUSEL *****
var mostLovedCarousel = document.querySelector('.most-loved-carousel');
  var flkty = new Flickity( mostLovedCarousel, {
    // options
    draggable: '>1',
    freeScroll: true,
    contain: true,
    wrapAround: true,
    cellAlign: 'left',
    autoPlay: true,
    autoPlay: 5000,
    pauseAutoPlayOnHover: true,
    fullscreen: true,
    dragThreshold: 10,
    freeScroll: true,
    freeScrollFriction: 0.03,
    accessibility: true,
    prevNextButtons: true,
    pageDots: true,
    
    // arrowShape: {
    //   x0: 10,
    //   x1: 60,
    //   y1: 45,
    //   x2: 80,
    //   y2: 45,
    //   x3: 30,
    // }
  });

// ***** SCROLL ANIMATION *****
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
    console.log(result);
    imgContainer.width = result + '%'
}


// ***** INTERSECTION OBSERVER *****
const intersectionContainer = document.querySelectorAll('#delicious .flexContainer');

const options = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px'
};

const observer = new IntersectionObserver(items => {
  items.forEach(item => {
    if (item.isIntersecting) {
      item.target.classList.add('show');
      observer.unobserve(item.target);
    }
  });
}, options);

intersectionContainer.forEach(item => {
  observer.observe(item);
});


// ***** PARTICLES / SPRINKLES *****
// var particles_settings = "assets/js/particles.json"
// var particles_duplicity = ['particles1', 'particles2', 'particles4', 'particles5']
    
// particles_duplicity.forEach(function(element) {
//   console.log(element);
//   particlesJS.load(element, particles_settings, function () {
//     console.log("callback - particles.js config loaded");
//   })
// })
