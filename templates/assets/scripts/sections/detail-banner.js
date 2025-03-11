
(function ($) {
    var a = 0;
    $(window).on('load scroll',function() {
        if($('.static').length > 0) {
            var oTop = $('.static').offset().top - window.innerHeight;
        }
        if (a == 0 && $(window).scrollTop() > oTop) {
            $('.static .static-block .count').each(function() {
                var $this = $(this),
                    symbol = $this.siblings("span").text().length,
                    countTo = $this.attr('data-count');
                var count_val = countTo.replace(',', '');
                var thisText = $this.text();
                if(symbol===0){
                    thisText = thisText+"x";
                }
                var counter_text = count_val.match(/[a-zA-Z$]+/);
                var counter_val = count_val.match(/[\d\.]+/);
                var final_val = Math.round(counter_val);
                $({
                    countNum: thisText
                }).animate({
                    countNum: final_val
                },{
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(counter_text+Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(countTo);
                    }
                });
            });
            a = 1;
        }
    });
})(jQuery);

