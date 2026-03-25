

gsap.registerPlugin(SplitText) 

let split = SplitText.create("#chars", { type: "words, chars" });

gsap.fromTo(".hero-image", 
 
  { 
    scale: 1, 
    
  }, 
  
  { 
    scale: 1.01,           
    duration: 2,     
    
    
    repeat: -1,      
    yoyo: true      
  }
);
// now animate the characters in a staggered fashion
gsap.from(split.chars, {
  duration: 1, 
  y: 100,       // animate from 100px below
  autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
  stagger: 0.1 // 0.05 seconds between each
});