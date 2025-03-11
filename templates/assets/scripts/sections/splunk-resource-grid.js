(function ($) {
  $(function () {
      $('.splunk-resource-grid').each(function () {
          var item = $(this).find('.card-item');
          if (item.length > 2) {
              $(this).find('.slider').slick({
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  arrow: false,
                  dots: true,
                  speed: 500,
                  autoplay: false,
                  infinite: true,
                  responsive: [
                      {
                          breakpoint: 1199,
                          settings: {
                              slidesToShow: 1,
                              slidesToScroll: 1,
                          }
                      },
                      {
                          breakpoint: 991,
                          settings: {
                              slidesToShow: 1,
                              slidesToScroll: 1,
                              dots: true,
                          }
                      },
                      {
                          breakpoint: 768,
                          settings: {
                              slidesToShow: 1,
                              slidesToScroll: 1,
                              dots: true,
                          }
                      },
                      {
                          breakpoint: 595,
                          settings: {
                              slidesToShow: 1,
                              slidesToScroll: 1,
                              dots: true,
                          }
                      },
                  ]
              });

          }
      });
  });

})(jQuery);

