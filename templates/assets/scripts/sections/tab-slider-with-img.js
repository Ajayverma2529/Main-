(function ($) {
  $(document).ready(function () {
    $('.slider-for').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: false,
      asNavFor: '.slider-nav',
      arrows: false
    });
    $('.slider-nav').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: false,
      adaptiveHeight: true,
      vertical: true,
      verticalSwiping: true,
      arrow: true,
      focusOnSelect: true,
     
    });

    window.addEventListener('load', function () {
      let tabSlider = document.querySelector(".tab-slider-img");

      if (tabSlider) {
        setTimeout(function () {
          tabSlider.className += " slider-active";
        }, 500);
      }
    });
  })
})(jQuery);
