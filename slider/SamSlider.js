let slides = document.querySelectorAll(".slide");
let navlinks = document.querySelectorAll(".navlink");
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove("active")); // Hide all slides
    slides[n].classList.add("active"); // Show the current slide

    navlinks.forEach(nav => nav.classList.remove("active"));
    navlinks[n].classList.add("active");

    currentSlide = n;
}

function prevSlide() {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    showSlide(currentSlide);
}

function nextSlide() {
    currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    showSlide(currentSlide);
}

function goToSlide(n) {
    showSlide(n);
}

// Initialize first slide
showSlide(currentSlide);
