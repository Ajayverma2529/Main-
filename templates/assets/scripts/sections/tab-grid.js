(function ($) {
    $(document).ready(function () {
        $('.tab-grid .item-wrap .column-item').eq(0).addClass('active');
        $('.tab-grid .item-wrap .list-wrap .list-item').eq(0).addClass('active');
        appendAccordian();

        var tabChange = function () {
            var tabs = $('.tab-grid .list-wrap .list-item');
            var active = tabs.filter('.active');
            var next = active.next('.list-item').length ? active.next('.list-item') : tabs.filter(':first-child');
            next.addClass('active');
            next.siblings().removeClass('active');
            var index = next.index();
            $('.tab-grid .column-wrap .column-item').eq(index).addClass('active').siblings().removeClass('active');
        }
        // Tab Cycle function
        var tabCycle = setInterval(tabChange, 10000)
        // Tab click event handler
        $(function () {
            $('.tab-grid .list-wrap .list-item').click(function (e) {
                clearInterval(tabCycle);
                var clickIndex = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                $('.tab-grid .column-wrap .column-item').eq(clickIndex).addClass('active').siblings().removeClass('active');
            });
        });

    });


    function appendAccordian() {
        $('body .tab-grid .list-wrap .list-item').each(function () {
            var getIndex = $(this).index();
            var getHtml = $('.tab-grid .column-wrap .column-item').eq(getIndex).html();
            $(this).append('<div class="column-item">' + getHtml + '</div>');
        });


        $('.tab-grid .item-wrap .list-wrap .list-item .tab-item').click(function () {
            var getScreenWidth = $(window).width();
            if (getScreenWidth < 991) {
                $(this).toggleClass('mobile-active').parents('.list-item').siblings().find('.tab-item').removeClass('mobile-active');
                $(this).parents('.list-item').siblings().find('.column-item').slideUp(600);
                $(this).siblings('.column-item').slideToggle(600);
            }
        });
    }



})(jQuery);