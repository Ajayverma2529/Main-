// Use $ instead of $ without replacing global $
(function ($) {
    $(document).ready(function () {
        $(window).scroll(function(){
            if ($(this).scrollTop() > 0) {
                $('.header').addClass('fixed');
            } else {
                $('.header').removeClass('fixed');
            }
        });
        $(".header .humberger").click(function () {
            $(".header .humberger").toggleClass("active");
            $(".header nav").slideToggle();
            $(".header").toggleClass("active");

        });
        $(window).on("resize", function () {
            var window_width = $(window).width();
            if (window_width > 991) {
                $(".header .humberger").parents().removeClass('active');
                $(".header").removeClass('active');
                $('.header nav').removeAttr('style', '');
            }
        });
        $(document).on("click", function (e) {
            var container = $(".header .humberger");
            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $(".header").removeClass("active");
                $(".header .humberger").removeClass("active");

            }
        });


    });
})(jQuery);
