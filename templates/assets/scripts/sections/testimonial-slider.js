// (function ($) {
//     $(document).ready(function() {
//     $('.slider-for').slick({
//         infinite: true,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         fade: true,
//         asNavFor: '.slider-nav',
//         arrows: false
//     });
//     $('.slider-nav').slick({
//         infinite: true,
//         slidesToShow: 6,
//         slidesToScroll: 1,
//         asNavFor: '.slider-for',
//         dots: false,
//         arrow: true,
//         focusOnSelect: true,
//         responsive: [
//             {
//                 breakpoint: 991,
//                 settings: {
//                     slidesToShow: 4,
  
//                 },
//             },
//             {
//                 breakpoint: 767,
//                 settings: {
//                     slidesToShow: 3,
//                 },
//             },
//             {
//                 breakpoint: 595,
//                 settings: {
//                     slidesToShow: 2,
//                 },
//             },
//             {
//                 breakpoint: 400,
//                 settings: {
//                     slidesToShow: 1,
//                 },
//             },
//         ],
//     });
  
//     window.addEventListener('load', function () {
//         let tabSlider = document.querySelector(".tab-slider");
  
//         if (tabSlider) {
//             setTimeout(function () {
//                 tabSlider.className += " slider-active";
//             }, 500);
//         }
//     });
//     })
//   })(jQuery);
  