(function ($) {

    smoothScroll();
    
    $(window).on('load resize', function () {
        var checkTarget = $('.sticky-bar');
        if (checkTarget.length) {
            stickyFilterBar();
        }
    });

   
    $('.drop-btn').on('click', function() {
        
        $(this).toggleClass('active');
        
    
        $('.sticky-bar ul').toggleClass('active');
    });

   
    $('.sticky-bar ul li a').on('click', function(e) {
        e.preventDefault(); 
        
        var clickedText = $(this).text(); 
        $('.drop-btn span').text(clickedText);
        
        $('.sticky-bar ul').removeClass('active');
        $('.drop-btn').removeClass('active');
        
        var headerHeight = $('.header').outerHeight();
        var stickyHeight = $('.sticky-bar').outerHeight() - 2;
        if (this.hash !== "") {
            var hash = this.hash; 
            $('html, body').animate({
                scrollTop: $(hash).offset().top - (stickyHeight + headerHeight) + 70
            }, 600);
        }
    });
  
    function stickyFilterBar() {
        var headHeight = $('.header').outerHeight();
        var initialScrollValue = $(window).scrollTop();
        var stickyEl = $('.sticky-bar .outer-wrapper');
        var checkPosition = $('.sticky-bar');
  
        setTimeout(function () {
            var wrapperHeight = stickyEl.outerHeight();
            stickyEl.parents('.sticky-bar').height(wrapperHeight);
        }, 500);
  
        $(window).on('scroll', function () {
            var getlinks = $('.sticky-bar .content-wrapper ul li');
            var headerHeight = $('.header').outerHeight();
            var stickyHeight = $('.sticky-bar .outer-wrapper.sticky').outerHeight();
            tabActive(getlinks, headerHeight, stickyHeight);
            var checkScroller = $(window).scrollTop();
  
            if (checkScroller > initialScrollValue && checkScroller > 0 && checkScroller > checkPosition.offset().top - headHeight) {
                stickyEl.addClass('sticky');
            } else if (checkScroller < initialScrollValue && checkScroller < checkPosition.offset().top - $('.header').height()) {
                stickyEl.removeClass('sticky');
            }
            initialScrollValue = checkScroller;
        });
    }
  
    function smoothScroll() {
        var target = $('.sticky-bar ul li a');
        target.on('click', function (e) {
            e.preventDefault();
            var headerHeight = $('.header').outerHeight();
            var stickyHeight = $('.sticky-bar').outerHeight() - 2;
            if (this.hash !== "") {
                var hash = this.hash; 
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - (stickyHeight + headerHeight) + 70
                }, 600);
            }
        });
    }
  
    function tabActive(aClass, stickyNav, mainHeader) {
        var topMenu = $(aClass),
            topMenuHeight = stickyNav + mainHeader,
            menuItems = topMenu.find("a"),
            scrollItems = menuItems.map(function () {
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            });
  
        var fromTop = $(window).scrollTop() + topMenuHeight + 30;
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop) {
                return this;
            }
        });
  
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
  
        menuItems.parent().removeClass("active");
        if (id) {
            menuItems.filter("[href='#" + id + "']").parent().addClass("active");
        }
    }
  
})(jQuery);