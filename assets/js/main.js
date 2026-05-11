const themeToggle = document.getElementById('theme-switch');
const switchLabelText = document.querySelector('.switch-label-text');
const navLinks = document.querySelectorAll('nav .nav-links a');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (themeToggle) {
        themeToggle.checked = theme === 'dark';
        themeToggle.setAttribute('aria-checked', theme === 'dark');
    }

    if (switchLabelText) {
        switchLabelText.textContent = theme === 'dark' ? 'Dunkel' : 'Hell';
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(theme);
}

function markActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPage = new URL(link.href).pathname.split('/').pop() || 'index.html';
        link.classList.toggle('active', linkPage === currentPage);
    });
}

function initSlider() {
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    if (!slidesContainer || slides.length === 0) {
        return;
    }

    let activeSlideIndex = 1;
    const totalSlides = slides.length;

    const updateSlide = () => {
        slidesContainer.style.transform = `translateX(-${activeSlideIndex * 100}%)`;
    };

    const resetSlide = (index) => {
        activeSlideIndex = index;
        slidesContainer.style.transition = 'none';
        updateSlide();
        requestAnimationFrame(() => {
            slidesContainer.style.transition = 'transform 0.5s ease';
        });
    };

    const nextSlide = () => {
        if (nextButton) nextButton.disabled = true;
        activeSlideIndex += 1;
        updateSlide();
        setTimeout(() => {
            if (activeSlideIndex >= totalSlides - 1) {
                resetSlide(1);
            }
            if (nextButton) nextButton.disabled = false;
        }, 500);
    };

    const prevSlide = () => {
        if (prevButton) prevButton.disabled = true;
        activeSlideIndex -= 1;
        updateSlide();
        setTimeout(() => {
            if (activeSlideIndex <= 0) {
                resetSlide(totalSlides - 2);
            }
            if (prevButton) prevButton.disabled = false;
        }, 500);
    };

    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }
    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }

    resetSlide(1);
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            setTheme(themeToggle.checked ? 'dark' : 'light');
        });
    }

    markActiveLink();
    initSlider();
});

