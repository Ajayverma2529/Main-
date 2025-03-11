
(function ($) {
    // Navigate through the tabs and active the current selected
    $(document).ready(function () {
        $('.info-with-tabs').each(function () {
            $(this).find('.icon-with-heading').matchHeight();
            $(this).find('.icon-with-heading').click(function () {

                var winWidth = $(window).width();

                if (winWidth >= 768) {
                    var tab_selected = $(this).attr('data-tab');
                    $(this).parents('.info-with-tabs').find('.icon-with-heading').removeClass('hide');
                    $(this).parents('.info-with-tabs').find('.tab-text').removeClass('hide');
                    $(this).addClass('hide').siblings().removeClass('hide');
                    $(this).parents('.info-with-tabs').find("#" + tab_selected).addClass('hide');
                }
            });
        }) 
    });
    // Show tabs nav above 767px screen
    $(window).on("resize", function (e) {
        $('.info-with-tabs').each(function () {
            var winWidth = $(window).width();
            if (winWidth > 767) {
                $(this).find('.scroll-wrap').show();
            }
        });
    });

    //For Responsive tabs --> Click functionality
    $(document).ready(function () {
        $('.info-with-tabs').each(function () {
            $(this).find('.icon-with-heading').click(function () {

                var winWidth = $(window).width();

                if (winWidth <= 767) {
                    var tab_selected = $(this).attr('data-tab');
                    var selected_text = $(this).html();

                    $(this).parents('.info-with-tabs').find('.icon-with-heading').removeClass('hide');
                    $(this).parents('.info-with-tabs').find('.tab-text').removeClass('hide');
                    $(this).addClass('hide');
                    $(this).parents('.info-with-tabs').find("#" + tab_selected).addClass('hide');
                    $(this).parents('.info-with-tabs').find('.open .cover').html(selected_text);
                    $(this).parents('.info-with-tabs').find('.open').removeClass('active');
                    $(this).parents('.info-with-tabs').find('.scroll-wrap').slideUp();
                }
            });
            $(this).find('.open').click(function () {
                var winWidth = $(window).width();
                if (winWidth < 768) {
                    $(this).parents('.info-with-tabs').find('.open').toggleClass('active');
                    $(this).parents('.info-with-tabs').find('.scroll-wrap').slideToggle();
                }
            });
        });
    });

    $(window).on("load", function () {
        // wrappBlock();
        load_OnReady();
    });

    function load_OnReady() {
        var winWidth = $(window).width();
        if (winWidth >= 768) {
            $("body .seven-plus-items .slider").slick({
                infinite: true,
                slidesToShow: 7,
                slidesToScroll: 1,
                autoplay: false,
                dots: false,
                arrows: true,
                draggable: true,
            });
            $(window).on("load resize", function (e) {
                $("body .seven-plus-items .items").css({ "opacity": 1 });
            });
        }
    };
})(jQuery);