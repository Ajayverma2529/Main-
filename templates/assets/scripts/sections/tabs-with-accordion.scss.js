(function ($) {
    $(document).ready(function () {
        if ($(".tabs-with-accordion").length) {
            $('.tabs-with-accordion .nested-accordion h3').click(function (e) {
                $(".accordion-item").removeClass("active");
                $(".accordion-item .pannel").slideUp();
                e.preventDefault();
                let $this = $(this);
                if ($this.next().hasClass('show')) {
                    $this.next().removeClass('show');
                    $this.next().slideUp(350);
                    $('.tabs-with-accordion .nested-accordion h3').removeClass("active");
                } else {
                    $('.tabs-with-accordion .nested-accordion h3').removeClass("active");
                    $(this).addClass("active");
                    $this.parent().parent().find('.row-outer').removeClass('show');
                    $this.parent().parent().find('.row-outer').slideUp(350);
                    $this.next().toggleClass('show');
                    $this.next().slideToggle(350);
                }
            });
            $(".tabs-with-accordion h4").click(function () {
                if ($(this).parent().hasClass("active")) {
                    $(this).parent().removeClass("active");
                    $(this).parent().find(".pannel").slideUp();

                } else {
                    $(".accordion-item").removeClass("active");
                    $(".accordion-item").find(".pannel").slideUp();
                    $(this).parent().addClass("active");
                    $(this).parent().find(".pannel").slideDown();
                    $(".tabs-with-accordion .nested-accordion .row-outer .accordion-item .pannel p").css({ "opacity": "1" });
                }
            });
            $(document).on("click", ".accordion .arrow1", function () {
                $(this).addClass("active");
                $(this).removeClass("active");
            });

        }

    });
})(jQuery);
