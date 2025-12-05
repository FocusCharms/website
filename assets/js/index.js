let activeSlideNumber = 1;
let activeSlide = document.getElementById(`slide${activeSlideNumber}`);
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

console.log(totalSlides)

function slider_prev() {
    console.log(activeSlideNumber)
    activeSlide.classList.remove('active');
    activeSlideNumber -= 1;
    if (activeSlideNumber == 0) {
        console.log("jep1")
        activeSlideNumber = 1;
    } else if (activeSlideNumber == totalSlides + 1) {
        console.log("jep2")
        activeSlideNumber = totalSlides
    };
    activeSlide = document.getElementById(`slide${activeSlideNumber}`);
    activeSlide.classList.add('active');
    console.log(activeSlideNumber)
}

function slider_next() {
    console.log(activeSlideNumber)
    activeSlide.classList.remove('active');
    activeSlideNumber += 1;
    if (activeSlideNumber == 0) {
        console.log("jep1")
        activeSlideNumber = 1;
    } else if (activeSlideNumber == totalSlides + 1) {
        console.log("jep2")
        activeSlideNumber = totalSlides
    };
    activeSlide = document.getElementById(`slide${activeSlideNumber}`);
    activeSlide.classList.add('active');
    console.log(activeSlideNumber)
}