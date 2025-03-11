// // Use $ instead of jQuery without replacing global $
(function ($) {
  $(document).ready(function () {
    $(".socure-logo-slider .slider-wrap").css("opacity", "1");
    $(".socure-logo-slider .slider-outer").each(function () {
      $(this)
        .find(".slider-wrap")
        .slick({
          dots: false,
          infinite: true,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 20,
          adaptiveHeight: true,
          speed: 5500,
          cssEase: "linear",
          centerPadding: "10px",
          slidesToShow: 5,
          pauseOnHover: false,
          draggable: false,
          useTransform: true,
          swipe: false,
          touchMove: false,
          responsive: [
            {
              breakpoint: 1601,
              settings: {
                slidesToShow: 4,
              },
            },

            {
              breakpoint: 596,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        });
    });
  });
})(jQuery);
