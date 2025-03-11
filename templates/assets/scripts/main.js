(function ($) {
    // AOS.init();

    $(document).ready(function (e) {
        (function($) {
            var wow = new WOW({
                boxClass: 'wow',
                offset: 0,
                mobile: true,
                live: true,
                callback: function(box) {
                    $(box).addClass('animate-complete');
                },
            });
            wow.init(window);
        
            objectFitImages();
        })(jQuery);

    });
    $('section').removeClass(". bg-default text-default");
    $('footer').removeClass(". bg-default text-default");
    $('div').removeClass(". bg-default text-default");
    $('header').removeClass(". bg-default text-default");

    $(document).on('click', 'a[href^="#"]', function (e) {
        if ($(this).hasClass('body-scroll')) {
            var id = $(this).attr('href');
            var $id = $(id);
            if ($id.length === 0) {
                return;
            }
            e.preventDefault();
            var nav_height = $('header').height();
            var admin_bar_height = $('#wpadminbar').height();
            var pos;
            if ($('body').hasClass('admin-bar')) {
                pos = $id.offset().top - nav_height - admin_bar_height - 1;
            } else {
                pos = $id.offset().top - nav_height - 1;
            }

            $('body, html').animate({scrollTop: pos}, 800);
        }
    });


    $(window).on('load resize', function () {
        var admin_bar_height = $('#wpadminbar').height();
        if ($('body').hasClass('admin-bar')) {
            $('body.admin-bar header .header-wrap').css({
                'top': admin_bar_height
            });
        }
    });
})(jQuery);

