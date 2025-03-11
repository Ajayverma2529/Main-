(function ($) {
    $(document).ready(function () {
        $(".blog-grid .outer-wrap .nav-wrapper .table-title").click(function () {
            if ($(this).parent().hasClass("active")) {
                $(this).parent().removeClass("active");
                $(this).parent().find(".list").slideUp();

            } else {
                $(".nav-wrapper").removeClass("active");
                $(".nav-wrapper").find(".list").slideUp();
                $(this).parent().addClass("active");
                $(this).parent().find(".list").slideDown();
            }
        });
        //document click will close the dropdown

        $(document).on("click", function (e) {
            var container = $(".blog-grid .outer-wrap .nav-wrapper");
            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $(".blog-grid .outer-wrap .nav-wrapper").removeClass("active");
                $('.blog-grid .outer-wrap .nav-wrapper .list').slideUp();
            }
        });

    });
})(jQuery);
//Team-filter
// // Use $ instead of jQuery without replacing global $
(function ($) {
  $(document).ready(function () {
    // For the filter dropdown
    $(".team-filter .filter-outer-wrap .nav-wrapper .table-title").click(function () {
      if ($(this).parent().hasClass("active")) {
        $(this).parent().removeClass("active");
        $(this).parent().find(".list").slideUp();
      } else {
        $(".nav-wrapper").removeClass("active");
        $(".nav-wrapper").find(".list").slideUp();
        $(this).parent().addClass("active");
        $(this).parent().find(".list").slideDown();
      }
    });

    // Close dropdown on document click
    $(document).on("click", function (e) {
      var container = $(".team-filter .filter-outer-wrap .nav-wrapper");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $(".team-filter .filter-outer-wrap .nav-wrapper").removeClass("active");
        $('.team-filter .filter-outer-wrap .nav-wrapper .list').slideUp();
      }
    });
  });

  var slideBox = $('.team-filter .grid-outer .card .content-overlay');
  var parentDiv = $('.team-filter .grid-outer .card');
  var containerWidth = $('.team-filter .container').width();
  var flag = false;

  $('.team-filter .grid-outer .views-element-container > div > ul > li').addClass('we-card');
  $('.team-filter .grid-outer .views-element-container  ul > li > div').addClass('put-content');
  $('.team-filter .grid-outer .views-element-container  ul > li > ul > li > div').removeClass('put-content');

  $(document).ready(function () {
    $('.team-filter .grid-outer .grand-child > ul > li > div').addClass('we-content');

    $('.team-filter .grid-outer .grand-child').each(function (i) {
      $(this).find('.put-content .content-overlay .inner-div').append("<div class='we-inner-wrap'></div>");
      $(this).find('.we-content').each(function (j) {
        $(this).parent().parent().parent().find('.put-content .content-overlay .we-inner-wrap').append("<div class='inner-content'></div>");
        $(this).find('.inner-div h3').clone().appendTo($(this).parent().parent().parent().find('.put-content .content-overlay .inner-content:eq(' + j + ')'));
        $(this).find('.inner-div p').clone().appendTo($(this).parent().parent().parent().find('.put-content .content-overlay .inner-content:eq(' + j + ')'));
        $(this).find('.inner-div a').clone().appendTo($(this).parent().parent().parent().find('.put-content .content-overlay .inner-content:eq(' + j + ')'));
      });
    });
  });

  $('.team-filter .grid-outer .card .inner-wrap').on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();

    var windowWidth = $(window).width();
    var $this = $(this);
    var currentOpen = $($this).offset().top;
    var preOffset = ($('.team-filter .grid-outer .card.current').length > 0) ? $('.team-filter .grid-outer .card.current').offset().top : 0;

    if ($this.parent().hasClass('current')) {
      setTimeout(function () {
        $(parentDiv).removeClass('current');
      }, 500);
      $(slideBox).stop(true, true).slideUp(300);
    } else {
      $(parentDiv).removeClass('current');
      $(this).parent().addClass('current');
      if (currentOpen !== preOffset) {
        $(slideBox).stop(true, true).slideUp(500);
      }
      $(slideBox).stop(true, true).slideUp(300);
      $(this).parent().find('.content-overlay').slideDown(500);
    }

    var offsetLeftBox = $($this).parents('.card').offset().left;
    var containerOffsetLeft = $('body .team-filter .grid-outer .card:eq(0)').offset().left;
    var parentDivWidth = $('.team-filter .grid-outer .card').width() / 2;

    $(this).parents('.card').find('.content-overlay .active-arrow').css({
      'left': offsetLeftBox - containerOffsetLeft + parentDivWidth - 25 + 'px'
    });

    setTimeout(function () {
      if (windowWidth < 768) {
        var content = $('body .team-filter .grid-outer .card.current');
        $('html, body').animate({
          'scrollTop': $(content).offset().top - 69
        }, 800, 'swing');
      }
    }, 100);
  });

  $('.team-filter .grid-outer .card .content-overlay .inner-div .close-icon').on('click', function (e) {
    e.stopPropagation();
    $('.team-filter .grid-outer .card .content-overlay').slideUp(500);
  });

  $(document).ready(function () {
    if ($('body .team-filter .grid-outer .card').length > 0) {
      var containerOffsetLeft = $('body .team-filter .grid-outer .card:eq(0)').offset().left;
      $('.team-filter .grid-outer .card').each(function (index, value) {
        var offsetLeft = $(value).offset().left;
        $(value).find('.content-overlay').css({
          'left': (containerOffsetLeft - offsetLeft)
        });
      });
    }
  });

  $(window).on('load', function () {
    if ($('body .team-filter .grid-outer .card').length > 0) {
      var containerOffsetLeft = $('body .team-filter .grid-outer .card:eq(0)').offset().left;
      $('.team-filter .grid-outer .card').each(function (index, value) {
        var offsetLeft = $(value).offset().left;
        $(value).find('.content-overlay').css({
          'left': (containerOffsetLeft - offsetLeft)
        });
      });
    }
  });

  $(window).resize(function (e) {
    if ($('body .team-filter .grid-outer .card').length > 0) {
      var containerWidth = $('.team-filter .container').width();
      var containerWidth1 = $('.team-filter.grid-five .container .grid-outer').width();
      var containerOffsetLeft = $('body .team-filter .grid-outer .card:eq(0)').offset().left;
      var winWidth = $(window).width();

      if ($('.team-filter').hasClass('grid-fiv')) {
        flag = true;
      }
      if (flag) {
        if (winWidth > 1200) {
          $(slideBox).css({'width': containerWidth1 + 'px'});
        } else {
          $(slideBox).css({'width': containerWidth + 'px'});
        }
      } else {
        $(slideBox).css({
          'width': containerWidth + 'px'
        });
      }

      $('.team-filter .grid-outer .card').each(function (index, value) {
        var offsetLeft = $(value).offset().left;
        $(value).find('.content-overlay').css({
          'left': (containerOffsetLeft - offsetLeft)
        });
      });
    }
  }).resize();

  $(slideBox).on('click', function (e) {
    e.stopPropagation();
  });

  $(document).on('click', function (e) {
    e.stopPropagation();
    $(parentDiv).removeClass('current');
    $(slideBox).stop(true, true).slideUp(500);
  });

  $('.team-filter .grid-outer .card .content-overlay .inner-div .close-icon').on('click', function (e) {
    e.stopPropagation();
    setTimeout(function () {
      $(parentDiv).removeClass('current');
    }, 300);
    $(this).parents('.card').find('.team-filter .grid-outer .card .content-overlay').slideUp(500);
  });

  if ($('.team-filter').length > 0) {
    var item_show = 6, length = '';

    function load_OnReady_column() {
      $('.team-filter .grid-outer').find('.we-card').each(function () {
        length = $(this).parents('.team-filter .grid-outer').find('.card').length;
        var index = $(this).index();
        if (index >= item_show) {
          $(this).css('display', 'none').removeClass('active-filter');
        } else {
          $(this).css('display', 'block').addClass('active-filter');
        }
        if (length <= item_show) {
          $(this).parents('.team-filter').find('.load-more').css('display', 'none');
        } else {
          $(this).parents('.team-filter').find('.load-more').css('display', 'inline-block');
        }
      });
    }

    function loadMore_column() {
      var $i = 0;
      $('.team-filter .grid-outer .we-card').each(function () {
        var $dataDisplay = $(this).css('display');
        if ($dataDisplay == 'block') {
          $i++;
        }
      });
      if ($i < length) {
        for (var $j = $i; $j < ($i + item_show); $j++) {
          $('.team-filter .grid-outer .we-card').css({'margin-bottom': '30px'});
          $('.team-filter .grid-outer .we-card:eq(' + $j + ')').css('display', 'block');
        }
      }
      if ($i >= (length - item_show)) {
        $('.load-more').css('display', 'none');
      }
    }

    $(document).ready(function () {
      load_OnReady_column();
    });

    $('.team-filter .load-more').on('click', function (e) {
      e.stopPropagation();
      loadMore_column();
    });
  }
})(jQuery);

  
  








