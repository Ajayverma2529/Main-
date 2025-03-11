(function ($) {
    $(document).ready(function () {
        if ($(".author-slider").length > 0) {
            $('.author-slider').each(function () {
                var item = $(this).find('.card-item');
                if (item.length > 1) {
                    $(this).find('.slider').slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrow: false,
                        dots: true,
                        speed: 500,
                        autoplay: false,
                        infinite: true,
                        adaptiveHeight: true,
                    });

                }
            });
        }
    });
})(jQuery);
