// MENU MOBILE TOGGLE
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        if (navMenu.style.display === 'flex') {
            navMenu.style.position = 'absolute';
            navMenu.style.top = '72px';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.background = '#FFFFFF';
            navMenu.style.flexDirection = 'column';
            navMenu.style.padding = '1.5rem';
            navMenu.style.borderBottom = '1px solid #E5E7EB';
        }
    });
}

// ANIMAÇÃO DE NÚMEROS (CONTADORES NO HERO)
const counters = document.querySelectorAll('.stat-num');
let animated = false;

function runCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = target / 30;
        
        const updateCount = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 40);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

window.addEventListener('scroll', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const position = heroStats.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (position < screenPosition && !animated) {
            runCounters();
            animated = true;
        }
    }
});