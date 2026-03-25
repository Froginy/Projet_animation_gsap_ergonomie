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
