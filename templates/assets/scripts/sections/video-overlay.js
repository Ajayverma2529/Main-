(function ($) {
    var url;
    var content_show;
    function videoOverlay() {
        $(document).on("click", ".box-gallery .img-wrap .img-box .gallery-img img", function (e) {
            e.preventDefault();
            $(this).parent().parent().addClass('content_show');
            $(".we-video-overlay").addClass("overlay-active");
            $(".we-video-overlay").show();
            var url = $(this).attr("src");
            $(".video-overlay").find("img").attr("src", url);
            content_show = $(this).parents('.img-box').find('.title').html();
            $('body .overlay-active .video-overlay .video-container').append(content_show);

        });
        closeVideoOverlay();
    }
    function closeVideoOverlay() {

        $(".video-overlay").on("click", function () {
            $('body .overlay-active .video-overlay .video-container h4').remove();
            $(".we-video-overlay").hide();
            $(".we-video-overlay").removeClass("overlay-active");
        });

        $(".video-overlay  img").on("click", function (e) {
            e.stopPropagation();
        });
    }

    $(document).ready(function () {
        videoOverlay();
        video_height();
        $('.video .cicle-btn-play').on('click', function () {
            $(this).css({ 'z-index': -1 });
            $(this).parent().find('img').css({ 'z-index': -1 });
            var symbol = $(this).parent().find("img")[0].src.indexOf("?") > -1 ? "&" : "?";
            $(this).parent().find("img")[0].src += symbol + "autoplay=1";
        });

    });
    $(window).on("load scroll resize", function () {
        video_height();
    });

    function video_height() {
        var windowheight = $(window).height() / 1.9,
            windowWidth = $(window).width() / 1.2;
        $(".video-overlay img").attr("width", windowWidth + "px");
        $(".video-overlay img").attr("height", windowheight + "px");
    }

})(jQuery);
