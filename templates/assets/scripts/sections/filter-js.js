(function ($) {
    $(document).ready(function () {
        $('.col-three-cards .content-wrap .list-item ul li a').on('click', function (e) {
            e.preventDefault();
            $(this).parent().addClass('hide').siblings().removeClass('hide');
            $(this).parent().parent().parent().parent().addClass('filter-active');
            $('.col-three-cards').removeClass('no-result');
            $('.col-three-cards .content-wrap .list-item ul li').removeClass('active');
            $(this).parent().addClass('active');
            $('.col-three-cards .content-wrap .column-wrapper .filter-items .item-box.hide').remove();
            var category = $(this).parent().attr('id');
            // if ($('.col-three-cards .column-wrapper .filter-items').hasClass('slick-initialized')) {
            //     $('.col-three-cards .column-wrapper .filter-items').slick('unslick');
            //     $('.col-three-cards .content-wrap .column-wrapper .filter-items .item-box.hide').remove();
            // }
            if (category == 'all') {
                $('.col-three-cards .content-wrap .column-wrapper .filter-items .item-box').remove();
                setTimeout(function () {
                    $('.item-box').removeClass('hide').addClass('show');
                    $('.item-box.show').clone().appendTo('.col-three-cards .content-wrap .column-wrapper .filter-items');
                }, 100);
            } else {
                $('.col-three-cards .content-wrap .column-wrapper .filter-items .item-box').remove();
                $('.item-box').addClass('hide').removeClass('show');
                $('.col-three-cards').removeClass('no-result');
                setTimeout(function () {
                    $('.' + category).removeClass('hide').addClass('show');
                    $('.item-box.show').clone().appendTo('.col-three-cards .content-wrap .column-wrapper .filter-items');
                    if ($(".col-three-cards .column-wrapper .items .item-box.show").length == 0) {
                        $('.col-three-cards').addClass('no-result');
                    } else {
                        $('.col-three-cards').removeClass('no-result');
                        $('.col-three-cards .column-wrapper .items').show();
                        $('.col-three-cards .content-wrap .column-wrapper .filter-items .item-box.hide').remove();

                    }
                }, 100);
            }
        });
    });
})(jQuery);