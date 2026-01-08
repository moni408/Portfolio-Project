const navLinks = document.querySelectorAll('.aside .nav li a');
const sections = document.querySelectorAll('.section');
const navToggler = document.querySelector('.nav-toggler');
const nav = document.querySelector('.aside .nav');

// Function to show only one section
function showSection(id) {
    sections.forEach(sec => {
        sec.style.display = (sec.id === id) ? 'block' : 'none';
    });
}

// Function to handle active link
function setActiveLink(clickedLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

// Click event for nav links
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        showSection(targetId);
        setActiveLink(link);

        // On mobile, hide menu after click
        if(window.innerWidth <= 991){
            nav.style.display = 'none';
        }
    });
});

// Show home initially
showSection('home');

// Nav toggler for mobile
navToggler.addEventListener('click', () => {
    if(nav.style.display === 'flex' || nav.style.display === 'block'){
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
    }
});

// Dynamically handle window resize
function handleResize() {
    if(window.innerWidth > 991){
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
    } else {
        nav.style.display = 'none';
    }
}

window.addEventListener('resize', handleResize);

// Initial call
handleResize();
