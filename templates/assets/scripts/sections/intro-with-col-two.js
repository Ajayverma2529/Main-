
(function($) {
    $(document).ready(function() {
        $(window).on('load resize', function() {
            $(".intro-with-col-two .outer-wrap").css({ opacity: "1" });
                var winWidth = $(window).width();
                if (winWidth <= 767) {
                    $(".intro-with-col-two .slider").slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrow: false,
                        dots: true,
                        speed: 500,
                        adaptiveHeight: true,
                        autoplay: false,
                        infinite: false,
                        responsive: [
                            {
                                breakpoint: 595,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    adaptiveHeight: true,
                                },
                            },
                        ],
                    });
                }
        });

    });

})(jQuery);