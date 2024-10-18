const usCards = document.querySelectorAll('.us-cards .card');
const solutionsCards = document.querySelectorAll('.solutions-cards .card');
const counters = document.querySelectorAll('.counter');

function isInViewPort(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom > 0
    );
}
    
function toggleAnimationOnViewPort(el) {
    if(isInViewPort(el)) {
        el.classList.add('show');
    }
}

function makeCounterAnimation(el, from, to, duration) {
    const value = parseInt(el.innerHTML);
    if (value > 0 || value == to) return;

    let start = null;
    function step(timestamp) {
        if (!start) start = timestamp; 
        const progress = timestamp - start;
        if (Math.floor(progress / duration * (to - from) + from) > 1000){
            el.innerHTML = 1000;
        }
        else{
            el.innerHTML = Math.floor(progress / duration * (to - from) + from);
        }
        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

function makeCounterAnimationOnViewPort(el) {
    if(isInViewPort(el) && el.innerHTML == 0 && !el.classList.contains('show')) {
        el.classList.add('show');
        makeCounterAnimation(el, 0, el.dataset.counter, 2000);
    }
}

window.addEventListener('scroll', function() {
    usCards.forEach(card => {
        toggleAnimationOnViewPort(card);
    })

    solutionsCards.forEach(card => {
        toggleAnimationOnViewPort(card);
    })

    counters.forEach(counter => {
        makeCounterAnimationOnViewPort(counter);
    })

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop > 0) {
        document.querySelector('.goUpButton').classList.add('show');
    } else {
        document.querySelector('.goUpButton').classList.remove('show');
    }
});