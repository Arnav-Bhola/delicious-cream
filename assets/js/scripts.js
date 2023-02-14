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


// scroll animation
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

// intersection observer
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