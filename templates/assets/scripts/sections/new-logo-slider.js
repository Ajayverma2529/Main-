// const off = 60;
// let l = off;
// const marqueeElements = Array.from(document.querySelectorAll('.new-logo-slider .marquee .item'));
// const speed = 2;
// const stack = [];
// let pause = false;

// marqueeElements.forEach(element => {
//     const width = element.offsetWidth + off;
//     element.style.left = `${l}px`;
//     l += width;
//     stack.push(element);
// });

// function moveMarquee() {
//     if (!pause) {
//         marqueeElements.forEach(element => {
//             const currentLeft = parseFloat(getComputedStyle(element).left);
//             const newLeft = currentLeft - speed;
//             element.style.left = `${newLeft}px`;

//             if (newLeft + element.offsetWidth < -130) {
//                 const firstElement = stack.shift();
//                 const lastElement = stack[stack.length - 1];
//                 element.style.left = `${parseFloat(getComputedStyle(lastElement).left) + lastElement.offsetWidth + off}px`;
//                 stack.push(element);
//             }
//         });
//     }
//     requestAnimationFrame(moveMarquee);
// }

// requestAnimationFrame(moveMarquee);

// const marqueeContainer = document.querySelector('.marquee');
// marqueeContainer.addEventListener('mouseHover', () => {
//     // pause = true;
//     pause = false;
// });
// marqueeContainer.addEventListener('mouseout', () => {
//     pause = false;
// });

//logo-with-carousel

// (function ($) {
//     $(document).ready(function () {
//         const initializeSliders = function () {
//             const getSection = $('.logo-with-carousel');

//             if (getSection.length) {
//                 const logosLarge = $('.logo-with-carousel .wrapper');

//                 // Destroy any previous instances of Slick only if initialized
//                 if (logosLarge.hasClass('slick-initialized')) {
//                     logosLarge.slick('unslick');
//                 }

//                 // Reinitialize the sliders
//                 logosLarge.slick({
//                     dots: false,
//                     infinite: true,
//                     arrows: false,
//                     autoplay: true,
//                     autoplaySpeed: 20,
//                     adaptiveHeight: true,
//                     speed: 8000,
//                     cssEase: "linear",
//                     centerPadding: "100px",
//                     slidesToShow: 4,
//                     pauseOnHover: false,

//                     responsive: [
//                         {
//                             breakpoint: 1025,
//                             settings: {
//                                 slidesToShow: 3
//                             }
//                         },
//                         {
//                             breakpoint: 991,
//                             settings: {
//                                 slidesToShow: 3,
//                                 speed: 9000
//                             }
//                         },
//                         {
//                             breakpoint: 595,
//                             settings: {
//                                 slidesToShow: 2,
//                                 speed: 9000
//                             }
//                         }
//                     ]
//                 });
//             }
//         };

        
//         let resizeTimer;
//         const debounceResize = function (func, delay) {
//             clearTimeout(resizeTimer);
//             resizeTimer = setTimeout(func, delay);
//         };

        
//         initializeSliders();

       
//         $(window).resize(function () {
//             debounceResize(initializeSliders, 250); 
//         });
//     });
// })(jQuery);
document.addEventListener("DOMContentLoaded", function () {
    // Initialize sliders
    const initializeSliders = function () {
        const getSection = document.querySelector('.logo-with-carousel');

        if (getSection) {
            const logosLarge = document.querySelector('.logo-with-carousel .wrapper');

            // Destroy previous instances of Slick if initialized
            if (logosLarge.classList.contains('slick-initialized')) {
                $(logosLarge).slick('unslick'); // Use Slick's destroy method
            }

            // Reinitialize the sliders
            $(logosLarge).slick({
                dots: false,
                infinite: true,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 20,
                adaptiveHeight: true,
                speed: 8000,
                cssEase: "linear",
                centerPadding: "100px",
                slidesToShow: 4,
                pauseOnHover: false,

                responsive: [
                    {
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 3,
                            speed: 9000
                        }
                    },
                    {
                        breakpoint: 595,
                        settings: {
                            slidesToShow: 2,
                            speed: 9000
                        }
                    }
                ]
            });
        }
    };

    // Debounce function to limit how often resize logic is executed
    let resizeTimer;
    const debounceResize = function (func, delay) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(func, delay);
    };

    // Initialize sliders on document ready
    initializeSliders();

    // Reinitialize sliders on window resize with debounce
    window.addEventListener("resize", function () {
        debounceResize(initializeSliders, 250); // 250ms delay for smoothness
    });
});