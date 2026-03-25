import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Zoom Animation Mask
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".intro",
        start: "top top",
        end: "+=250%", // Make the animation space larger for a slower zoom
        scrub: 1,
        pin: true,
    }
});

tl.to(".text-mask", {
    scale: 250, // Increased scale massively to ensure the smaller letters clear the screen boundaries completely
    duration: 3,
    ease: "power2.in"
})
.to(".text-mask", {
    opacity: 0, // Fade out the SVG completely at the end just in case stroke remains visible
    duration: 0.5
}, "-=0.5");

// Masonry Gallery Animation
const galleryItems = document.querySelectorAll(".gallery-item");

if (galleryItems.length > 0) {
    galleryItems.forEach((item) => {
        gsap.fromTo(
            item,
            { 
                opacity: 0, 
                y: 50, 
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
}

// Lightbox and Accessibility Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxAuthor = document.getElementById('lightbox-author');
const lightboxDesc = document.getElementById('lightbox-desc');
const lightboxClose = document.getElementById('lightbox-close');

let lastFocusedElement = null;

function openLightbox(item) {
    // Save the element that triggered the modal for focus restoration
    lastFocusedElement = item;
    
    // Extract data
    const img = item.querySelector('img');
    const details = item.querySelector('.item-details');
    const title = details.querySelector('span[id^="title-"]').innerText;
    const author = details.querySelector('span[id^="author-"]').innerText;
    const desc = details.querySelector('p[id^="desc-"]').innerText;

    // Populate lightbox
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.innerText = title;
    lightboxAuthor.innerText = author;
    lightboxDesc.innerText = desc;

    // Show lightbox
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    
    // Manage focus
    lightboxClose.setAttribute('tabindex', '0');
    lightboxClose.focus();
    
    // Optional: lock body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxClose.setAttribute('tabindex', '-1');
    
    // Restore focus
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Attach events to gallery items
galleryItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(item);
        }
    });
    
    // Ensure smooth scroll to item when using Tab key navigation
    item.addEventListener('focus', () => {
        // Only trigger smooth scroll if the item is not fully in viewport
        const rect = item.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});

// Link focus handling (Retour à l'accueil)
const navLink = document.querySelector('nav a');
if (navLink) {
    navLink.addEventListener('focus', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Close events
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape, trap focus inside modal
    lightbox.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
        
        // Trap focus
        if (e.key === 'Tab') {
            e.preventDefault(); // Keep focus on close button as it's the only focusable element for now
            lightboxClose.focus(); 
        }
    });
}
