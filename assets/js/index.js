const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');


let activeSlideNumber = 1; // Start at the first original slide (index 1)


function updateSlide() {
    const translateX = -100 * activeSlideNumber;
    slidesContainer.style.transform = `translateX(${translateX}%)`;
    console.log(activeSlideNumber);
}

function reset_to(slideNumber) {
    activeSlideNumber = slideNumber;
    slidesContainer.style.transition = "none";
    updateSlide();
    setTimeout(() => {
        slidesContainer.style.transition = "transform 0.5s ease";
    }
    , 40);
    
}

function slider_next() {
    nextButton.disabled = true;
    activeSlideNumber++;
    updateSlide();
    setTimeout(() => {
        if (activeSlideNumber >= totalSlides - 1) {
            reset_to(1);
        }
        
    }, 500);
    setTimeout(() => {
        nextButton.disabled = false;
    }, 550);
}

function slider_prev() {
    prevButton.disabled = true;
    activeSlideNumber--;
    updateSlide();
    setTimeout(() => {
        if (activeSlideNumber <= 0) {
            reset_to(totalSlides - 2);
        }
    }, 500);
    setTimeout(() => {
        prevButton.disabled = false;
    }, 550);
}


reset_to(1); 