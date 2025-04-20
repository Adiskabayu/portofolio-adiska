window.addEventListener("scroll", function() {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const menuToggle = document.getElementById("menu-toggle");
const closeMenu = document.getElementById("close-menu");
const navbarMenu = document.getElementById("navbar-menu");

menuToggle.addEventListener("click", function() {
  navbarMenu.classList.add("active");
});

closeMenu.addEventListener("click", function() {
  navbarMenu.classList.remove("active");
});

const menuLinks = document.querySelectorAll(".navbar-menu li a");
menuLinks.forEach(link => {
  link.addEventListener("click", function() {
    navbarMenu.classList.remove("active");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});

function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-fill");
  const skillection = document.getElementById("skill");
  
  if (skillection) {
    const skillPosition = skillection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (skillPosition < screenPosition) {
      progressBars.forEach((bar) => {
        const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
        bar.style.width = width;
      });

      window.removeEventListener("scroll", animateProgressBars);
    }
  }
}

function setActiveLink() {
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.navbar-menu li a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionId = section.getAttribute('id');
    if (!sectionId && section.tagName === 'HEADER') {

      if (window.pageYOffset < document.querySelector('section').offsetTop - 100) {
        current = '';
      }
    } else if (sectionId) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const navHeight = document.querySelector('.navbar').offsetHeight;
      
      if (window.pageYOffset >= (sectionTop - navHeight - 100)) {
        current = sectionId;
      }
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if ((href === '#' && current === '') || href === `#${current}`) {
      link.classList.add('active');
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  
  window.addEventListener('scroll', setActiveLink);
  window.addEventListener('scroll', animateProgressBars);
  
  setActiveLink();
});