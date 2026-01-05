let activeSlideNumber = 0;
let activeSlide = document.getElementById(`slide${activeSlideNumber}`);

const slides = document.querySelectorAll('.slide');
const maxSlideNumber = slides.length;

const slideTickCount = 100;
const slideTickCountSlow = 150;

const sliderSection = 0;

let x = 0;
let y = 0;


console.log(maxSlideNumber);


function loop(start) {
    for (let tick = start; tick >= 0; tick ++) {
        slider_tick(tick);
    };
};


function mouse_event_listener(event) {
    x = event.clientX; // X position relative to the viewport
    y = event.clientY; // Y position relative to the viewport

    if (x < 0) {
        x = 0;
    };

    if (y < 0) {
        y = 0;
    }

    console.log(x, y);
}


function is_on_section(section) {
    return 1;

    // if (x >= section.minX && x <= section.maxX) {
    //     if (y >= section.minY && y <= section.maxY) {
    //         return 1;
    //     }
    // }

    // return 0;
}


document.addEventListener("mousemove", mouse_event_listener);


function slider_tick(tick) {
    if (is_on_section(sliderSection)) {
        if (tick % slideTickCountSlow === 0) {
            slider_show_next();
            console.log(tick);
        };
    } else if (tick % slideTickCount === 0) {
        slider_show_next();
    }
};


function slider_show_next() {
    if (activeSlideNumber == maxSlideNumber) {
        activeSlideNumber = 0;
    } else {
        activeSlideNumber += 1; 
    };

    show_slider(activeSlideNumber);
};


function show_slider_transition() {};

/**
 * Show the slider picture at the given position, after transitioning to it.
 * 
 * @param {number} current - The number of the current slide.
 */
function show_slider(current) {
    // TODO: Get a way to check if we go l/r?
    show_slider_transition();

    // Remove old.
    activeSlide.classList.remove('active');

    // Add new.
    activeSlide = document.getElementById(`slide${current}`);
    activeSlide.classList.add("active");

    console.log(current);
};


/**
 * Increment the `activeSlideNumber`, and show the next slider.
 */
function slider_next() {
    activeSlideNumber += 1;

    if (activeSlideNumber == totalSlides) {
        activeSlideNumber = 0;
    };

    show_slider(activeSlideNumber)
};


/**
 * Decrement the `activeSlideNumber`, and show the previous slider.
 */
function slider_prev() {
    activeSlideNumber -= 1;

    if (activeSlideNumber == -1) {
        activeSlideNumber = totalSlides;
        // len: 7, so totalSlides - 1 = 6 (also cuz we sub'd 1)
    };

    show_slider(activeSlideNumber);
};



/*
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
}*/

loop(0)
