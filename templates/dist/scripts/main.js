'use strict';

(function ($) {
    // AOS.init();

    $(document).ready(function (e) {
        (function ($) {
            var wow = new WOW({
                boxClass: 'wow',
                offset: 0,
                mobile: true,
                live: true,
                callback: function callback(box) {
                    $(box).addClass('animate-complete');
                }
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

            $('body, html').animate({ scrollTop: pos }, 800);
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
"use strict";

(function ($) {
  $(document).ready(function () {
    $(".accordion .accordion-item").click(function () {
      if ($(this).hasClass("active")) {
        $(".accordion-item").removeClass("active");
        $(".accordion-item").children(".pannel").slideUp();
      } else {
        $(".accordion-item").removeClass("active");
        $(this).addClass("active");
        $(".accordion-item").find(".pannel").slideUp();
        $(this).children(".pannel").slideDown();
      }
    });

    $(document).on("click", ".accordion .arrow1", function () {
      $(this).addClass("active");
      $(this).removeClass("active");
    });
  });
})(jQuery);

//nile-col-three-grid

$(window).on("load resize", function () {
  var $cardItems = $(".nile-col-three-grid .card-wrap .card-item");
  var numItems = $cardItems.length;
  var itemWidth = void 0;

  if (numItems === 1) {
    itemWidth = "calc(100% - 20px)";
  } else if (numItems === 2) {
    itemWidth = "calc(50% - 20px)";
  } else if (numItems === 3) {
    itemWidth = "calc(33.33% - 20px)";
  }

  if (numItems <= 3) {
    $cardItems.css("width", itemWidth);
  }
});

// $(document).ready(function() {
//     const $cardItems = $('.nile-col-three-grid .card-wrap .card-item');
//     const numItems = $cardItems.length;
//     let itemWidth;

//     if (numItems === 1) {
//         itemWidth = 'calc(100% - 20px)';
//     } else if (numItems === 2) {
//         itemWidth = 'calc(50% - 20px)';
//     } else if (numItems === 3) {
//         itemWidth = 'calc(33.33% - 20px)';
//     } else {
//         itemWidth = 'calc(' + (100 / numItems) + '% - 20px)';
//     }

//     $cardItems.css('width', itemWidth);
// });

//page-overlay Js
(function ($) {
  $(document).ready(function () {
    $(".page-overlay .accordion-item").click(function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).children(".accordion-content").stop().slideUp(300);
      } else {
        $(".accordion-item").removeClass("active");
        $(".accordion-item").children(".accordion-content").stop().slideUp(300);
        $(this).addClass("active");
        $(this).children(".accordion-content").stop().slideDown(300);
      }
    });

    $(document).on("click", ".page-overlay .arrow1", function () {
      $(this).toggleClass("active");
      $(this).animate({ transform: "rotate(180deg)" }, 300);
    });
  });
})(jQuery);

$(function () {
  //Scroll event
  $(window).scroll(function () {
    var scrolled = $(window).scrollTop();
    if (scrolled > 200) $(".page-overlay .top-btn h6").fadeIn("slow");
    if (scrolled < 200) $(".page-overlay .top-btn h6").fadeOut("slow");
  });

  //Click event
  $(".page-overlay .top-btn h6").click(function () {
    $("html, body").animate({ scrollTop: "0" }, 500);
  });
});
//resource-filter
(function ($) {
  if ($(".resource-filter").length) {
    $(document).ready(function () {
      // Initialize variables
      var jsonData = []; // To store JSON data
      var selectedYears = new Set(); // Set to hold selected years
      var selectedTopics = new Set(); // Set to hold selected topics
      var maxItems = 9; // Max number of items per page
      var currentPage = 1; // Current page number for pagination

      // Helper function to update URL parameters based on selected filters and page number
      function updateURLParams() {
        var url = new URL(window.location); // Get the current URL
        url.searchParams.delete("year"); // Remove the "year" parameter from the URL
        url.searchParams.delete("topic"); // Remove the "topic" parameter from the URL

        // If the current page is greater than 1, add it to the URL
        if (currentPage > 1) {
          url.searchParams.set("page", currentPage);
        } else {
          url.searchParams.delete("page"); // Remove the "page" parameter if it's page 1
        }

        // Append the selected years and topics to the URL
        selectedYears.forEach(function (year) {
          return url.searchParams.append("year", year);
        });
        selectedTopics.forEach(function (topic) {
          return url.searchParams.append("topic", topic);
        });

        // Update the browser's address bar without reloading the page
        window.history.replaceState({}, "", url);
      }

      // Helper function to read filters and page number from the URL on page load
      function loadFiltersFromURL() {
        var urlParams = new URLSearchParams(window.location.search); // Get URL parameters
        selectedYears = new Set(urlParams.getAll("year")); // Get all "year" values from URL
        selectedTopics = new Set(urlParams.getAll("topic")); // Get all "topic" values from URL
        currentPage = parseInt(urlParams.get("page")) || 1; // Get page number, default to 1 if not found
      }

      $(".no-result").removeClass("active"); // Hide no result message initially

      //<span>${item?.industry}</span>
      // Fetch JSON data and display it in the container
      $.getJSON("/ajayverma/json/resource-filter.json", function (data) {
        jsonData = data; // Store the fetched data
        var parentDiv = $(".resource-filter .filter-content-wrap .inner-wrap");
        parentDiv.empty(); // Empty the container before appending new items
        data.forEach(function (item) {
          var itemWrap = $("\n                        <div class=\"item-wrap\">\n                            <div class=\"content-inner\">\n                                <div class=\"img-wrap\">\n                                    <img src=\"" + item.imgSource + "\" alt=\"Manage banner\">\n                                </div>\n                                <div class=\"body-content\">\n                                    <h6>" + item.year + " | " + item.topic + "</h6>\n                                    <h4>" + item.title + "</h4>\n                                    <p>" + item.description + "</p>\n                                </div>\n                            </div>\n                        </div>\n                    ");
          parentDiv.append(itemWrap);
        });

        loadFiltersFromURL();
        applyURLFilters();
        filterItems("");
      });

      // Function to filter items based on selected filters and search text
      function filterItems(searchText) {
        var itemsToShow = $(".item-wrap"); // Initially show all items

        // Filter by selected years
        if (selectedYears.size > 0) {
          itemsToShow = itemsToShow.filter(function () {
            var itemYear = $(this).find("h6").text().trim().split(" ")[0];
            return selectedYears.has(itemYear); // Check if the year is selected
          });
        }

        // Filter by selected topics
        if (selectedTopics.size > 0) {
          itemsToShow = itemsToShow.filter(function () {
            var itemTopic = $(this).find("h6").text().trim().split("|")[1].trim();
            return selectedTopics.has(itemTopic); // Check if the topic is selected
          });
        }

        // Filter by search text (if provided)
        if (searchText) {
          itemsToShow = itemsToShow.filter(function () {
            var itemText = $(this).find(".body-content h4").text().toLowerCase();
            return itemText.includes(searchText.toLowerCase()); // Case-insensitive search
          });
        }

        // Hide all items initially
        $(".item-wrap").hide();
        var totalItems = itemsToShow.length; // Get the total number of filtered items
        var totalPages = Math.ceil(totalItems / maxItems); // Calculate the total number of pages
        var start = (currentPage - 1) * maxItems; // Calculate the starting index for current page
        var end = start + maxItems; // Calculate the ending index for current page

        // Show only the items for the current page
        itemsToShow.slice(start, end).show();
        $(".pagination-button").toggle(totalItems > maxItems); // Show pagination button if needed

        // Update result count
        $(".lenth-items .total-reslut").text(totalItems + " Results");

        // Show or hide "no result" message
        $(".no-result").toggleClass("active", totalItems === 0);
        updatePaginationButtons(totalPages); // Update pagination buttons
        $(".clear-btn").toggleClass("active", selectedYears.size > 0 || selectedTopics.size > 0 || searchText !== ""); // Show clear button if any filters are applied
      }

      // Function to update pagination buttons
      function updatePaginationButtons(totalPages) {
        var paginationHTML = "<li class=\"prev " + (currentPage === 1 ? "disabled" : "") + "\"><svg width=\"16\" height=\"13\" viewBox=\"0 0 16 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6.0332 11.4861L0.99991 6.24307L6.0332 1.00006\" stroke=\"#ffff\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M14.6318 6.24304L1 6.24304\" stroke=\"#ffff\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg></li>";
        for (var i = 1; i <= totalPages; i++) {
          paginationHTML += "<li class=\"" + (i === currentPage ? "active" : "") + "\">" + i + "</li>"; // Add page number buttons
        }
        paginationHTML += "<li class=\"next " + (currentPage === totalPages ? "disabled" : "") + "\"><svg width=\"16\" height=\"13\" viewBox=\"0 0 16 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.59827 11.8596L14.6316 6.61661L9.59827 1.37359\" stroke=\"#ffff\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M1 6.61658L14.6318 6.61658\" stroke=\"#ffff\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg></li>";
        $("#pagination-container").html(paginationHTML); // Insert the pagination buttons into the container
      }

      // Handle pagination button clicks
      $("#pagination-container").on("click", "li", function () {
        if ($(this).hasClass("disabled") || $(this).hasClass("active")) return; // Prevent clicking on disabled or active buttons
        if ($(this).hasClass("prev")) currentPage--; // Go to the previous page
        else if ($(this).hasClass("next")) currentPage++; // Go to the next page
          else currentPage = parseInt($(this).text()); // Go to the page number clicked

        updateURLParams(); // Update the URL with the new page number

        var searchText = $(".input-wrapper .search").val().trim(); // Get search text
        filterItems(searchText); // Apply the filters based on the search text and selected filters
        $("html, body").animate({ scrollTop: $(".resource-filter").offset().top }, 500); // Scroll to the top of the filter section
      });

      // Function to apply the filters stored in the URL
      function applyURLFilters() {
        selectedYears.forEach(function (year) {
          return $("#year li:contains(" + year + ")").addClass("active");
        });
        selectedTopics.forEach(function (topic) {
          return $("#glossary_block li:contains(" + topic + ")").addClass("active");
        });
        filterItems(""); // Apply the filters and show the filtered items
        updateBadges(); // Update the badges based on selected filters
      }

      // Handle year filter clicks
      $("#year li").click(function () {
        var year = $(this).text().trim(); // Get the selected year
        if (year === "All") {
          selectedYears.clear(); // Clear all year selections
          $("#year li").removeClass("active"); // Remove active class from all years
          $(this).addClass("active"); // Add active class to "All"
        } else {
          $(this).toggleClass("active"); // Toggle active class for the clicked year
          if ($(this).hasClass("active")) {
            selectedYears.add(year); // Add year to selected years
          } else {
            selectedYears.delete(year); // Remove year from selected years
          }
          $("#year .all").removeClass("active"); // Remove active class from "All"
        }

        updateURLParams(); // Update the URL with the new selected filters
        currentPage = 1; // Reset to page 1
        filterItems($(".input-wrapper .search").val().trim()); // Filter the items
        updateBadges(); // Update the badges
      });

      // Handle topic filter clicks
      $("#glossary_block li").click(function () {
        var topic = $(this).text().trim(); // Get the selected topic
        if (topic === "All") {
          selectedTopics.clear(); // Clear all topic selections
          $("#glossary_block li").removeClass("active"); // Remove active class from all topics
          $(this).addClass("active"); // Add active class to "All"
        } else {
          $(this).toggleClass("active"); // Toggle active class for the clicked topic
          if ($(this).hasClass("active")) {
            selectedTopics.add(topic); // Add topic to selected topics
          } else {
            selectedTopics.delete(topic); // Remove topic from selected topics
          }
          $("#glossary_block .all").removeClass("active"); // Remove active class from "All"
        }

        updateURLParams(); // Update the URL with the new selected filters
        currentPage = 1; // Reset to page 1
        filterItems($(".input-wrapper .search").val().trim()); // Filter the items
        updateBadges(); // Update the badges
      });

      // Function to update the badges for selected years and topics
      function updateBadges() {
        var fieldWrap = $(".field-wrap");
        fieldWrap.empty(); // Clear the existing badges
        selectedYears.forEach(function (year) {
          return fieldWrap.append("<span class=\"filter-badge year\">" + year + "</span>");
        }); // Append year badges
        selectedTopics.forEach(function (topic) {
          return fieldWrap.append("<span class=\"filter-badge topic\">" + topic + "</span>");
        }); // Append topic badges
        fieldWrap.toggleClass("active", selectedYears.size > 0 || selectedTopics.size > 0); // Show or hide the badges wrapper
      }

      // Remove badge when clicked
      $(".field-wrap").on("click", ".filter-badge", function () {
        var value = $(this).text().trim(); // Get the value of the clicked badge
        if ($(this).hasClass("year")) {
          selectedYears.delete(value); // Remove the year from the selected years
          $("#year li:contains(" + value + ")").removeClass("active"); // Remove active class from the year filter
        } else if ($(this).hasClass("topic")) {
          selectedTopics.delete(value); // Remove the topic from the selected topics
          $("#glossary_block li:contains(" + value + ")").removeClass("active"); // Remove active class from the topic filter
        }

        $(this).remove(); // Remove the clicked badge
        if (!$(".field-wrap .filter-badge").length) {
          $(".field-wrap").removeClass("active"); // Hide the badges wrapper if there are no badges left
        }

        updateURLParams(); // Update the URL with the new selected filters
        currentPage = 1; // Reset to page 1
        filterItems($(".input-wrapper .search").val().trim()); // Filter the items
      });

      // Clear all filters
      $(".clear-btn").click(function () {
        selectedYears.clear(); // Clear selected years
        selectedTopics.clear(); // Clear selected topics
        $(".input-wrapper .search").val(""); // Clear search input
        $("#year li, #glossary_block li").removeClass("active"); // Remove active class from filters
        $(".field-wrap").removeClass("active").empty(); // Remove badges
        $(".clear-btn").removeClass("active"); // Hide the clear button
        currentPage = 1; // Reset to page 1
        updateURLParams(); // Update the URL
        filterItems(""); // Filter the items
      });

      // Search on input change
      $(".input-wrapper .search").on("input", function () {
        currentPage = 1; // Reset to page 1
        var searchText = $(this).val().trim(); // Get search text
        filterItems(searchText); // Filter the items based on search
      });

      // Toggle navigation menu
      $(".resource-filter .outer-wrap .nav-wrapper .table-title").click(function () {
        if ($(this).parent().hasClass("active")) {
          $(this).parent().removeClass("active");
          $(this).parent().find(".list").slideUp(); // Close the list
        } else {
          $(".nav-wrapper").removeClass("active");
          $(".nav-wrapper").find(".list").slideUp(); // Close other lists
          $(this).parent().addClass("active");
          $(this).parent().find(".list").slideDown(); // Open the clicked list
        }
      });

      // Close filter lists if clicked outside
      $(document).on("click", function (e) {
        var container = $(".resource-filter .outer-wrap .nav-wrapper");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          $(".resource-filter .outer-wrap .nav-wrapper").removeClass("active");
          $(".resource-filter .outer-wrap .nav-wrapper .list").slideUp(); // Close all lists
        }
      });
    });
  }
})(jQuery);

//countdown

// Set the target date and time for the countdown
// const targetDate = new Date("December 31, 2024 23:59:59").getTime();

// // Function to update the countdown every second
// function updateCountdown() {
//     const now = new Date().getTime(); // Current time
//     const timeLeft = targetDate - now; // Difference in time

//     // Calculate days, hours, minutes, and seconds
//     const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

//     // Display the result inside the .countdown-wrapper div
//     document.querySelector("#countdown .countdown-wrapper").innerHTML = `
//         <p><span>${days}</span> Days</p>
//         <p><span>${hours}</span> Hours</p>
//         <p><span>${minutes}</span> Minutes</p>
//         <p><span>${seconds}</span> Seconds</p>
//     `;

//     // Check if the countdown is over
//     if (timeLeft < 0) {
//         clearInterval(countdownInterval);
//         document.querySelector("#countdown .countdown-wrapper").innerHTML = "<p>Countdown ended!</p>";
//     }
// }

// // Update the countdown every 1 second
// const countdownInterval = setInterval(updateCountdown, 1000);
'use strict';

(function ($) {
    $(document).ready(function () {
        if ($(".author-slider").length > 0) {
            $('.author-slider').each(function () {
                var item = $(this).find('.card-item');
                if (item.length > 1) {
                    $(this).find('.slider').slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrow: false,
                        dots: true,
                        speed: 500,
                        autoplay: false,
                        infinite: true,
                        adaptiveHeight: true
                    });
                }
            });
        }
    });
})(jQuery);
"use strict";

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
    var preOffset = $('.team-filter .grid-outer .card.current').length > 0 ? $('.team-filter .grid-outer .card.current').offset().top : 0;

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
          'left': containerOffsetLeft - offsetLeft
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
          'left': containerOffsetLeft - offsetLeft
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
          $(slideBox).css({ 'width': containerWidth1 + 'px' });
        } else {
          $(slideBox).css({ 'width': containerWidth + 'px' });
        }
      } else {
        $(slideBox).css({
          'width': containerWidth + 'px'
        });
      }

      $('.team-filter .grid-outer .card').each(function (index, value) {
        var offsetLeft = $(value).offset().left;
        $(value).find('.content-overlay').css({
          'left': containerOffsetLeft - offsetLeft
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
    var load_OnReady_column = function load_OnReady_column() {
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
    };

    var loadMore_column = function loadMore_column() {
      var $i = 0;
      $('.team-filter .grid-outer .we-card').each(function () {
        var $dataDisplay = $(this).css('display');
        if ($dataDisplay == 'block') {
          $i++;
        }
      });
      if ($i < length) {
        for (var $j = $i; $j < $i + item_show; $j++) {
          $('.team-filter .grid-outer .we-card').css({ 'margin-bottom': '30px' });
          $('.team-filter .grid-outer .we-card:eq(' + $j + ')').css('display', 'block');
        }
      }
      if ($i >= length - item_show) {
        $('.load-more').css('display', 'none');
      }
    };

    var item_show = 6,
        length = '';

    $(document).ready(function () {
      load_OnReady_column();
    });

    $('.team-filter .load-more').on('click', function (e) {
      e.stopPropagation();
      loadMore_column();
    });
  }
})(jQuery);
"use strict";

(function ($) {
  // Video overlay
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
      $("body").addClass("overlay-scroll");
    });
    closeVideoOverlay();
  }
  function closeVideoOverlay() {

    $(".video-overlay").on("click", function () {
      $('body .overlay-active .video-overlay .video-container h4').remove();
      $('body .overlay-active .video-overlay .video-container h6').remove();
      $(".we-video-overlay").hide();
      $(".we-video-overlay").removeClass("overlay-active");
      $("body").removeClass("overlay-scroll");
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
'use strict';

//ALL Sliders

//resource-grid 
(function ($) {
    $(function () {
        $('.resource-grid').each(function () {
            var item = $(this).find('.card-item');
            if (item.length > 3) {
                $(this).find('.slider').slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrow: true,
                    dots: true,
                    speed: 500,
                    autoplay: false,
                    infinite: true,
                    responsive: [{
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    }, {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            dots: true
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            dots: true
                        }
                    }, {
                        breakpoint: 595,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true
                        }
                    }]
                });
            }
        });
    });
})(jQuery);

//logo-tab-grids

(function ($) {
    $(document).ready(function () {
        $('.logo-tab-grids .item-wrap .column-item').eq(0).addClass('active');
        $('.logo-tab-grids .item-wrap .list-wrap .list-item').eq(0).addClass('active');

        var tabChange = function tabChange() {
            var tabs = $('.logo-tab-grids .list-wrap .list-item');
            var active = tabs.filter('.active');
            var next = active.next('.list-item').length ? active.next('.list-item') : tabs.filter(':first-child');
            next.addClass('active');
            next.siblings().removeClass('active');
            var index = next.index();
            $('.logo-tab-grids .column-wrap .column-item').eq(index).addClass('active').siblings().removeClass('active');
        };
        // Tab Cycle function
        var tabCycle = setInterval(tabChange, 50000);
        // Tab click event handler
        $(function () {
            $('.logo-tab-grids .list-wrap .list-item').click(function (e) {
                clearInterval(tabCycle);
                var clickIndex = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                $('.logo-tab-grids .column-wrap .column-item').eq(clickIndex).addClass('active').siblings().removeClass('active');
            });
        });
    });
    function appendAccordian() {
        $('body .logo-tab-grids .list-wrap .list-item').each(function () {
            var getIndex = $(this).index();
            var getHtml = $('.logo-tab-grids .column-wrap .column-item').eq(getIndex).html();
            $(this).append('<div class="column-item">' + getHtml + '</div>');
        });

        $('.logo-tab-grids .item-wrap .list-wrap .list-item .tab-item').click(function () {
            var getScreenWidth = $(window).width();
            if (getScreenWidth < 992) {
                $(this).toggleClass('mobile-active').parents('.list-item').siblings().find('.tab-item').removeClass('mobile-active');
                $(this).parents('.list-item').siblings().find('.column-item').slideUp(600);
                $(this).siblings('.column-item').slideToggle(600);
            }
        });
    }
    $(window).on('load', function () {
        var getScreenWidthss = $(window).width();
        console.log(getScreenWidthss);
        if (getScreenWidthss < 992) {
            appendAccordian();
        }
    });
})(jQuery);

//image-text-slider
(function ($) {
    $(document).ready(function () {
        var itemLength = $("body .image-text-slider .column-wrapper .slider .item").length;

        $('.image-text-slider .slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
            // autoplay: true,
            // autoplaySpeed: 4000
        });

        if (itemLength == 1) {
            $(".image-text-slider .slick-dots").css({ "display": "none" });
        }
        $(window).on("load resize", function (e) {
            $('body .image-text-slider  .column-wrapper .slider').css({ "opacity": 1 });

            $('body .image-text-slider .slick-dots').css({ "opacity": 1 });
        });
    });
})(jQuery);

//event-information

(function ($) {
    $(document).ready(function () {
        // Configure/customize these variables.
        var showChar = 241; // How many characters are shown by default
        var ellipsestext = "...";
        var moretext = "Read More";
        var lesstext = "Read Less";

        $('.event-information .more').each(function () {
            var content = $(this).html();

            if (content.length > showChar) {

                var c = content.substr(0, showChar);
                var h = content.substr(showChar, content.length - showChar);

                var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

                $(this).html(html);
            }
        });

        $(".morelink").click(function () {
            if ($(this).hasClass("less")) {
                $(this).removeClass("less");
                $(this).html(moretext);
            } else {
                $(this).addClass("less");
                $(this).html(lesstext);
            }
            $(this).parent().prev().toggle();
            $(this).prev().toggle();
            return false;
        });
    });
})(jQuery);

//resource-filter-new 
(function ($) {
    if ($(".resource-filter-new").length) {
        $(document).ready(function () {
            // Initialize variables
            var jsonData = [];
            var selectedYears = new Set();
            var selectedTopics = new Set();
            var selectedIndustries = new Set();
            var selectedProducts = new Set();
            var maxItems = 9;
            var currentPage = 1;

            // Helper function to update the URL
            function updateURLParams() {
                var url = new URL(window.location);
                url.searchParams.delete("year");
                url.searchParams.delete("topic");
                url.searchParams.delete("industry");
                url.searchParams.delete("product");

                if (currentPage > 1) {
                    url.searchParams.set("page", currentPage);
                } else {
                    url.searchParams.delete("page");
                }

                selectedYears.forEach(function (year) {
                    return url.searchParams.append("year", year);
                });
                selectedTopics.forEach(function (topic) {
                    return url.searchParams.append("topic", topic);
                });
                selectedIndustries.forEach(function (industry) {
                    return url.searchParams.append("industry", industry);
                });
                selectedProducts.forEach(function (product) {
                    return url.searchParams.append("product", product);
                });

                window.history.replaceState({}, '', url);
            }

            // Read filters and page number from the URL
            function loadFiltersFromURL() {
                var urlParams = new URLSearchParams(window.location.search);
                selectedYears = new Set(urlParams.getAll("year"));
                selectedTopics = new Set(urlParams.getAll("topic"));
                selectedIndustries = new Set(urlParams.getAll("industry"));
                selectedProducts = new Set(urlParams.getAll("product"));
                currentPage = parseInt(urlParams.get("page")) || 1;
            }

            $(".no-result").removeClass("active");

            // Fetch JSON data and display items
            $.getJSON("/ajayverma/json/resource-filter-new.json", function (data) {
                jsonData = data;
                loadFiltersFromURL(); // Ensure filters are loaded first
                displayItems(); // Then display items
                applyURLFilters(); // Finally, apply URL filters
            });

            // Function to display items based on filters and pagination
            // Function to display items
            function displayItems() {
                var parentDiv = $('.resource-filter-new .filter-content-wrap .inner-wrap');
                parentDiv.empty();

                jsonData.forEach(function (item) {
                    var itemWrap = $('\n                        <div class="item-wrap">\n                            <div class="content-inner">\n                                <div class="img-wrap">\n                                    <img src="' + item.imgSource + '" alt="Manage banner">\n                                </div>\n                                <div class="body-content">\n                                    <h6>' + item.year + ' | ' + item.topic + ' | ' + item.industry + ' | ' + item.product + '</h6>\n                                    <h4>' + item.title + '</h4>\n                                    <p>' + item.description + '</p>\n                                </div>\n                            </div>\n                        </div>\n                    ');
                    parentDiv.append(itemWrap);
                });

                filterItems(""); // Apply filters and pagination
            }
            // Function to filter and paginate items
            function filterItems(searchText) {
                var itemsToShow = $(".item-wrap");

                // Filter by year
                if (selectedYears.size > 0) {
                    itemsToShow = itemsToShow.filter(function () {
                        var itemYear = $(this).find("h6").text().trim().split('|')[0].trim();
                        return selectedYears.has(itemYear);
                    });
                }

                // Filter by topic
                if (selectedTopics.size > 0) {
                    itemsToShow = itemsToShow.filter(function () {
                        var itemTopic = $(this).find("h6").text().trim().split('|')[1].trim();
                        return selectedTopics.has(itemTopic);
                    });
                }

                // Filter by industry
                if (selectedIndustries.size > 0) {
                    itemsToShow = itemsToShow.filter(function () {
                        var itemIndustry = $(this).find("h6").text().trim().split('|')[2].trim();
                        return selectedIndustries.has(itemIndustry);
                    });
                }

                // Filter by product
                if (selectedProducts.size > 0) {
                    itemsToShow = itemsToShow.filter(function () {
                        var itemProduct = $(this).find("h6").text().trim().split('|')[3].trim();
                        return selectedProducts.has(itemProduct);
                    });
                }

                // Filter by search text
                if (searchText) {
                    itemsToShow = itemsToShow.filter(function () {
                        var itemText = $(this).find(".body-content h4").text().toLowerCase();
                        return itemText.includes(searchText.toLowerCase());
                    });
                }

                // Hide all items first, then show only matching items
                $(".item-wrap").hide();
                var totalItems = itemsToShow.length;
                var totalPages = Math.ceil(totalItems / maxItems);

                // Ensure currentPage doesn't exceed totalPages
                if (currentPage > totalPages) currentPage = totalPages;

                var start = (currentPage - 1) * maxItems;
                var end = start + maxItems;

                // Show only items for the current page
                itemsToShow.hide().slice(start, end).show();

                // Update UI elements
                $(".pagination-button").toggle(totalItems > maxItems);
                $(".lenth-items .total-reslut").text(totalItems + ' Results');
                $(".no-result").toggleClass("active", totalItems === 0);
                updatePaginationButtons(totalPages);
                $(".clear-btn").toggleClass("active", selectedYears.size > 0 || selectedTopics.size > 0 || selectedIndustries.size > 0 || selectedProducts.size > 0 || searchText !== "");
            }

            // Function to update pagination buttons
            function updatePaginationButtons(totalPages) {
                var paginationHTML = '<li class="prev ' + (currentPage === 1 ? 'disabled' : '') + '"><svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.0332 11.4861L0.99991 6.24307L6.0332 1.00006" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.6318 6.24304L1 6.24304" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></li>';
                for (var i = 1; i <= totalPages; i++) {
                    paginationHTML += '<li class="' + (i === currentPage ? 'active' : '') + '">' + i + '</li>';
                }
                paginationHTML += '<li class="next ' + (currentPage === totalPages ? 'disabled' : '') + '"><svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.59827 11.8596L14.6316 6.61661L9.59827 1.37359" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 6.61658L14.6318 6.61658" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></li>';
                $("#pagination-container").html(paginationHTML);
            }

            // Handle filter clicks
            function handleFilterClick(filterSet, filterClass, element) {
                var value = $(element).text().trim();
                var isAll = value === "All";

                if (isAll) {
                    // If "All" is already active, toggle it off
                    if ($(element).hasClass("active")) {
                        $(filterClass).removeClass("active");
                        filterSet.clear();
                    } else {
                        // Otherwise, activate "All" and clear other filters
                        filterSet.clear();
                        $(filterClass).removeClass("active");
                        $(element).addClass("active");
                    }
                } else {
                    $(element).toggleClass("active");
                    if ($(element).hasClass("active")) {
                        filterSet.add(value);
                    } else {
                        filterSet.delete(value);
                    }
                    // Deactivate "All" when another filter is selected
                    $(filterClass + ' .all').removeClass("active");
                }

                updateURLParams();
                currentPage = 1;
                filterItems($(".input-wrapper .search").val().trim());
                updateBadges();
            }

            // Apply filters stored in the URL
            function applyURLFilters() {
                selectedYears.forEach(function (year) {
                    return $('#year li:contains(' + year + ')').addClass("active");
                });
                selectedTopics.forEach(function (topic) {
                    return $('#glossary_block li:contains(' + topic + ')').addClass("active");
                });
                selectedIndustries.forEach(function (industry) {
                    return $('#industry li:contains(' + industry + ')').addClass("active");
                });
                selectedProducts.forEach(function (product) {
                    return $('#product li:contains(' + product + ')').addClass("active");
                });
                filterItems(""); // Apply filters to show filtered items
                updateBadges(); // Update badges based on selected filters
            }

            $("#year li").click(function () {
                handleFilterClick(selectedYears, "#year li", this);
            });

            $("#glossary_block li").click(function () {
                handleFilterClick(selectedTopics, "#glossary_block li", this);
            });

            $("#industry li").click(function () {
                handleFilterClick(selectedIndustries, "#industry li", this);
            });

            $("#product li").click(function () {
                handleFilterClick(selectedProducts, "#product li", this);
            });

            // Update badges
            function updateBadges() {
                var fieldWrap = $(".field-wrap");
                fieldWrap.empty();
                selectedYears.forEach(function (year) {
                    return fieldWrap.append('<span class="filter-badge year">' + year + '</span>');
                });
                selectedTopics.forEach(function (topic) {
                    return fieldWrap.append('<span class="filter-badge topic">' + topic + '</span>');
                });
                selectedIndustries.forEach(function (industry) {
                    return fieldWrap.append('<span class="filter-badge industry">' + industry + '</span>');
                });
                selectedProducts.forEach(function (product) {
                    return fieldWrap.append('<span class="filter-badge product">' + product + '</span>');
                });
                fieldWrap.toggleClass("active", selectedYears.size > 0 || selectedTopics.size > 0 || selectedIndustries.size > 0 || selectedProducts.size > 0);
            }

            $(".field-wrap").on("click", ".filter-badge", function () {
                var value = $(this).text().trim();
                if ($(this).hasClass("year")) {
                    selectedYears.delete(value);
                    $('#year li:contains(' + value + ')').removeClass("active");
                } else if ($(this).hasClass("topic")) {
                    selectedTopics.delete(value);
                    $('#glossary_block li:contains(' + value + ')').removeClass("active");
                } else if ($(this).hasClass("industry")) {
                    selectedIndustries.delete(value);
                    $('#industry li:contains(' + value + ')').removeClass("active");
                } else if ($(this).hasClass("product")) {
                    selectedProducts.delete(value);
                    $('#product li:contains(' + value + ')').removeClass("active");
                }
                $(this).remove();
                updateURLParams();
                currentPage = 1;
                filterItems($(".input-wrapper .search").val().trim());
            });

            $(".clear-btn").click(function () {
                selectedYears.clear();
                selectedTopics.clear();
                selectedIndustries.clear();
                selectedProducts.clear();
                $(".input-wrapper .search").val('');
                $("#year li, #glossary_block li, #industry li, #product li").removeClass("active");
                $(".field-wrap").removeClass("active").empty();
                $(".clear-btn").removeClass("active");
                currentPage = 1;
                updateURLParams();
                filterItems("");
            });

            $(".input-wrapper .search").on("input", function () {
                currentPage = 1;
                filterItems($(this).val().trim());
            });

            $("#pagination-container").on("click", "li", function () {
                if ($(this).hasClass("disabled") || $(this).hasClass("active")) return;

                if ($(this).hasClass("prev")) {
                    currentPage--;
                } else if ($(this).hasClass("next")) {
                    currentPage++;
                } else {
                    currentPage = parseInt($(this).text());
                }

                updateURLParams();
                filterItems($(".input-wrapper .search").val().trim());
            });
            // Toggle navigation menu
            $(".resource-filter-new .outer-wrap .nav-wrapper .table-title").click(function () {
                if ($(this).parent().hasClass("active")) {
                    $(this).parent().removeClass("active");
                    $(this).parent().find(".list").slideUp(); // Close the list
                } else {
                    $(".nav-wrapper").removeClass("active");
                    $(".nav-wrapper").find(".list").slideUp(); // Close other lists
                    $(this).parent().addClass("active");
                    $(this).parent().find(".list").slideDown(); // Open the clicked list
                }
            });

            // Close filter lists if clicked outside
            $(document).on("click", function (e) {
                var container = $(".resource-filter-new .outer-wrap .nav-wrapper");
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    $(".resource-filter-new .outer-wrap .nav-wrapper").removeClass("active");
                    $('.resource-filter-new .outer-wrap .nav-wrapper .list').slideUp(); // Close all lists
                }
            });
        });
    }
})(jQuery);
'use strict';

(function () {
  var colTwoImgs = document.querySelectorAll('.nile-col-two-animation');
  if (colTwoImgs.length > 0) {
    var handleScrollingVideoBackgrounds = function handleScrollingVideoBackgrounds() {
      colTwoImgs.forEach(function (element) {
        var video = element.querySelector('video');
        var items = element.querySelectorAll('.col-two-img__item');
        if (video) {
          var topOfElement = element.getBoundingClientRect().top;
          var bottomOfElement = element.getBoundingClientRect().bottom;
          var startPoint = topOfElement;
          var endPoint = bottomOfElement - window.innerHeight;
          var animateDistance = endPoint - startPoint;
          var animateRatio = -1 * startPoint / animateDistance;
          if (animateRatio > 1) {
            animateRatio = 1;
          } else if (animateRatio < 0) {
            animateRatio = 0;
          }
          var contentFadeDuration = 300;
          if (768 > window.innerWidth) {
            jQuery(items[0]).fadeIn(1);
            items[0].classList.remove('fade-out');
            items[0].classList.remove('down');
            jQuery(items[1]).fadeIn(1);
            items[1].classList.remove('faded-out');
            items[1].classList.remove('down');
            jQuery(items[2]).fadeIn(1);
            items[2].classList.remove('faded-out');
            items[2].classList.remove('down');
          } else {
            if (animateRatio <= 0.33) {
              jQuery(items[0]).fadeIn(contentFadeDuration);
              items[0].classList.remove('faded-out');
              items[0].classList.remove('down');
              jQuery(items[1]).fadeOut(contentFadeDuration);
              items[1].classList.add('faded-out');
              items[1].classList.add('down');
              jQuery(items[2]).fadeOut(contentFadeDuration);
              items[2].classList.add('faded-out');
              items[2].classList.add('down');
            } else if (animateRatio <= 0.67) {
              jQuery(items[0]).fadeOut(contentFadeDuration);
              items[0].classList.add('faded-out');
              items[0].classList.remove('down');
              jQuery(items[1]).fadeIn(contentFadeDuration);
              items[1].classList.remove('faded-out');
              items[1].classList.remove('down');
              jQuery(items[2]).fadeOut(contentFadeDuration);
              items[2].classList.add('faded-out');
              items[2].classList.add('down');
            } else {
              jQuery(items[0]).fadeOut(contentFadeDuration);
              items[0].classList.add('faded-out');
              items[0].classList.remove('down');
              jQuery(items[1]).fadeOut(contentFadeDuration);
              items[1].classList.add('faded-out');
              items[1].classList.remove('down');
              jQuery(items[2]).fadeIn(contentFadeDuration);
              items[2].classList.remove('faded-out');
              items[2].classList.remove('down');
            }
          }
          if (isNaN(video.duration)) {
            video.currentTime = 0;
          } else {
            video.currentTime = video.duration * animateRatio;
          }
        }
      });
    };
    window.addEventListener('scroll', handleScrollingVideoBackgrounds);
    window.addEventListener('resize', handleScrollingVideoBackgrounds);
    window.addEventListener('DOMContentLoaded', handleScrollingVideoBackgrounds);
  }
})();
'use strict';

(function ($) {
    var a = 0;
    $(window).on('load scroll', function () {
        if ($('.statistics #counter').length > 0) {
            var oTop = $('.statistics #counter').offset().top - window.innerHeight;
        }
        if (a == 0 && $(window).scrollTop() > oTop) {
            $('.statistics .counter-value').each(function () {
                var $this = $(this),
                    symbol = $this.siblings("span").text().length,
                    countTo = $this.attr('data-count');
                var count_val = countTo.replace(',', '');
                var thisText = $this.text();
                if (symbol === 0) {
                    thisText = thisText + "x";
                }
                var counter_text = count_val.match(/[a-zA-Z$]+/);
                var counter_val = count_val.match(/[\d\.]+/);
                var final_val = Math.round(counter_val);
                $({
                    countNum: thisText
                }).animate({
                    countNum: final_val
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function step() {
                        $this.text(counter_text + Math.floor(this.countNum));
                    },
                    complete: function complete() {
                        $this.text(countTo);
                    }
                });
            });
            a = 1;
        }
    });
})(jQuery);
'use strict';

(function ($) {
    var a = 0;
    $(window).on('load scroll', function () {
        if ($('.static').length > 0) {
            var oTop = $('.static').offset().top - window.innerHeight;
        }
        if (a == 0 && $(window).scrollTop() > oTop) {
            $('.static .static-block .count').each(function () {
                var $this = $(this),
                    symbol = $this.siblings("span").text().length,
                    countTo = $this.attr('data-count');
                var count_val = countTo.replace(',', '');
                var thisText = $this.text();
                if (symbol === 0) {
                    thisText = thisText + "x";
                }
                var counter_text = count_val.match(/[a-zA-Z$]+/);
                var counter_val = count_val.match(/[\d\.]+/);
                var final_val = Math.round(counter_val);
                $({
                    countNum: thisText
                }).animate({
                    countNum: final_val
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function step() {
                        $this.text(counter_text + Math.floor(this.countNum));
                    },
                    complete: function complete() {
                        $this.text(countTo);
                    }
                });
            });
            a = 1;
        }
    });
})(jQuery);
"use strict";
'use strict';

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
'use strict';

// Use $ instead of $ without replacing global $
(function ($) {
    $(document).ready(function () {
        $(window).scroll(function () {
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
"use strict";

(function () {
    var videoOverlay = document.querySelector(".hero-banner .banner-video-overlay");
    var playButton = document.querySelector(".hero-banner .play-icon");
    var closeButton = document.querySelector(".hero-banner .banner-video-overlay .close-btn");
    var iframe = document.querySelector(".hero-banner .banner-video-overlay iframe");
    var overlay = document.querySelector(".hero-banner .banner-video-overlay .overlay");

    if (iframe) {
        var url = document.querySelector(".play-icon").getAttribute("data-src");
        var videoSrc = url + "?autoplay=1";

        playButton.addEventListener("click", function () {
            videoOverlay.classList.add("active");
            setAttributes(iframe, { src: videoSrc });
        });

        closeButton.addEventListener("click", function () {
            videoOverlay.classList.toggle("active");

            if (iframe.hasAttribute("src")) {
                iframe.removeAttribute("src");
            }
        });

        overlay.addEventListener("click", function () {
            videoOverlay.classList.remove("active");

            if (iframe.hasAttribute("src")) {
                iframe.removeAttribute("src");
            }
        });
    }

    //Multiple Attribute Function
    function setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    window.scrollTo(0, 0);
})();
'use strict';

(function ($) {
    // Navigate through the tabs and active the current selected
    $(document).ready(function () {
        $('.info-with-tabs').each(function () {
            $(this).find('.icon-with-heading').matchHeight();
            $(this).find('.icon-with-heading').click(function () {

                var winWidth = $(window).width();

                if (winWidth >= 768) {
                    var tab_selected = $(this).attr('data-tab');
                    $(this).parents('.info-with-tabs').find('.icon-with-heading').removeClass('hide');
                    $(this).parents('.info-with-tabs').find('.tab-text').removeClass('hide');
                    $(this).addClass('hide').siblings().removeClass('hide');
                    $(this).parents('.info-with-tabs').find("#" + tab_selected).addClass('hide');
                }
            });
        });
    });
    // Show tabs nav above 767px screen
    $(window).on("resize", function (e) {
        $('.info-with-tabs').each(function () {
            var winWidth = $(window).width();
            if (winWidth > 767) {
                $(this).find('.scroll-wrap').show();
            }
        });
    });

    //For Responsive tabs --> Click functionality
    $(document).ready(function () {
        $('.info-with-tabs').each(function () {
            $(this).find('.icon-with-heading').click(function () {

                var winWidth = $(window).width();

                if (winWidth <= 767) {
                    var tab_selected = $(this).attr('data-tab');
                    var selected_text = $(this).html();

                    $(this).parents('.info-with-tabs').find('.icon-with-heading').removeClass('hide');
                    $(this).parents('.info-with-tabs').find('.tab-text').removeClass('hide');
                    $(this).addClass('hide');
                    $(this).parents('.info-with-tabs').find("#" + tab_selected).addClass('hide');
                    $(this).parents('.info-with-tabs').find('.open .cover').html(selected_text);
                    $(this).parents('.info-with-tabs').find('.open').removeClass('active');
                    $(this).parents('.info-with-tabs').find('.scroll-wrap').slideUp();
                }
            });
            $(this).find('.open').click(function () {
                var winWidth = $(window).width();
                if (winWidth < 768) {
                    $(this).parents('.info-with-tabs').find('.open').toggleClass('active');
                    $(this).parents('.info-with-tabs').find('.scroll-wrap').slideToggle();
                }
            });
        });
    });

    $(window).on("load", function () {
        // wrappBlock();
        load_OnReady();
    });

    function load_OnReady() {
        var winWidth = $(window).width();
        if (winWidth >= 768) {
            $("body .seven-plus-items .slider").slick({
                infinite: true,
                slidesToShow: 7,
                slidesToScroll: 1,
                autoplay: false,
                dots: false,
                arrows: true,
                draggable: true
            });
            $(window).on("load resize", function (e) {
                $("body .seven-plus-items .items").css({ "opacity": 1 });
            });
        }
    };
})(jQuery);
"use strict";

(function ($) {
    $(document).ready(function () {
        $(window).on('load resize', function () {
            $(".intro-with-col-two .outer-wrap").css({ opacity: "1" });
            var winWidth = $(window).width();
            if (winWidth <= 767) {
                $(".intro-with-col-two .slider").slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrow: false,
                    dots: true,
                    speed: 500,
                    adaptiveHeight: true,
                    autoplay: false,
                    infinite: false,
                    responsive: [{
                        breakpoint: 595,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            adaptiveHeight: true
                        }
                    }]
                });
            }
        });
    });
})(jQuery);
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var introWithTab = document.querySelector(".intro-with-tab");
  if (introWithTab) {
    var slideUp = function slideUp(element) {
      element.animate([{ height: element.scrollHeight + "px" }, { height: "0" }], {
        duration: animationDuration,
        easing: "ease"
      }).onfinish = function () {
        element.style.height = "0";
        element.style.display = "none"; // Hide after animation
      };
    };

    var slideDown = function slideDown(element) {
      element.style.display = "block"; // Show before animation
      element.animate([{ height: "0" }, { height: element.scrollHeight + "px" }], {
        duration: animationDuration,
        easing: "ease"
      }).onfinish = function () {
        element.style.height = element.scrollHeight + "px";
      };
    };

    var tabs = document.querySelectorAll(".intro-with-tab .tab-div .text-wrapper");
    var contents = document.querySelectorAll(".intro-with-tab .tab-text .img-wrap");
    var mobileContent = document.querySelector(".intro-with-tab .row .content");
    var dropDown = document.querySelector(".intro-with-tab button.open");
    var dropDownText = dropDown.querySelector("span");
    var contentWrap = document.querySelector(".intro-with-tab .content-wrap");
    var animationDuration = 500;
    if (tabs.length > 0 && contents.length > 0) {
      tabs[0].classList.add("active");
      contents[0].classList.add("active");
      // dropDownText = tabs[0].textContent;
      console.log(tabs);
      // Copy the first tab"s text to drop-down span and hidden content
      var tabHeading = tabs[0].querySelector(".arrow-wrap");
      var innerWrap = tabs[0].querySelector(".inner-wrapper");
      var firstTabText = tabHeading.textContent;
      var firstTabContent = innerWrap.innerHTML;
      var firstHeading = tabHeading.innerHTML;
      //dropDownText.textContent = firstTabText;
      mobileContent.innerHTML = firstHeading + firstTabContent;
      innerWrap.style.height = "auto";
      innerWrap.style.display = "block";
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        var target = this.querySelector(".inner-wrapper");
        document.querySelectorAll(".inner-wrapper").forEach(function (child) {
          if (child !== target) {
            slideUp(child);
          }
        });
        slideDown(target);
        // Remove active class from all tabs and contents
        tabs.forEach(function (tab) {
          return tab.classList.remove("active");
        });
        contents.forEach(function (content) {
          return content.classList.remove("active");
        });
        // Add active class to the clicked tab and corresponding content
        tab.classList.add("active");
        contents[index].classList.add("active");
        dropDown.classList.remove("active");
        // Copy tab text to drop-down span and hidden content
        var tabHeading = tab.querySelector(".arrow-wrap");
        var headingWrap = tab.querySelector(".arrow-wrap");
        var innerWrap = tab.querySelector(".inner-wrapper");
        var tabText = tabHeading.textContent;
        //dropDownText.textContent = tabText;
        var tabContent = innerWrap.innerHTML;
        var headingContent = headingWrap.innerHTML;
        //mobileContent.innerHTML = tabContent;
        mobileContent.innerHTML = headingContent + tabContent;
        if (contentWrap.classList.contains("active")) {
          contentWrap.classList.remove("active");
        }
      });
    });
    dropDown.addEventListener("click", function () {
      contentWrap.classList.toggle("active");
      dropDown.classList.toggle("active");
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var introWithTab = document.querySelector(".content-with-toggle");
  if (introWithTab) {

    // Slide up function (to hide content)
    var slideUp = function slideUp(element) {
      element.animate([{ height: element.scrollHeight + "px" }, { height: "0" }], {
        duration: animationDuration,
        easing: "ease"
      }).onfinish = function () {
        element.style.height = "0";
        element.style.display = "none"; // Hide after animation
      };
    };

    // Slide down function (to show content)


    var slideDown = function slideDown(element) {
      element.style.display = "block"; // Show before animation
      element.animate([{ height: "0" }, { height: element.scrollHeight + "px" }], {
        duration: animationDuration,
        easing: "ease"
      }).onfinish = function () {
        element.style.height = element.scrollHeight + "px";
      };
    };

    var tabs = document.querySelectorAll(".content-with-toggle .tab-div .text-wrapper");
    var contents = document.querySelectorAll(".content-with-toggle .tab-text .img-wrap");
    var mobileContent = document.querySelector(".content-with-toggle .row .content");
    var dropDown = document.querySelector(".content-with-toggle button.open");
    var dropDownText = dropDown.querySelector("span");
    var contentWrap = document.querySelector(".content-with-toggle .content-wrap");
    var animationDuration = 500;

    // Make the first tab and content active by default
    if (tabs.length > 0 && contents.length > 0) {
      tabs[0].classList.add("active");
      contents[0].classList.add("active");

      var tabHeading = tabs[0].querySelector(".arrow-wrap");
      var innerWrap = tabs[0].querySelector(".inner-wrapper");
      var firstTabText = tabHeading.textContent;
      var firstTabContent = innerWrap.innerHTML;
      var firstHeading = tabHeading.innerHTML;

      mobileContent.innerHTML = firstHeading + firstTabContent;
      innerWrap.style.height = "auto";
      innerWrap.style.display = "block";
    }

    tabs.forEach(function (tab, index) {
      // Use mouseenter instead of mouseover for better hover control
      tab.addEventListener("mouseenter", function () {
        // Check if the tab is already active; if active, do nothing
        if (tab.classList.contains("active")) {
          return;
        }

        // Remove active class from all tabs and contents
        tabs.forEach(function (t, i) {
          t.classList.remove("active");
          contents[i].classList.remove("active");

          // Slide up the previous tab content
          var previousInnerWrap = t.querySelector(".inner-wrapper");
          if (previousInnerWrap && previousInnerWrap.style.display === "block") {
            slideUp(previousInnerWrap);
          }
        });

        // Activate the current tab and content
        tab.classList.add("active");
        contents[index].classList.add("active");

        // Slide down the current tab content
        var targetInnerWrap = tab.querySelector(".inner-wrapper");
        slideDown(targetInnerWrap);

        // Copy tab text to the mobile content
        var tabHeading = tab.querySelector(".arrow-wrap");
        var innerWrap = tab.querySelector(".inner-wrapper");
        var tabContent = innerWrap.innerHTML;
        var headingContent = tabHeading.innerHTML;
        mobileContent.innerHTML = headingContent + tabContent;

        // Close the dropdown if open
        if (contentWrap.classList.contains("active")) {
          contentWrap.classList.remove("active");
        }
      });
    });

    // Toggle dropdown visibility
    dropDown.addEventListener("click", function () {
      contentWrap.classList.toggle("active");
      dropDown.classList.toggle("active");
    });
  }
});
'use strict';

(function ($) {
    // Begin jQuery
    $(function () {
        // DOM ready
        // If a link has a dropdown, add sub menu toggle.
        $('nav ul li a:not(:only-child)').click(function (e) {
            $(this).siblings('.nav-dropdown').toggle();
            // Close one dropdown when selecting another
            $('.nav-dropdown').not($(this).siblings()).hide();
            e.stopPropagation();
        });
        // Clicking away from dropdown will remove the dropdown class
        $('html').click(function () {
            $('.nav-dropdown').hide();
        });
        // Toggle open and close nav styles on click
        $('#nav-toggle').click(function () {
            $('nav ul').slideToggle();
        });
        // Hamburger to X toggle
        $('#nav-toggle').on('click', function () {
            this.classList.toggle('active');
        });
    }); // end DOM ready
})(jQuery); // end jQuery
'use strict';

// const off = 60;
// let l = off;
// const marqueeElements = Array.from(document.querySelectorAll('.new-logo-slider .marquee .item'));
// const speed = 2;
// const stack = [];
// let pause = false;

// marqueeElements.forEach(element => {
//     const width = element.offsetWidth + off;
//     element.style.left = `${l}px`;
//     l += width;
//     stack.push(element);
// });

// function moveMarquee() {
//     if (!pause) {
//         marqueeElements.forEach(element => {
//             const currentLeft = parseFloat(getComputedStyle(element).left);
//             const newLeft = currentLeft - speed;
//             element.style.left = `${newLeft}px`;

//             if (newLeft + element.offsetWidth < -130) {
//                 const firstElement = stack.shift();
//                 const lastElement = stack[stack.length - 1];
//                 element.style.left = `${parseFloat(getComputedStyle(lastElement).left) + lastElement.offsetWidth + off}px`;
//                 stack.push(element);
//             }
//         });
//     }
//     requestAnimationFrame(moveMarquee);
// }

// requestAnimationFrame(moveMarquee);

// const marqueeContainer = document.querySelector('.marquee');
// marqueeContainer.addEventListener('mouseHover', () => {
//     // pause = true;
//     pause = false;
// });
// marqueeContainer.addEventListener('mouseout', () => {
//     pause = false;
// });

//logo-with-carousel

// (function ($) {
//     $(document).ready(function () {
//         const initializeSliders = function () {
//             const getSection = $('.logo-with-carousel');

//             if (getSection.length) {
//                 const logosLarge = $('.logo-with-carousel .wrapper');

//                 // Destroy any previous instances of Slick only if initialized
//                 if (logosLarge.hasClass('slick-initialized')) {
//                     logosLarge.slick('unslick');
//                 }

//                 // Reinitialize the sliders
//                 logosLarge.slick({
//                     dots: false,
//                     infinite: true,
//                     arrows: false,
//                     autoplay: true,
//                     autoplaySpeed: 20,
//                     adaptiveHeight: true,
//                     speed: 8000,
//                     cssEase: "linear",
//                     centerPadding: "100px",
//                     slidesToShow: 4,
//                     pauseOnHover: false,

//                     responsive: [
//                         {
//                             breakpoint: 1025,
//                             settings: {
//                                 slidesToShow: 3
//                             }
//                         },
//                         {
//                             breakpoint: 991,
//                             settings: {
//                                 slidesToShow: 3,
//                                 speed: 9000
//                             }
//                         },
//                         {
//                             breakpoint: 595,
//                             settings: {
//                                 slidesToShow: 2,
//                                 speed: 9000
//                             }
//                         }
//                     ]
//                 });
//             }
//         };


//         let resizeTimer;
//         const debounceResize = function (func, delay) {
//             clearTimeout(resizeTimer);
//             resizeTimer = setTimeout(func, delay);
//         };


//         initializeSliders();


//         $(window).resize(function () {
//             debounceResize(initializeSliders, 250); 
//         });
//     });
// })(jQuery);
document.addEventListener("DOMContentLoaded", function () {
    // Initialize sliders
    var initializeSliders = function initializeSliders() {
        var getSection = document.querySelector('.logo-with-carousel');

        if (getSection) {
            var logosLarge = document.querySelector('.logo-with-carousel .wrapper');

            // Destroy previous instances of Slick if initialized
            if (logosLarge.classList.contains('slick-initialized')) {
                $(logosLarge).slick('unslick'); // Use Slick's destroy method
            }

            // Reinitialize the sliders
            $(logosLarge).slick({
                dots: false,
                infinite: true,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 20,
                adaptiveHeight: true,
                speed: 8000,
                cssEase: "linear",
                centerPadding: "100px",
                slidesToShow: 4,
                pauseOnHover: false,

                responsive: [{
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        speed: 9000
                    }
                }, {
                    breakpoint: 595,
                    settings: {
                        slidesToShow: 2,
                        speed: 9000
                    }
                }]
            });
        }
    };

    // Debounce function to limit how often resize logic is executed
    var resizeTimer = void 0;
    var debounceResize = function debounceResize(func, delay) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(func, delay);
    };

    // Initialize sliders on document ready
    initializeSliders();

    // Reinitialize sliders on window resize with debounce
    window.addEventListener("resize", function () {
        debounceResize(initializeSliders, 250); // 250ms delay for smoothness
    });
});
// document.addEventListener('DOMContentLoaded', () => {
//   // Unix timestamp (in seconds) to count down to
//   var twoDaysFromNow = (new Date().getTime() / 1000) + (86400 * 2) + 1;
//   // Set up FlipDown
//   var flipdown = new FlipDown(twoDaysFromNow)
//     // Start the countdown
//     .start()
//     // Do something when the countdown ends
//     .ifEnded(() => {
//       console.log('The countdown has ended!');
//     });
//   // Toggle theme
//   var interval = setInterval(() => {
//     let body = document.body;
//     body.classList.toggle('light-theme');
//     body.querySelector('#flipdown').classList.toggle('flipdown__theme-dark');
//     body.querySelector('#flipdown').classList.toggle('flipdown__theme-light');
//   }, 5000);
//   // Show version number
//   var ver = document.getElementById('ver');
//   ver.innerHTML = flipdown.version;
// });
"use strict";
// (function ($) {
//   $(document).ready(function () {
//       $(".page-overlay .accordion-item").click(function () {
//           if ($(this).hasClass("active")) {
//               $(this).removeClass("active");
//               $(this).children(".accordion-content").slideUp();
//           } else {
//               $(".accordion-item").removeClass("active");
//               $(".accordion-item").children(".accordion-content").slideUp();
//               $(this).addClass("active");
//               $(this).children(".accordion-content").slideDown();
//           }
//       });

//       $(document).on("click", ".page-overlay .arrow1", function () {
//           $(this).toggleClass("active");
//       });
//   });
// })(jQuery);
"use strict";
// (function ($) {
//     $(document).ready(function () {
//         let jsonData = [];
//         let selectedYears = new Set();
//         let selectedTopics = new Set();
//         const maxItems = 9;
//         let currentPage = 1;


//         // Helper function to update the URL based on selected filters and page number
//         function updateURLParams() {
//             const url = new URL(window.location);
//             url.searchParams.delete("year");
//             url.searchParams.delete("topic");

//             // Only set the page number if it's greater than 1
//             if (currentPage > 1) {
//                 url.searchParams.set("page", currentPage);  // Update page number in URL
//             } else {
//                 url.searchParams.delete("page"); // Remove page parameter if currentPage is 1
//             }

//             selectedYears.forEach(year => url.searchParams.append("year", year));
//             selectedTopics.forEach(topic => url.searchParams.append("topic", topic));

//             window.history.replaceState({}, '', url);
//         }

//         // Helper function to read filters and page number from URL
//         function loadFiltersFromURL() {
//             const urlParams = new URLSearchParams(window.location.search);
//             selectedYears = new Set(urlParams.getAll("year"));
//             selectedTopics = new Set(urlParams.getAll("topic"));
//             currentPage = parseInt(urlParams.get("page")) || 1;  // Set page from URL or default to 1
//         }

//         // Hide no-result on page load
//         $(".no-result").removeClass("active");

//         // Fetch JSON data and display it in the container
//         $.getJSON("/ajayverma/json/resource-filter.json", function (data) {
//             jsonData = data;
//             const parentDiv = $('.resource-filter .filter-content-wrap .inner-wrap');
//             parentDiv.empty();
//             data.forEach(item => {
//                 const itemWrap = $(`
//                     <div class="item-wrap">
//                         <div class="content-inner">
//                             <div class="img-wrap">
//                                 <img src="${item.imgSource}" alt="Manage banner">
//                             </div>
//                             <div class="body-content">
//                                 <h6>${item.year} | ${item.topic}</h6>
//                                 <h4>${item.title}</h4>
//                                 <p>${item.description}</p>
//                             </div>
//                         </div>
//                     </div>
//                 `);
//                 parentDiv.append(itemWrap);
//             });

//             // Initialize filters from URL if available
//             loadFiltersFromURL();
//             applyURLFilters();
//             filterItems("");
//         });

//         function filterItems(searchText) {
//             let itemsToShow = $(".item-wrap");

//             // Filter by selected years
//             if (selectedYears.size > 0) {
//                 itemsToShow = itemsToShow.filter(function () {
//                     const itemYear = $(this).find("h6").text().trim().split(' ')[0];
//                     return selectedYears.has(itemYear);
//                 });
//             }

//             // Filter by selected topics
//             if (selectedTopics.size > 0) {
//                 itemsToShow = itemsToShow.filter(function () {
//                     const itemTopic = $(this).find("h6").text().trim().split('|')[1].trim();
//                     return selectedTopics.has(itemTopic);
//                 });
//             }

//             // Filter by search text
//             if (searchText) {
//                 itemsToShow = itemsToShow.filter(function () {
//                     const itemText = $(this).find(".body-content h4").text().toLowerCase();
//                     return itemText.includes(searchText.toLowerCase());
//                 });
//             }

//             $(".item-wrap").hide();
//             const totalItems = itemsToShow.length;
//             const totalPages = Math.ceil(totalItems / maxItems);
//             const start = (currentPage - 1) * maxItems;
//             const end = start + maxItems;

//             itemsToShow.slice(start, end).show();
//             $(".pagination-button").toggle(totalItems > maxItems);

//             $(".no-result").toggleClass("active", totalItems === 0);
//             updatePaginationButtons(totalPages);
//             $(".clear-btn").toggleClass("active", selectedYears.size > 0 || selectedTopics.size > 0 || searchText !== "");
//         }

//         function updatePaginationButtons(totalPages) {
//             let paginationHTML = `<li class="prev ${currentPage === 1 ? 'disabled' : ''}"><svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.0332 11.4861L0.99991 6.24307L6.0332 1.00006" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.6318 6.24304L1 6.24304" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></li>`;
//             for (let i = 1; i <= totalPages; i++) {
//                 paginationHTML += `<li class="${i === currentPage ? 'active' : ''}">${i}</li>`;
//             }
//             paginationHTML += `<li class="next ${currentPage === totalPages ? 'disabled' : ''}"><svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.59827 11.8596L14.6316 6.61661L9.59827 1.37359" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 6.61658L14.6318 6.61658" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></li>`;
//             $("#pagination-container").html(paginationHTML);
//         }

//         // Handle pagination click events
//         $("#pagination-container").on("click", "li", function () {
//             if ($(this).hasClass("disabled") || $(this).hasClass("active")) return;
//             if ($(this).hasClass("prev")) currentPage--;
//             else if ($(this).hasClass("next")) currentPage++;
//             else currentPage = parseInt($(this).text());

//             updateURLParams(); // Update URL on page change

//             const searchText = $(".input-wrapper .search").val().trim();
//             filterItems(searchText);
//             $('html, body').animate({ scrollTop: $('.resource-filter').offset().top }, 500);
//         });

//         // Apply filters based on URL parameters
//         function applyURLFilters() {
//             selectedYears.forEach(year => $(`#year li:contains(${year})`).addClass("active"));
//             selectedTopics.forEach(topic => $(`#glossary_block li:contains(${topic})`).addClass("active"));
//             filterItems("");
//             updateBadges();
//         }

//         // Event listeners for Year and Topic filters
//         $("#year li").click(function () {
//             const year = $(this).text().trim();
//             if (year === "All") {
//                 selectedYears.clear();
//                 $("#year li").removeClass("active");
//                 $(this).addClass("active");
//             } else {
//                 $(this).toggleClass("active");
//                 $(this).hasClass("active") ? selectedYears.add(year) : selectedYears.delete(year);
//                 $("#year .all").removeClass("active");
//             }

//             updateURLParams();
//             currentPage = 1;
//             filterItems($(".input-wrapper .search").val().trim());
//             updateBadges();
//         });

//         $("#glossary_block li").click(function () {
//             const topic = $(this).text().trim();
//             if (topic === "All") {
//                 selectedTopics.clear();
//                 $("#glossary_block li").removeClass("active");
//                 $(this).addClass("active");
//             } else {
//                 $(this).toggleClass("active");
//                 $(this).hasClass("active") ? selectedTopics.add(topic) : selectedTopics.delete(topic);
//                 $("#glossary_block .all").removeClass("active");
//             }

//             updateURLParams();
//             currentPage = 1;
//             filterItems($(".input-wrapper .search").val().trim());
//             updateBadges();
//         });

//         // Badge update for filters
//         function updateBadges() {
//             const fieldWrap = $(".field-wrap");
//             fieldWrap.empty();
//             selectedYears.forEach(year => fieldWrap.append(`<span class="filter-badge year">${year}</span>`));
//             selectedTopics.forEach(topic => fieldWrap.append(`<span class="filter-badge topic">${topic}</span>`));
//             fieldWrap.toggleClass("active", selectedYears.size > 0 || selectedTopics.size > 0);
//         }

//         // Remove badge and update filter
//         $(".field-wrap").on("click", ".filter-badge", function () {
//             const value = $(this).text().trim();
//             if ($(this).hasClass("year")) {
//                 selectedYears.delete(value);
//                 $(`#year li:contains(${value})`).addClass("active");
//             } else if ($(this).hasClass("topic")) {
//                 selectedTopics.delete(value);
//                 $(`#glossary_block li:contains(${value})`).removeClass("active");
//             }

//             $(this).remove();
//             if (!$(".field-wrap .filter-badge").length) {
//                 $(".field-wrap").removeClass("active");
//             }

//             updateURLParams();
//             currentPage = 1;
//             const searchText = $(".input-wrapper .search").val().trim();
//             filterItems(searchText);
//         });

//         $(".clear-btn").click(function () {
//             selectedYears.clear();
//             selectedTopics.clear();
//             currentPage = 1;
//             $(".input-wrapper .search").val("");
//             $("#year li, #glossary_block li").removeClass("active");
//             $(".field-wrap").empty().removeClass("active");
//             updateURLParams();
//             filterItems("");
//             $(this).removeClass("active");
//         });

//         $(".input-wrapper .search").on("input", function () {
//             currentPage = 1;
//             filterItems($(this).val().trim());
//         });

//         // Toggle filter lists (Year/Product)
//         $(".resource-filter .outer-wrap .nav-wrapper .table-title").click(function () {
//             if ($(this).parent().hasClass("active")) {
//                 $(this).parent().removeClass("active");
//                 $(this).parent().find(".list").slideUp();
//             } else {
//                 $(".nav-wrapper").removeClass("active");
//                 $(".nav-wrapper").find(".list").slideUp();
//                 $(this).parent().addClass("active");
//                 $(this).parent().find(".list").slideDown();
//             }
//         });

//         // Close filter lists on click outside
//         $(document).on("click", function (e) {
//             var container = $(".resource-filter .outer-wrap .nav-wrapper");
//             if (!container.is(e.target) && container.has(e.target).length === 0) {
//                 $(".resource-filter .outer-wrap .nav-wrapper").removeClass("active");
//                 $('.resource-filter .outer-wrap .nav-wrapper .list').slideUp();
//             }
//         });
//     });
// })(jQuery);
"use strict";
"use strict";

// // Use $ instead of jQuery without replacing global $
(function ($) {
  $(document).ready(function () {
    $(".socure-logo-slider .slider-wrap").css("opacity", "1");
    $(".socure-logo-slider .slider-outer").each(function () {
      $(this).find(".slider-wrap").slick({
        dots: false,
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 20,
        adaptiveHeight: true,
        speed: 5500,
        cssEase: "linear",
        centerPadding: "10px",
        slidesToShow: 5,
        pauseOnHover: false,
        draggable: false,
        useTransform: true,
        swipe: false,
        touchMove: false,
        responsive: [{
          breakpoint: 1601,
          settings: {
            slidesToShow: 4
          }
        }, {
          breakpoint: 596,
          settings: {
            slidesToShow: 2
          }
        }]
      });
    });
  });
})(jQuery);
// var createjs, AdobeAn;

// (function (cjs, an) {

//     var p; // shortcut to reference prototypes
//     var lib={};var ss={};var img={};
//     lib.ssMetadata = [
//             {name:"Splunk_Marketecture_mobile_R2_atlas_1", frames: [[2930,1590,163,78],[3503,1453,169,78],[0,0,1222,683],[1224,0,1222,683],[2448,0,1222,683],[0,685,1222,683],[1224,685,1222,683],[2448,685,1222,683],[0,1370,1222,683],[1224,1370,1222,683],[3117,1480,182,108],[3301,1480,182,108],[3316,1370,185,108],[2930,1480,185,108],[3503,1370,164,81],[3485,1533,161,81],[2930,1370,384,108],[2448,1370,480,320]]}
//     ];


//     (lib.AnMovieClip = function(){
//         this.actionFrames = [];
//         this.ignorePause = false;
//         this.gotoAndPlay = function(positionOrLabel){
//             cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
//         }
//         this.play = function(){
//             cjs.MovieClip.prototype.play.call(this);
//         }
//         this.gotoAndStop = function(positionOrLabel){
//             cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
//         }
//         this.stop = function(){
//             cjs.MovieClip.prototype.stop.call(this);
//         }
//     }).prototype = p = new cjs.MovieClip();
//     // symbols:


//     (lib.CachedBmp_10 = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(0);
//     }).prototype = p = new cjs.Sprite();


//     (lib.CachedBmp_9 = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(1);
//     }).prototype = p = new cjs.Sprite();


//     (lib.bottom_bg = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(2);
//     }).prototype = p = new cjs.Sprite();


//     (lib.data = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(3);
//     }).prototype = p = new cjs.Sprite();


//     (lib.platform_hover1a = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(4);
//     }).prototype = p = new cjs.Sprite();


//     (lib.platform_static1a = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(5);
//     }).prototype = p = new cjs.Sprite();


//     (lib.platform_static1b = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(6);
//     }).prototype = p = new cjs.Sprite();


//     (lib.platform_static1c = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(7);
//     }).prototype = p = new cjs.Sprite();


//     (lib.shadow13a = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(8);
//     }).prototype = p = new cjs.Sprite();


//     (lib.shadow4a = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(9);
//     }).prototype = p = new cjs.Sprite();


//     (lib.top_comm_built1 = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(10);
//     }).prototype = p = new cjs.Sprite();


//     (lib.top_comm_built1_hover = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(11);
//     }).prototype = p = new cjs.Sprite();


//     (lib.top_cust_built1 = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(12);
//     }).prototype = p = new cjs.Sprite();


//     (lib.top_cust_built1_hover = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(13);
//     }).prototype = p = new cjs.Sprite();


//     (lib.top_observ1 = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(14);
//     }).prototype = p = new cjs.Sprite();


//     (lib.top_security1 = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(15);
//     }).prototype = p = new cjs.Sprite();


//     (lib.top_splunk_built1 = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(16);
//     }).prototype = p = new cjs.Sprite();


//     (lib.white_soft_edge1 = function() {
//         this.initialize(ss["Splunk_Marketecture_mobile_R2_atlas_1"]);
//         this.gotoAndStop(17);
//     }).prototype = p = new cjs.Sprite();
//     // helper functions:

//     function mc_symbol_clone() {
//         var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
//         clone.gotoAndStop(this.currentFrame);
//         clone.paused = this.paused;
//         clone.framerate = this.framerate;
//         return clone;
//     }

//     function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
//         var prototype = cjs.extend(symbol, cjs.MovieClip);
//         prototype.clone = mc_symbol_clone;
//         prototype.nominalBounds = nominalBounds;
//         prototype.frameBounds = frameBounds;
//         return prototype;
//         }


//     (lib.top_splunk = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Isolation_Mode
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#141D29").s().p("AEMA4QgKgGgHgMQgCgMAAgOIAAhFIAZAAIAABFQAAALAFAJQAHAIAKAAQALAAAHgIQAFgGAAgOIAAhFIAZAAIAABFQAAANgFANQgEAJgMAJQgJAGgTAAQgTAAgIgGgAj6A4QgJgGgHgMQgCgQAAgKIAAhFIAZAAIAABFQAAALAFAJQAGAIAMAAQALAAAHgIQAFgGAAgOIAAhFIAZAAIAABFQAAANgFANQgEAJgMAJQgKAGgSAAQgTAAgKgGgAGfA9IAAh1IAZAAIAABfIA1AAIAAAWgAlmA9IAAh1IAZAAIAABfIA0AAIAAAWgAIIA8IAAhfIgiAAIAAgWIBdAAIAAAWIgiAAIAABfgAFwg4IAZAAIAAB0IgZAAgAgcg4IAYAAIAAA2IAqg2IAcAAIgvA4IA0A8IggAAIgrg3IAAA3IgYAAgAiWg4IAYAAIAyBOIAAhOIAXAAIAAB0IgXAAIgyhOIAABOIgYAAgAnRA8IAAh0IAtAAQAWAAALALQALALAAARQAAAQgLALQgMALgVAAIgUAAIAAAngAm5ABIASAAQALAAAEgDQAFgFAAgKQAAgKgHgEQgCgFgLAAIgSAAgAo2AyQgLgIgBgTIAZAAQAEASATAAIAKgBIAIgFQADgDAAgGQAAgGgEgEQgJgEgFgBIgKgCQgmgGAAgcQAAgLAGgJQAGgIAKgEQAJgEAOAAQANAAAKAEQAKAFAGAIQAFAHACANIgbAAQgDgIgEgEQgGgEgHAAQgHAAgHADQgGAEAAAHQAAAEADAEQAEAEAJABIAKACQATADALAIQAJAJAAAOQAAANgGAHQgFAJgLAEQgJAEgPAAQgWAAgMgKgACMA7IAAhzIAwAAQAPAAAIAEQAKAGADAFQAEAGAAAKQAAAIgEAGQgEAHgJADQAKACAFAIQAFAIAAAJQAAAPgKAJQgKAJgVAAgACmAnIAXAAQALAAADgEQADgFAAgGQAAgHgFgEQgCgEgKAAIgXAAgAClgJIAXAAQAJAAADgEQAEgEAAgGQAAgGgEgEQgFgDgHAAIgXAAgABKAXIAAgVIAyAAIAAAVg");
//         this.shape.setTransform(190.376,28.278,0.9681,0.879);

//         this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

//         // Layer_1
//         this.instance = new lib.top_splunk_built1();

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.top_splunk, new cjs.Rectangle(0,0,384,108), null);


//     (lib.top_custom_hover = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_2
//         this.instance = new lib.top_cust_built1_hover();
//         this.instance.setTransform(1,0);

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.top_custom_hover, new cjs.Rectangle(1,0,185,108), null);


//     (lib.top_comm_hover = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.instance = new lib.top_comm_built1_hover();
//         this.instance.setTransform(1,0);

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.top_comm_hover, new cjs.Rectangle(1,0,182,108), null);


//     (lib.shadows = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.instance = new lib.shadow4a();

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

//         // Layer_2
//         this.instance_1 = new lib.shadow13a();

//         this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.shadows, new cjs.Rectangle(0,0,1222,683), null);


//     (lib.shadow_bottom = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#EAEEF2").s().p("AjmDmQhfhfAAiGQAAiHBfhgQBghfCHAAQCGAABfBfQBgBgAACHQAACGhgBfQhfBgiGAAQiHAAhghgg");
//         this.shape.setTransform(32.6,32.6);

//         this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.shadow_bottom, new cjs.Rectangle(0,0,65.2,65.2), null);


//     (lib.platorm1b = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.instance = new lib.platform_static1b();

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.platorm1b, new cjs.Rectangle(0,0,1222,683), null);


//     (lib.platform1c = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.instance = new lib.platform_static1c();

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.platform1c, new cjs.Rectangle(0,0,1222,683), null);


//     (lib.platform1a = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.instance = new lib.platform_static1a();

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.platform1a, new cjs.Rectangle(0,0,1222,683), null);


//     (lib.platform_hover1a_1 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.instance = new lib.platform_hover1a();

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.platform_hover1a_1, new cjs.Rectangle(0,0,1222,683), null);


//     (lib.platform_copy1 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#FFFFFF").s().p("AifhgIA9gFIAEAbQAKgQAOgJQAPgJAUgCQAogDAQAgQAKgRARgJQASgLAWgBQAigDATATQATATAAAlIAACOIhGAFIAAiBQAAgdgaADQgNABgIAJQgIAIAAAOIAACAIhFAFIAAiBQAAgcgaABQgNACgIAJQgIAIAAAOIAACAIhGAFg");
//         this.shape.setTransform(386.5,20.5545);

//         this.shape_1 = new cjs.Shape();
//         this.shape_1.graphics.f("#FFFFFF").s().p("AhFhnIA9gEIAGAfQAGgPAPgLQAPgJATgBIAJAAIAIAAIAABAIgSABQgbABgNAMQgMALABAXIAABtIhGAEg");
//         this.shape_1.setTransform(359.95,22.3125);

//         this.shape_2 = new cjs.Shape();
//         this.shape_2.graphics.f("#FFFFFF").s().p("AhRBXQgdgcAAg1QAAgzAeggQAcggA0gDQA1gCAdAcQAdAdAAA0QAAAzgdAgQgdAgg1ADIgIAAQguAAgbgagAAAgzQgnADAAAyQAAAzAngBQAogCgBg0QAAgxglAAIgCAAg");
//         this.shape_2.setTransform(338.15,23.625);

//         this.shape_3 = new cjs.Shape();
//         this.shape_3.graphics.f("#FFFFFF").s().p("Ah6BYIAAhfIghABIAAg2IAVgBQAIAAADgDQADgDACgJIAHgxIA7gCIAAA+IBUgEIAAgEQAAglAXgWQAWgVAkgBIArACIAAAxIgVABQgUABgGAHQgGAGgBAQIAugCIAAA4IguACIAACgIhGADIAAihIhUAEIAABSQAAAOAFAFQAFAFAPgBIAXgBIAAA3IgYADIgYACIAAABIgEAAQhCAAAAhDg");
//         this.shape_3.setTransform(310.35,20.9028);

//         this.shape_4 = new cjs.Shape();
//         this.shape_4.graphics.f("#FFFFFF").s().p("AhPBhQgUgRAAgdQAAgeASgRQAUgRAlgFIAngGQAJgBAEgDQADgDAAgGQAAgYgcABQgNABgHAGQgIAGgCAMIhBABQABgWANgRQANgSAWgKQAWgKAcgBQAtgBAYAWQAYAXAAArIAACCIg7ACIgEgXQgTAcgrABIgEAAQgfAAgTgQgAgFAVQgZAEAAASQAAAKAHAFQAIAGAMgBQAPAAAKgIQAJgHAAgNIAAgVg");
//         this.shape_4.setTransform(282.225,25.8981);

//         this.shape_5 = new cjs.Shape();
//         this.shape_5.graphics.f("#FFFFFF").s().p("AgiiRIBFgCIAAEmIhFABg");
//         this.shape_5.setTransform(265.05,22.375);

//         this.shape_6 = new cjs.Shape();
//         this.shape_6.graphics.f("#FFFFFF").s().p("AhviMIBzgCQA0gBAdAYQAbAZAAAvQAAAvgcAZQgdAagzAAIgrABIAABaIhIABgAgDhUIgkAAIAABPIAkAAQAUgBALgKQALgJgBgVQAAgmgoAAIgBAAg");
//         this.shape_6.setTransform(246.75,23.3245);

//         this.shape_7 = new cjs.Shape();
//         this.shape_7.graphics.f("#FFFFFF").s().p("AhuCTIAAklIBGAAIAACkIBChXIBOAAIhRBgIBYB4IhUAAIhDhoIAABog");
//         this.shape_7.setTransform(210.975,23.1);

//         this.shape_8 = new cjs.Shape();
//         this.shape_8.graphics.f("#FFFFFF").s().p("AAeBvIAAiBQAAgdgbAAQgMAAgJAHQgLAIAAAPIAAB/IhGAAIAAjYIA8AAIAGAcQAHgNAQgKQAPgJAWABQAiAAATATQAUASAAApIAACOg");
//         this.shape_8.setTransform(184.7,26.7987);

//         this.shape_9 = new cjs.Shape();
//         this.shape_9.graphics.f("#FFFFFF").s().p("AhPBaQgTgWAAgkIAAiOIBGABIAACAQAAAeAZAAQAOAAAJgIQAJgJAAgNIAAiAIBGABIAADYIg8gBIgFgbQgJAOgQAJQgPAIgUAAQgigBgTgUg");
//         this.shape_9.setTransform(159.425,26.9);

//         this.shape_10 = new cjs.Shape();
//         this.shape_10.graphics.f("#FFFFFF").s().p("AgiCTIAAkmIBFABIAAEmg");
//         this.shape_10.setTransform(140.8,22.575);

//         this.shape_11 = new cjs.Shape();
//         this.shape_11.graphics.f("#FFFFFF").s().p("AhsCTIAAkmIA8ACIAFAbQAUgeArAAQAbABATAOQAVAOALAaQALAZAAAiQAAAigLAZQgLAZgWAOQgTANgdgBQgiAAgVgaIAABjgAgbhPQgLAJAAAQIAAAlQAAAOALAIQAJAKARAAQATABAJgOQAKgMAAgZQAAgYgKgOQgJgNgTgBQgSAAgIAIg");
//         this.shape_11.setTransform(122.7,29.7496);

//         this.shape_12 = new cjs.Shape();
//         this.shape_12.graphics.f("#FFFFFF").s().p("AADCUQg1gCgggbQgggbgDgtIBKADQAIAmAmABQARABAMgHQAKgIAAgNQAAgLgJgHQgJgHgRgDIgYgGQhegTAAhGQAAgcANgTQAOgUAZgKQAZgKAiABQAgABAaAMQAZAMAOAVQAPAUABAcIhKgDQgDgPgLgIQgLgIgOgBQgQAAgKAGQgKAGAAANQAAALAIAGQAIAGAQAEIAYAFQAyALAYAVQAYAXAAAjQAAAcgOAVQgPAVgZAKQgXAJgeAAIgIAAg");
//         this.shape_12.setTransform(96.175,21.8831);

//         this.shape_13 = new cjs.Shape();
//         this.shape_13.graphics.f("#FFFFFF").s().p("AACBxQgygCgdggQgdggAAgyQAAg0AdgeQAegdAyADQAxACAbAfQAcAeAAAyIgBAWIiMgIQAFArAhACQAaABAIgTIBDADQgDAWgNAPQgPAQgWAHQgRAHgYAAIgJAAgAghgZIA7ADQAKABAAgKQAAgNgJgJQgJgIgOgBIgDgBQgcAAgGAmg");
//         this.shape_13.setTransform(60.425,23.6978);

//         this.shape_14 = new cjs.Shape();
//         this.shape_14.graphics.f("#FFFFFF").s().p("AAeCVIAAiBQAAgcgbgDQgNAAgKAHQgJAIAAANIAACBIhGgFIAAkmIBGAEIAABjQAUgXAkACQAjACATAVQATAWAAAlIAACPg");
//         this.shape_14.setTransform(36.375,18.4);

//         this.shape_15 = new cjs.Shape();
//         this.shape_15.graphics.f("#FFFFFF").s().p("AgkCOIAAjbIhOgHIAAg/IDlASIAABAIhOgHIAADcg");
//         this.shape_15.setTransform(11.475,16.825);

//         this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.platform_copy1, new cjs.Rectangle(0,2,402.5,42.7), null);


//     (lib.grad_a1 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.instance = new lib.white_soft_edge1();
//         this.instance.setTransform(0,480,1,1,-90);

//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#FFFFFF").s().p("Eg+GAl5MAAAhLxMB8NAAAMAAABLxg");
//         this.shape.setTransform(717.475,242.5);

//         this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.grad_a1, new cjs.Rectangle(0,0,1115,485), null);


//     (lib.ClipGroup = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_2 (mask)
//         var mask = new cjs.Shape();
//         mask._off = true;
//         mask.graphics.p("Aq4FlQgPAAgKgMQgLgMABgQIAAp5QAAgQAKgMQALgMAOAAIVyAAQAPAAAJAMQALAMAAAQIAAJ5QAAAQgLAMQgKAMgOAAg");
//         mask.setTransform(73.5,35.675);

//         // Layer_3
//         this.instance = new lib.CachedBmp_10();
//         this.instance.setTransform(0,0,0.9091,0.9091);

//         var maskedShapeInstanceList = [this.instance];

//         for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
//             maskedShapeInstanceList[shapedInstanceItr].mask = mask;
//         }

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(0.3,0,146.5,70.9), null);


//     (lib.ClipGroup_1 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_2 (mask)
//         var mask_1 = new cjs.Shape();
//         mask_1._off = true;
//         mask_1.graphics.p("ArZFqQgPAAgLgMQgLgNAAgRIAAqAQAAgRALgMQALgMAPAAIWzAAQAPAAALAMQALAMAAARIAAKAQAAARgLANQgLAMgPAAg");
//         mask_1.setTransform(77.2,36.175);

//         // Layer_3
//         this.instance_1 = new lib.CachedBmp_9();
//         this.instance_1.setTransform(0,0,0.9091,0.9091);

//         var maskedShapeInstanceList = [this.instance_1];

//         for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
//             maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
//         }

//         this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.ClipGroup_1, new cjs.Rectangle(0.5,0,153.2,70.9), null);


//     (lib.CompoundPath_2 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         this._renderFirstFrame();

//     }).prototype = p = new cjs.MovieClip();
//     p.nominalBounds = new cjs.Rectangle(0,0,0,0);


//     (lib.CompoundPath_1 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         this._renderFirstFrame();

//     }).prototype = p = new cjs.MovieClip();
//     p.nominalBounds = new cjs.Rectangle(0,0,0,0);


//     (lib.Path_3 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f().s("#FFFFFF").ss(1.5).p("AAAjbIAAG3");
//         this.shape.setTransform(0.75,21.975);

//         this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.Path_3, new cjs.Rectangle(-0.2,-1,2,46), null);


//     (lib.Path_2 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f().s("#FFFFFF").ss(1.5).p("AAAjhIAAHD");
//         this.shape.setTransform(0.75,22.55);

//         this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(-0.2,-1,2,47.1), null);


//     (lib.Path_1 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f().s("#FFFFFF").ss(1.5).p("AAAjhIAAHD");
//         this.shape.setTransform(0.75,22.575);

//         this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(-0.2,-1,2,47.2), null);


//     (lib.Path = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f().s("#FFFFFF").ss(1.5).p("AAAjhIAAHD");
//         this.shape.setTransform(0.75,22.575);

//         this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(-0.2,-1,2,47.2), null);


//     (lib.data_ani = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.instance = new lib.data();

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.data_ani, new cjs.Rectangle(0,0,1222,683), null);


//     (lib.button_top = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#FFFFFF").s().p("At+IcIAAw3Ib9AAIAAQ3g");
//         this.shape.setTransform(89.5,54);

//         this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.button_top, new cjs.Rectangle(0,0,179,108), null);


//     (lib.button_platform1 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#FFFFFF").s().p("Eg+gAMhIAA5BMB9BAAAIAAZBg");
//         this.shape.setTransform(400.1,80.075);

//         this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

//         this._renderFirstFrame();

//     }).prototype = p = new cjs.MovieClip();
//     p.nominalBounds = new cjs.Rectangle(0,0,800.2,160.2);


//     (lib.bottom_text1 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#393E46").s().p("ADdA7QgLgKgBgOIAZAAQACAHAFACQAGADAFAAQAHAAAFgDQAFgDAAgFQAAgEgEgDIgLgDIgIgBQgKgBgJgDQgHgDgFgGQgEgHAAgIQAAgOALgJQALgJATAAQASAAALAJQALAJABAOIgZAAQgBgGgFgDQgEgCgGAAQgHAAgEADQgEACAAAEQAAAEADABQACACAIABIAIABQAKABAJADQAIAEAFAFQAFAHAAAKQAAAPgLAJQgLAIgVABQgUgBgLgHgAB7A8QgKgGgFgMQgGgMAAgOQAAgPAGgLQAFgLALgHQAKgHARAAQAPAAAKAHQAKAGAGALQAFALAAANIgBAKIhDAAQACAMAFAFQAFAGAKAAQAIAAAEgDQAFgDACgFIAaAAQgBAHgGAIQgEAGgLAGQgKAFgOAAQgPAAgMgHgACCAFIAjAAIAEgBIABgEQAAgFgFgFQgFgFgJAAQgRAAgEAUgAARA8QgLgGgGgMQgEgKAAgQQAAgOAFgMQAFgLALgHQAKgHARAAQAOAAAKAGQAJAFAFAKQAFAHABALIgZAAQgEgPgPAAQgKAAgGAHQgGAHAAANQAAANAGAHQAFAHALAAQAHAAAGgDQAFgFABgIIAaAAQgBAKgFAKQgGAJgJAFQgJAFgPABQgQAAgLgHgAhkA7QgJgIAAgNQAAgLAFgGQAEgGAIgDQAIgEAIgBIAUgCQAGgBABgBQAAgBABAAQAAgBAAAAQABgBAAAAQAAAAAAgBQAAgEgEgFQgDgDgKAAQgGAAgGACQgEADgBAHIgZAAQAAgIAFgJQAGgHAJgFQAKgFAOAAQAUAAAKALQALAKAAATIAAA8IgXAAIgBgLQgEAFgIAEQgGADgMABQgQAAgJgIgAhFAYQgHACgDACQgEACAAAFQAAAGAEACQAEADAHABQAJAAAFgEQAHgEAAgHIAAgKgAizBBIAAhhIAXAAIACANQAEgGAHgFQAHgDAJAAIAEAAIAEABIAAAXIgHAAQgNAAgHAGQgGAEAAAMIAAA0gAkABBIAAhqIgmAAIAAgZIBnAAIAAAZIglAAIAABqg");
//         this.shape.setTransform(266.6328,2.865,1.1677,1.1677);

//         this.shape_1 = new cjs.Shape();
//         this.shape_1.graphics.f("#393E46").s().p("AD/A9QgLgKgBgNIAaAAQABAGAFACQAGADAFAAQAHAAAFgDQAFgDAAgFQAAgEgEgDQgEgCgHAAIgIgBQgLgCgHgDQgJgDgDgGQgFgGAAgJQAAgPALgIQALgIATAAQASAAALAIQAMAJAAAOIgZAAQgBgHgFgCQgEgCgGAAQgIAAgDADQgEACAAAFQAAACADACQADADAHAAIAJABQAJACAJADQAJADAEAGQAFAGAAALQAAAPgLAIQgKAJgVAAQgVAAgLgIgACeA/QgKgGgHgMQgFgLAAgQQAAgQAGgJQAFgMALgHQALgGAQAAQAOAAAKAFQAJAGAFAJQAFAIABAKIgaAAQgDgPgPAAQgLAAgFAHQgGAHAAANQAAAOAGAGQAFAIAKAAQAIAAAFgEQAGgEABgIIAaAAQgBAJgGAKQgFAJgKAFQgJAGgPAAQgQAAgKgGgAgsA9QgHgHAAgPIAAgwIgQAAIAAgVIAKAAIAFgBIACgFIADgXIAWAAIAAAdIAWAAIAAAVIgWAAIAAArQAAAGADAEQADADAHAAIALAAIAAAUIgJABIgKABQgRAAgHgIgAiWA/QgLgHgFgLQgFgMAAgOQAAgPAFgLQAGgNALgGQAKgGAQAAQAQAAAKAGQAKAGAFALQAFAKAAAOIAAAKIhDAAQABALAFAGQAGAGAKAAQAHAAAFgDQAFgDACgFIAaAAQgCAJgFAHQgFAGgKAGQgLAEgNAAQgQAAgLgGgAiPAHIAjAAIADgBIABgDQAAgGgEgEQgFgGgJAAQgRAAgEAUgABbBDIAAhhIAbAAIAABhgAAQBDIAAhhIAXAAIADANQADgFAHgFQAHgEAJAAIAIABIAAAXIgHAAQgNAAgGAGQgHAEAAAMIAAA0gAjaBDIAAhTIggBKIgTAAIgghKIAABTIgbAAIAAiCIAeAAIAnBaIAmhaIAeAAIAACCgABagrIAAgZIAcAAIAAAZg");
//         this.shape_1.setTransform(132.538,3.2445,1.1677,1.1677);

//         this.shape_2 = new cjs.Shape();
//         this.shape_2.graphics.f("#393E46").s().p("AAQBNQgLgHAAgMQAAgJAFgDQAFgEAGgCQgEgCgDgFQgDgDAAgHQAAgHAEgEQAEgFAGgDQgHgEgEgFQgDgHAAgIQAAgPALgIQAKgJAUAAQAIAAAGABQAEAAAGADIAcAAIAAASIgNgBIADAGIABAHQAAAHgFAIQgEAFgJAEQgJAFgPAAIgNgBIgFADIgBADQAAAHAIAAIAZAAQARAAAJAIQAIAIAAANQAAAQgMAIQgMAJgaAAQgYgBgLgHgAAjAuQgEADAAAEQAAAEAFAEQAFAEAMAAQAMAAAFgEQAFgDAAgGQAAgEgEgCQgDgDgGAAIgUAAQgEAAgDADgAApgdQgEADAAAFQAAAHAEACQAEADAIAAQAIAAAFgDQAEgCAAgHQAAgFgEgDQgEgEgJABQgIgBgEAEgAB+ApQgLgKgBgOIAZAAQACAHAFACQAGADAFAAQAHAAAFgDQAEgDAAgFQAAgFgDgCQgFgCgGgBIgJgBQgJgBgJgDQgHgDgFgFQgEgHAAgKQAAgNALgJQALgJATABQASgBALAJQALAJABANIgZAAQgCgGgEgCQgEgCgGAAQgHAAgEACQgEADAAAFQAAADADACQACACAIABIAIABQAKACAJACQAIAEAFAFQAFAGAAAKQAAAPgLAJQgLAJgVAAQgUAAgLgIgAhQAqQgLgGgGgMQgFgMAAgOQAAgOAFgMQAGgLALgHQALgHAQABQARgBAKAHQALAGAGALQAFANAAAOQAAANgFANQgHAMgKAGQgLAGgQABQgRgBgKgGgAhGgWQgFAIAAAMQAAANAFAHQAGAIALgBQALABAFgIQAGgHAAgNQAAgNgGgHQgFgHgLgBQgLABgGAHgAjHAvIAAiDIAcAAIAABrIA5AAIAAAYg");
//         this.shape_2.setTransform(7.3825,5.609,1.1677,1.1677);

//         this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.bottom_text1, new cjs.Rectangle(-16,-4.9,317.1,20.4), null);


//     (lib.top_security_hover = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f().s("#393E46").ss(3,0,0,4).p("Aqyk0IVlAAQAPAAAKAKQAKALAAAOIAAIjQAAAOgKALQgLAKgOAAI1lAAQgOAAgLgKQgKgLAAgOIAAojQAAgOAKgLQALgKAOAAg");
//         this.shape.setTransform(75.125,46.425);

//         this.shape_1 = new cjs.Shape();
//         this.shape_1.graphics.f("#FFFFFF").s().p("AqyE1QgOAAgLgKQgKgLAAgOIAAojQAAgOAKgLQALgKAOAAIVlAAQAPAAAKAKQAKALAAAOIAAIjQAAAOgKALQgLAKgOAAg");
//         this.shape_1.setTransform(75.125,46.425);

//         this.instance = new lib.ClipGroup_1();
//         this.instance.setTransform(79,42.1,1,1,0,0,0,77,36.1);

//         this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_1},{t:this.shape}]}).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.top_security_hover, new cjs.Rectangle(1,6,154.9,72.9), null);


//     (lib.top_obsv_hover = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f().s("#393E46").ss(3,0,0,4).p("Aqyk0IVlAAQAPAAAKAKQAKALAAAOIAAIjQAAAOgKAKQgKALgPAAI1lAAQgOAAgLgLQgKgKAAgOIAAojQAAgPAKgKQAKgKAPAAg");
//         this.shape.setTransform(82.375,46.55);

//         this.shape_1 = new cjs.Shape();
//         this.shape_1.graphics.f("#FFFFFF").s().p("AqyE1QgOAAgLgKQgKgKAAgPIAAojQAAgPAKgKQAKgKAPAAIVlAAQAPAAAKAKQAKALAAAOIAAIjQAAAPgKAKQgKAKgPAAg");
//         this.shape_1.setTransform(82.375,46.55);

//         this.instance = new lib.ClipGroup();
//         this.instance.setTransform(83.5,41.65,1,1,0,0,0,74,35.6);

//         this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_1},{t:this.shape}]}).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.top_obsv_hover, new cjs.Rectangle(8.3,6.1,149.39999999999998,72.9), null);


//     (lib.top_observe1 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // timeline functions:
//         this.frame_0 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_9 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_26 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_47 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_56 = function() {
//             var _this = this;

//             _this.stop();
//         }

//         // actions tween:
//         this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9).call(this.frame_9).wait(17).call(this.frame_26).wait(21).call(this.frame_47).wait(9).call(this.frame_56).wait(95));

//         // Layer_4
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#393E46").s().p("AHkBRIAAgXIAGAAQAKAAAFgDQAEgCACgIIgHAAIgfhdIAhAAIAOA6QAAABAAABQABAAAAABQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAgBAAgBIAPg6IAfAAIgfBfQgFANgEAIQgGAIgIADQgIADgLABgAofApQgNgHgHgPQgHgNAAgVQAAgVAHgOQAHgOANgHQAOgJASABQAUgBAMAJQAOAHAHAOQAGAPAAAUQAAASgGAQQgIAPgNAHQgNAIgTAAQgRAAgPgIgAoSgqQgHAJAAASQAAARAHAJQAGAJANAAQAOAAAGgJQAHgJAAgRQAAgSgHgJQgGgJgOAAQgNAAgGAJgAGeASIAAgqIgPAAIAAgWIAJAAQAFAAAAgCQACgCAAgDIADgWIAaAAIAAAbIATAAIAAAYIgTAAIAAAkQAAAGACACQACACAHAAIAKAAIAAAYIgLABIgKABQgeAAAAgegACwAjIgCALIgaAAIAAh/IAeAAIAAAsQAIgMARAAQAMAAAJAGQAJAFAFAMQAFALAAAOQgBAOgEAMQgFAKgKAHQgJAGgMAAQgSAAgIgNgAC3gSQgFAEAAAGIAAAQQAAAGAFAEQAEADAHAAQAIAAAFgFQAEgGAAgKQAAgLgEgFQgFgHgIAAQgHAAgEAFgAAzAoQgJgHAAgNQAAgNAIgHQAIgHARgBIARgCIAFgDQABAAAAAAQAAAAABgBQAAAAAAgBQAAgBAAAAQAAgLgMABQgHgBgCADQgDADgBAFIgdAAQABgLAFgHQAFgHAKgEQAJgEANAAQAVAAAKAKQAKALAAASIAAA4IgaAAIgBgKQgIAMgUAAQgPAAgIgIgABTAIQgLABAAAJQAAADADAEQAEACAFAAQAHAAAEgEQAFgDAAgFIAAgKgAjdAkQgMgOAAgWQAAgXAMgNQANgNAXAAQAVAAAMANQAMANAAAWIAAAIIg+AAQADASAPAAQALAAADgIIAeAAQgBAJgHAHQgGAIgKADQgKAEgLAAQgXAAgNgMgAjKgLIAbAAQAFAAAAgEQgBgGgEgDQgEgEgGAAQgOAAgDARgAk9AoQgMgIgBgOIAdAAQADAIALABQAGAAAEgCQACgDABgEQgBgDgCgCQgEgCgFgBIgIAAQgSgDgIgGQgIgHAAgMQAAgOALgJQAMgIASAAQASAAAMAIQAKAIABAOIgcAAQgCgJgKAAQgMAAAAAIQAAADADABQACADAFAAIAHABQAUACAIAHQAJAGAAAOQABAOgMAIQgNAJgSAAQgUAAgLgIgAmXAjIgCALIgaAAIAAh/IAfAAIAAAsQAIgMARAAQALAAAKAGQAIAFAFAMQAFALAAAOQAAAOgFAMQgFAKgJAHQgKAGgNAAQgQAAgJgNgAmQgSQgFAEABAGIAAAQQgBAGAFAEQAEADAHAAQAJAAAEgFQAFgHAAgJQAAgLgEgFQgFgHgJAAQgGAAgFAFgAFlAuIAAheIAfAAIAABegAE0AuIAAh/IAeAAIAAB/gAECAuIAAheIAfAAIAABegAgbAuIgfheIAhAAIAOA6QABABAAABQAAAAAAABQABAAAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAgBAAAAQAAgBABgBIAMg6IAgAAIgeBegAh8AuIAAheIAaAAIACAOQAEgGAGgEQAHgFAIAAIAHABIAAAcIgHAAQgNAAgFAFQgFAEAAALIAAAugAFkg6IAAgXIAhAAIAAAXgAEBg6IAAgXIAgAAIAAAXg");
//         this.shape.setTransform(82.7743,48.2996,1.1,1.1);

//         this.timeline.addTween(cjs.Tween.get(this.shape).wait(151));

//         // Layer_3
//         this.instance = new lib.top_obsv_hover();
//         this.instance.setTransform(91,54,1,1,0,0,0,91,54);
//         this.instance.alpha = 0;
//         this.instance._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(19).to({_off:false},0).to({alpha:1},6).wait(14).to({regX:86,regY:6.5,x:86,y:6.5},0).to({alpha:0},8).wait(2).to({regX:91,regY:54,x:91,y:54,alpha:1},0).wait(1).to({alpha:0},6).to({_off:true},73).wait(22));

//         // Layer_1
//         this.instance_1 = new lib.top_observ1();

//         this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},62).wait(89));

//         this._renderFirstFrame();

//     }).prototype = p = new cjs.MovieClip();
//     p.nominalBounds = new cjs.Rectangle(0,0,164,81);


//     (lib.top_custom = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // timeline functions:
//         this.frame_0 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_9 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_26 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_47 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_56 = function() {
//             var _this = this;

//             _this.stop();
//         }

//         // actions tween:
//         this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9).call(this.frame_9).wait(17).call(this.frame_26).wait(21).call(this.frame_47).wait(9).call(this.frame_56).wait(62));

//         // Isolation_Mode
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#141D29").s().p("AEnA4QgKgGgGgMIgDgaIAAhFIAZAAIAABFQAAALAFAJQAHAIAKAAQANAAAFgIQAGgGAAgOIAAhFIAZAAIAABFQgBANgFANQgDAJgMAJQgKAGgSAAQgTAAgJgGgAiNA2QgNgIgFgNQgGgOAAgSQAAgSAGgNQAGgMAMgKQANgIARAAQARAAANAIQAMAIAGANQAFANABASQgBASgFAOQgHANgLAJQgJAIgVAAQgRAAgNgIgAiFgbQgIAKABASQgBASAIALQAJAKANAAQAPAAAHgKQAHgKAAgTQAAgSgHgKQgHgKgPAAQgOAAgIAKgAnRA4QgKgGgGgMQgDgLAAgPIAAhFIAZAAIAABFQAAALAFAJQAHAIALAAQALAAAHgIQAFgGAAgOIAAhFIAZAAIAABFQAAALgFAPQgDAIgNAKQgJAGgTAAQgSAAgKgGgApRAuQgNgQAAgdQAAgPAHgRQAFgOANgHQAKgHAUAAQAOAAALAGQAJAFAHAKQAFAJABAOIgYAAQgCgKgGgGQgHgGgJAAQgNAAgHAKQgIAKABASQgBATAIAKQAHAKANAAQAJAAAHgGQAGgGACgKIAZAAQgBAUgOAMQgMAMgXAAQgbAAgNgQgAG7A9IAAh1IAZAAIAABfIA0AAIAAAWgAIkA8IAAhfIgjAAIAAgWIBeAAIAAAWIgiAAIAABfgAGLg4IAZAAIAAB0IgZAAgAgmg4IAbAAIAjBRIAjhRIAaAAIAAB0IgZAAIAAhKIgcBCIgSAAIgbhCIAABKIgZAAgAjpA8IAAhfIghAAIAAgWIBdAAIAAAWIgjAAIAABfgAlkAyQgOgHgBgUIAZAAQAFASASAAIAKgBIAHgFQAEgCAAgHQAAgGgFgEQgIgEgFgBIgKgCQgngGAAgcQABgLAFgJQAHgIAKgEQAJgEANAAQAOAAAKAEQAKAFAGAIQAFAHABANIgYAAQgCgIgFgEQgGgEgIAAQgHAAgGADQgFADgBAIQAAAEAEAEQADAEAJABIAKACQAUADALAIQAIAJABAOQgBANgFAHQgGAJgLAEQgJAEgPAAQgWAAgLgKgACoA7IAAhzIAwAAQAQAAAHAEQALAGACAFQAFAGAAAKQAAAJgFAFQgDAHgKADQAKACAGAIQAEAIAAAJQABAPgLAJQgKAJgUAAgADBAnIAXAAQAMAAACgEQAEgEAAgHQAAgHgFgEQgDgEgKAAIgXAAgADBgJIAWAAQAJAAAEgEQAEgEAAgGQAAgGgEgEQgGgDgHAAIgWAAgABlAXIAAgVIAyAAIAAAVg");
//         this.shape.setTransform(92.5114,29.1397,0.9309,0.8971);

//         this.shape_1 = new cjs.Shape();
//         this.shape_1.graphics.f("#393E46").s().p("ADmDYIAAiLIAPAAIACAOQAEgHAKgFQAIgEAMAAQAOAAAKAHQAIAGAHANQAFAOAAAMQAAAOgFANQgEAJgLAKQgJAGgQABQgKAAgHgDQgIgEgFgHIAAAygAEGBdQgIADgCAFQgEAEAAAKIAAAXQAAAKAEAEQAHAGADACQAHADAHAAQAOAAAIgKQAIgLAAgQQAAgQgIgKQgIgLgOABQgFAAgJADgABuDYIAAiLIAPAAIADAOQADgHALgFQAIgEAMAAQAOAAAKAHQAIAGAHANQAFAOAAAMQAAAOgFANQgEAJgLAKQgJAGgQABQgKAAgHgDQgIgEgFgHIAAAygACPBdQgIACgCAGQgFAGAAAIIAAAXQAAAJAFAFQAFAGAFACQAHADAHAAQAOAAAIgKQAIgLAAgQQAAgQgIgKQgIgLgOABQgFAAgJADgAFiCrQgNgIgDgNIASAAQACAFADAEQAHAEACAAIAKABQAJABAHgEQAHgEAAgIQAAgGgFgEQgDgCgLgCIgJgBQgPgBgKgHQgJgGAAgOQAAgOAKgIQALgJASAAQARAAALAIQAKAIABANIgQAAQgCgIgGgEQgHgDgGAAQgLAAgFAEQgGAFAAAGQAAAGAEADQACACANACIAJABIASAEQAJAEAEAFQAFAGAAALQAAANgLAKQgKAJgUAAQgSAAgLgJgAAICrQgIgHAAgOQAAgKADgHQAEgGAIgDQAKgEAGAAIAYgDQAGgCACgBQACgCAAgEIgCgIQgBgEgGgDQgFgDgJAAQgKAAgGADQgHAGgBAIIgRAAQAAgIAFgJQAEgHAKgEQAKgGAMAAQATABALAKQAKAKAAAUIAAA/IgOAAIAAABIgBgMQgFAGgHAEQgGADgPABQgRAAgJgJgAAjCFQgKABgFADQgFAFAAAGQAAAHAGAGQAGADAJAAQAGAAAIgCQAFAAAGgHQAEgFAAgFIAAgRgAmZCtQgLgIgEgLQgFgJAAgSQAAgNAFgOQAGgMAJgGQALgHARAAQARAAAKAHQALAGAEAMQAFAJAAASQAAAOgFANQgFALgKAIQgNAGgOABQgSgBgKgGgAmUBkQgHAKAAAQQAAARAHALQAJAKAOgBQAPABAHgKQAIgMAAgQQAAgPgIgLQgJgLgNABQgPgBgIALgAhYCyIAAg/QAAgYgWAAQgHAAgGADQgIAEgCAEQgEAGAAAHIAAA/IgRAAIAAhmIAPAAIABAOQADgFAKgGQAIgFAMAAQARABAJAJQAJALAAAQIAABDgAjiCyIgXhOIgWBOIgUAAIghhmIAUAAIAUBMQABAAAAABQAAAAABABQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAQAAgBAAAAQABgBAAAAIAWhMIAQAAIAWBMQABAAAAABQAAAAABABQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAABAAQAAgBABAAQAAgBAAAAIAVhMIATAAIghBmgAA1ghIAAgNIAGAAQAIAAADgBQADgCAEgDQADgDADgIIADgJIgFAAIglhkIAUAAIAaBMQABABAAABQAAAAABABQAAAAABAAQAAABAAAAQABAAAAgBQAAAAABAAQAAgBABAAQAAgBAAgBIAahMIATAAIgpBvQgFAQgIAHQgHAHgOAAIgNgCgACqhMQgLgIgEgLQgFgJAAgSQAAgNAFgOQAGgMAJgGQALgHARAAQARAAAKAHQALAGAEAMQAFAJAAASQAAAOgFANQgFALgKAIQgPAGgMAAQgSAAgKgGgACviWQgHALAAAQQAAARAHAKQAJAKAOAAQAPAAAHgKQAIgLAAgQQAAgPgIgMQgJgKgNAAQgPAAgIAKgAhchMQgKgIgFgLQgFgNAAgNQAAgNAFgOQAEgKALgJQAKgHAPAAQAKAAAHADQAIADAFAHIAAg1IASAAIAACPIgMAAIgDgOQgDAHgLAFQgHADgNAAQgPAAgJgGgAhViVQgIALAAAQQAAASAHAIQAHAKAPAAQAHAAAIgDQAHgDADgFQAFgHAAgGIAAgYQAAgJgFgFQgDgEgHgDQgGgEgIAAQgPABgHAJgAEXhPQgLgKAAgSIAAhCIASAAIAAA/QAAAXAWAAQAIAAAFgCQAEgDAGgFQAEgGAAgHIAAg/IASAAIAABlIgPAAIAAgOQgEAGgJAGQgHADgNAAQgRABgJgJgAkvhPQgLgJAAgTIAAhCIASAAIAAA/QAAAXAWAAQAIAAAFgCQAEgCAGgGQAFgGAAgHIAAg/IARAAIAABlIgPAAIAAgOQgEAHgJAFQgHADgNAAQgRABgJgJgAiYhHIAAiPIASAAIAACPgAjHhHIAAhlIASAAIAABlgAF/hIIAAhkIAPAAIACANQAGgIAEgCQAHgEALAAQAHAAACABIAAAOIgGAAQgeAAAAAcIAAA6gAm0hIIAAiJIA1AAQAPAAAKAEQAJAEAFAKQAFAIAAAKQAAAIgFAJQgFAKgLACQAPAGADAHQAGAJAAALQAAAHgFANQgFAKgKADQgNAGgPAAgAmghZIAgAAQAQABAHgIQAHgGAAgLQAAgLgHgGQgIgFgPAAIggAAgAmgiXIAgAAQAOAAAGgHQAGgEAAgKQAAgKgGgEQgHgHgNAAIggAAgAjJi+IAAgVIAUAAIAAAVg");
//         this.shape_1.setTransform(93.2795,73.211,0.9309,0.8971);

//         this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(118));

//         // Layer_2
//         this.instance = new lib.top_custom_hover();
//         this.instance.setTransform(91,54,1,1,0,0,0,91,54);
//         this.instance.alpha = 0;
//         this.instance._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(19).to({_off:false},0).to({alpha:1},6).wait(14).to({alpha:0},8).wait(2).to({alpha:1},0).wait(1).to({alpha:0},6).to({_off:true},8).wait(54));

//         // Layer_1
//         this.instance_1 = new lib.top_cust_built1();

//         this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},67).wait(51));

//         this._renderFirstFrame();

//     }).prototype = p = new cjs.MovieClip();
//     p.nominalBounds = new cjs.Rectangle(0,0,186,108);


//     (lib.top_community = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // timeline functions:
//         this.frame_0 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_9 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_26 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_47 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_56 = function() {
//             var _this = this;

//             _this.stop();
//         }

//         // actions tween:
//         this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9).call(this.frame_9).wait(17).call(this.frame_26).wait(21).call(this.frame_47).wait(9).call(this.frame_56).wait(95));

//         // Isolation_Mode
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#141D29").s().p("AHFA3QgKgFgGgNIgDgaIAAhFIAZAAIAABFQAAAKAFAKQAHAJALAAQAMAAAGgJQAFgGAAgOIAAhFIAZAAIAABFQAAAOgFAMQgEAKgMAIQgKAGgSAAQgSAAgKgGgAjSA3QgKgFgGgNQgDgKAAgQIAAhFIAZAAIAABFQAAAMAFAIQAHAJALAAQALAAAHgJQAFgGAAgOIAAhFIAZAAIAABFQAAALgFAPQgDAJgNAJQgJAGgTAAQgSAAgKgGgApvA1QgMgHgGgOQgGgNAAgTQAAgRAGgNQAGgNAMgJQAMgIASAAQARAAANAIQAMAIAGANQAGANAAASQAAATgGAMQgGANgMAJQgKAIgUAAQgSAAgMgIgApngcQgHAKAAASQAAATAHALQAHAKAPAAQAPAAAHgKQAHgKAAgUQAAgRgHgLQgHgKgPAAQgPAAgHAKgArwAtQgNgQAAgdQAAgRAGgPQAGgNAMgIQALgHATAAQAPAAAKAGQAKAGAGAJQAGAKABANIgZAAQgBgJgHgHQgGgGgKAAQgMAAgIAKQgHAKAAASQAAATAHALQAIAKAMAAQAKAAAGgGQAGgFACgMIAZAAQgCAUgNAMQgNAMgWAAQgcAAgLgQgAJaA8IAAh1IAZAAIAABfIA0AAIAAAWgALDA8IAAhfIgiAAIAAgWIBdAAIAAAWIgjAAIAABfgAIpg5IAZAAIAAB0IgZABgADCA8IAAguIgohHIAcAAIAZA0IAZg0IAbAAIgoBHIAAAugABVA8IAAhfIgiAAIAAgWIBdAAIAAAWIgiAAIAABfgAAJg5IAZAAIAAB0IgZABgAhug5IAXAAIAyBOIAAhOIAYAAIAAB0IgXAAIgyhOIAABOIgYABgAl2g5IAbAAIAjBRIAjhRIAaAAIAAB0IgYAAIAAhKIgdBCIgRAAIgdhCIAABKIgYABgAoIg5IAbAAIAjBRIAjhRIAaAAIAAB0IgYAAIAAhKIgdBCIgRAAIgdhCIAABKIgYABgAFHA6IAAhzIAwAAQAPAAAIAEQAKAGADAFQAEAHAAAJQAAAJgEAFQgEAHgJADQAKACAFAIQAFAJAAAIQAAAQgKAIQgLAJgUAAgAFfAnIAXAAQAMAAACgEQAEgFAAgGQAAgHgFgEQgCgEgLAAIgXAAgAFfgKIAWAAQAJAAAEgEQAEgFAAgFQAAgGgEgEQgGgDgHAAIgWAAgAEDAWIAAgVIAyAAIAAAVg");
//         this.shape.setTransform(92.2162,29.3098,0.914,0.8914);

//         this.shape_1 = new cjs.Shape();
//         this.shape_1.graphics.f("#393E46").s().p("AJCDVIAAiKIAPAAIACANQAEgHAKgFQAIgDAMAAQAOAAAKAGQAIAHAHANQAFANAAAMQAAAOgFANQgEAKgLAKQgJAGgQAAQgKAAgHgDQgIgDgFgHIAAAxgAJiBbQgIACgCAGQgEAGAAAHIAAAYQAAAJAEAEQAHAHADABQAHADAHAAQAOAAAIgKQAIgKAAgRQAAgPgIgLQgIgKgOAAQgFAAgJAEgAHLDVIAAiKIAPAAIACANQAFgHAKgFQAHgDANAAQAOAAAKAGQAIAHAHANQAFANAAAMQAAAOgFANQgEAKgLAKQgJAGgQAAQgKAAgHgDQgIgDgFgHIAAAxgAHsBbQgIACgCAGQgEAFAAAIIAAAYQAAAJAEAEQAHAHADABQAHADAHAAQAOAAAIgKQAIgKAAgRQAAgPgIgLQgIgKgOAAQgFAAgJAEgAqCDVIAAiKIAPAAIADANQADgHALgFQAIgDAMAAQAOAAAJAGQAKAHAFANQAFANAAAMQAAAOgFANQgDAKgMAKQgJAGgQAAQgJAAgIgDQgIgDgFgHIAAAxgAphBbQgIACgCAGQgEADAAAKIAAAYQAAAJAEAEQAFAGAFACQAHADAHAAQAOAAAIgKQAIgKAAgRQAAgPgIgLQgIgKgOAAQgFAAgJAEgAK/CpQgOgHgBgPIASAAQAAAFAFAEQAGAFADAAIAKABQAJAAAHgEQAHgEAAgHQAAgHgFgDQgEgDgKgCIgKgBQgPgBgKgHQgJgGAAgOQAAgOAKgHQALgJASAAQARAAALAIQAKAHABAOIgRAAQgBgJgHgDQgGgEgHAAQgKAAgGAFQgFADAAAIQAAAGAEADQACACANABIAJABIASAFQAJADAEAGQAFAFAAAMQAAANgLAJQgKAJgUAAQgSAAgLgIgABWCpQgOgIgBgOIASAAQAAAGAFADQAFAEAEABIAKABQAJAAAHgEQAHgEAAgHQAAgHgFgDQgEgDgLgCIgJgBQgPgBgKgHQgJgFAAgPQAAgOAKgHQALgJASAAQARAAALAIQAKAHABAOIgRAAQgBgJgHgDQgGgEgHAAQgKAAgGAFQgGAEAAAHQAAAGAFADQACACANABIAJABIASAFQAJADAEAGQAFAFAAAMQAAAMgLAKQgKAJgUAAQgSAAgLgIgAgXCpQgJgHAAgPQAAgKAEgHQAEgFAIgEQAKgDAGAAIAXgEQAGgBACgCQACgBAAgFIgCgIQgBgDgGgDQgFgEgJAAQgKAAgFAEQgHAFgBAIIgRAAQAAgHAFgJQAEgHAKgFQAKgFALAAQATAAALALQAKAKAAATIAAA/IgOAAIAAABIgBgLQgFAGgHAEQgGADgPAAQgQAAgJgIgAADCCQgJACgEADQgFAEAAAHQAAAHAFAFQAGAEAIAAQAGAAAJgCQAEgBAGgGQAFgGAAgFIAAgQgAhwCtQgJgEgFgHIgBANIgSAAIAAiPIASAAIAAA3QAEgGAKgFQAMgEAIAAQAOAAAKAHQAIAFAHAOQAFAOAAAMQAAAOgFANQgEAKgLAJQgKAHgPAAQgMAAgGgEgAhwBbQgIACgCAGQgEAEAAAJIAAAYQAAAJAEAEQAHAHADABQAHADAHAAQAOAAAIgKQAIgKAAgRQAAgPgIgLQgIgKgOAAQgFAAgJAEgArxCmQgPgJgEgVIATAAQAFAPAIAFQAKAFAMABIAPgDQAJgDAEgFQAFgHAAgGQAAgKgHgGQgGgEgPgEIgLgCQgWgEgKgIQgKgLAAgPQAAgMAGgIQAEgHANgIQANgEAMgBQAQABAIAEQALAFAHAHQAIAKABAOIgTAAQgDgOgIgEQgJgHgLAAQgNAAgHAHQgIAGAAAKQAAADACAHQABADAHAEQAIAEAIAAIALACQAYAGAJAJQAKAIAAASQAAANgHAIQgGALgMADQgLAFgPAAQgYAAgNgLgAi5CwIgwg1IAAA1IgRAAIAAiQIARAAIAABVIAtgqIAXAAIgyAtIA1A4gAC+CpQgJgEgHgOQgFgNAAgOQAAgOAFgOQAHgMAJgHQAJgHARAAQAQABAJAFQAKAHAFAKQAFAMAAAMIAAAFQAAAEgBABIhHAAQABARAGAGQAHAJAQgBQAKAAAFgDQAIgFACgGIARAAIAAACQgBAKgGAFQgFAHgKAEQgGAEgQAAQgRAAgKgHgADGBeQgIAHgBAOIAyAAQABAAAAAAQABAAABAAQAAAAAAAAQABgBAAAAIABgDQAAgKgIgHQgFgHgNAAQgNAAgHAHgAnUCnQgKgJAAgTIAAhCIASAAIAAA/QAAAYAWAAQAHAAAGgDQAEgCAGgGQAEgGAAgHIAAg/IASAAIAABlIgPAAIgBgNQgEAGgJAFQgGAEgOAAQgRAAgJgJgAGnCvIgNglIg6AAIgNAlIgUAAIAyiKIAYAAIAyCKgAF6A7IgVA+IAvAAIgVg+QgBgBAAAAQAAgBgBAAQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAAAAABQAAAAAAABgAkqCvIAAg/QAAgYgWAAQgHABgGADQgHADgDAFQgEAGAAAGIAAA/IgQAAIAAhlIAPAAIAAANQADgFAKgGQAIgEAMAAQARAAAJAKQAJAKAAARIAABCgAoLCvIAAiPIASAAIAACPgAkehHIAAgMQAAgOAEgHQAGgNAEgEIAOgLIAQgJIAOgIQAGgFADgEQADgFAAgJQAAgKgHgFQgGgHgNAAQgNAAgGAHQgIAGgBAJIgSAAQAAgHAGgLQAFgJAKgEQALgHAOAAQANAAAKAGQAJAEAGAJQAFALAAAKQAAAIgFAMQgEAHgJAGIgTAMIgQAJQgHAEgFAIQgEAIgCAJIBIAAIAAAQgABRhaQgMgQAAgkQAAgiAMgSQAPgSAXAAQAYAAANASQANARAAAjQAAAigNASQgMASgZAAQgaAAgMgSgABgi4QgIAKAAAfQAAAcAIAOQAJANAOAAQAOAAAIgMQAIgKAAgfQAAgcgIgOQgJgNgNAAQgPAAgIAMgAgmhaQgMgQAAgkQAAgiAMgSQAPgSAXAAQAXAAANASQANARAAAjQAAAigNASQgMASgYAAQgaAAgMgSgAgXi4QgIAKAAAfQAAAcAIAOQAJANAOAAQANAAAIgMQAIgKAAgfQAAgcgIgOQgJgNgMAAQgPAAgIAMgAhphMIAAgfIhDAAIAAgPIBChZIATAAIAABZIAUAAIAAAPIgUAAIAAAfgAiZh6IAxAAIAAhCgADnhdIAAgjIgjAAIAAgPIAjAAIAAgkIAPAAIAAAkIAjAAIAAAPIgjAAIAAAjg");
//         this.shape_1.setTransform(91.5306,73.2775,0.914,0.8914);

//         this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(151));

//         // Layer_3
//         this.instance = new lib.top_comm_hover();
//         this.instance.setTransform(91,54,1,1,0,0,0,91,54);
//         this.instance.alpha = 0;
//         this.instance._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(19).to({_off:false},0).to({alpha:1},6).wait(14).to({alpha:0},8).wait(2).to({alpha:1},0).wait(1).to({alpha:0},6).to({_off:true},73).wait(22));

//         // Layer_1
//         this.instance_1 = new lib.top_comm_built1();

//         this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},65).wait(86));

//         this._renderFirstFrame();

//     }).prototype = p = new cjs.MovieClip();
//     p.nominalBounds = new cjs.Rectangle(0,0,183,108);


//     (lib.pltform_copy2 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.instance = new lib.Path();
//         this.instance.setTransform(502.55,30.5,1,1,0,0,0,0.8,22.6);
//         this.instance.alpha = 0.3008;

//         this.instance_1 = new lib.Path_1();
//         this.instance_1.setTransform(350.85,35.45,1,1,0,0,0,0.8,22.6);
//         this.instance_1.alpha = 0.25;

//         this.instance_2 = new lib.Path_2();
//         this.instance_2.setTransform(231.7,33.65,1,1,0,0,0,0.8,22.6);
//         this.instance_2.alpha = 0.3281;

//         this.instance_3 = new lib.Path_3();
//         this.instance_3.setTransform(106,26.5,1,1,0,0,0,0.8,21.9);
//         this.instance_3.alpha = 0.3281;

//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#FFFFFF").s().p("AgZBIQgJgEgGgLQgEgKAAgPQAAgQAEgMQAGgLAJgJQAJgIANgDQAJgBAGABQAIADAEAEIAAgxIAWgEIAACGIgTAEIgCgNQgEAJgIAFQgJAGgIABIgJABQgHAAgFgCgAABgIQgLACgGAJQgGAJAAAPQAAAPAGAHQAGAHALgDQAKgCAHgHQAGgHAAgJIAAgWQAAgHgGgFQgEgDgGAAIgHABg");
//         this.shape.setTransform(666.7,-1.215);

//         this.shape_1 = new cjs.Shape();
//         this.shape_1.graphics.f("#FFFFFF").s().p("AgogqIASgDIACAMQAEgHAHgFQAHgFAKgDQAPgDAKAHQAJAIAAARIAAA/IgWAEIAAg7QAAgUgSAEQgIABgGAHQgHAHAAAJIAAA6IgVAEg");
//         this.shape_1.setTransform(656.05,3.255);

//         this.shape_2 = new cjs.Shape();
//         this.shape_2.graphics.f("#FFFFFF").s().p("AgfAwQgJgGAAgNQAAgKAEgHQAFgHAHgEQAIgEAIgCIATgHIAIgDQABgCAAgDQAAgEgBgDQgDgDgDgCQgEgBgHABQgHACgGAEQgFAFgBAHIgUAEQAAgJAFgJQAEgHAKgHQAJgGAMgCQATgDAJAIQAKAIAAATIAAA7IgSADIgBgLQgDAFgIAGQgIAGgKABIgKABQgJAAgFgEgAgDAIIgMAGQgEAEAAAFQAAAHAFACQADACAJgBIAKgEQAGgDADgEQAEgFAAgFIAAgMg");
//         this.shape_2.setTransform(645.375,5.0859);

//         this.shape_3 = new cjs.Shape();
//         this.shape_3.graphics.f("#FFFFFF").s().p("AgpgqIATgDIACAMQAFgIAGgEQAIgGAKgBQAPgDAJAIQAIAHABASIAAA+IgWAEIAAg7QAAgUgSADQgHABgIAHQgGAGAAAKIAAA6IgWAEg");
//         this.shape_3.setTransform(631.45,7.5188);

//         this.shape_4 = new cjs.Shape();
//         this.shape_4.graphics.f("#FFFFFF").s().p("AghAqQgNgLAAgYQAAgXANgPQANgPAUgDQAXgDAMALQAMAMAAAXQAAAXgMAPQgNAPgWADIgJABQgPAAgJgJgAAAgeQgLACgGAJQgHAIAAAPQAAAPAHAHQAGAHALgCQAMgBAHgKQAGgIAAgPQAAgPgGgHQgGgGgJAAIgEABg");
//         this.shape_4.setTransform(620.55,9.0337);

//         this.shape_5 = new cjs.Shape();
//         this.shape_5.graphics.f("#FFFFFF").s().p("AgKgdIAVgDIAABgIgVADgAgLg/IAXgDIAAAWIgXADg");
//         this.shape_5.setTransform(612.7,8.45);

//         this.shape_6 = new cjs.Shape();
//         this.shape_6.graphics.f("#FFFFFF").s().p("AgHA7QgHgGAAgPIAAgzIgRACIAAgRIALgCIAFgCQACgBAAgEIADgXIAQgCIAAAcIAXgDIAAASIgXADIAAAvQAAAJAEACQADADAIgCIAKgBIAAARIgJACIgJACIgHAAQgIAAgFgEg");
//         this.shape_6.setTransform(606.5,9.5847);

//         this.shape_7 = new cjs.Shape();
//         this.shape_7.graphics.f("#FFFFFF").s().p("AggAuQgJgGABgNQAAgKADgHQAFgHAHgDQAHgDAJgDIAUgFIAHgDQACgCAAgDIgCgHIgFgFQgFgCgHABQgGABgGAEQgGAFgBAHIgUADQAAgIAFgJQAFgIAJgGQALgFAKgCQATgDALAKQAJAJABASIAAA7IgSACIgCgLQgDAGgJAFQgHAEgLACIgGAAQgLAAgHgFgAgEAIQgIACgEADQgDADAAAHQAAAGAEACQAEADAJgBIAKgDQAGgEADgDQADgFAAgFIAAAAIAAgMg");
//         this.shape_7.setTransform(597.9,12.1625);

//         this.shape_8 = new cjs.Shape();
//         this.shape_8.graphics.f("#FFFFFF").s().p("AgbgsIATgCIACANQAEgHAGgFQAHgFAIgBQAGgBADABIAAAUIgHAAQgOACgGAHQgGAGAAANIAAA0IgWADg");
//         this.shape_8.setTransform(589.975,13.1);

//         this.shape_9 = new cjs.Shape();
//         this.shape_9.graphics.f("#FFFFFF").s().p("AgiApQgMgMAAgYQAAgXAMgOQANgPAVgDQAWgCANAMQAMAMAAAXQAAAXgMAPQgNAPgWACIgHABQgRAAgKgKgAAAAfQAMgBAGgJQAHgKAAgNQAAgPgHgHQgGgIgMACQgLAAgHAKQgGAKAAANQAAAOAGAIQAHAHALgBg");
//         this.shape_9.setTransform(580.425,14.2067);

//         this.shape_10 = new cjs.Shape();
//         this.shape_10.graphics.f("#FFFFFF").s().p("AgthBIAWgDIAAAyQAJgOASgCQANgCAKAGQAJAFAFAKQAFALAAAOQAAAQgFAMQgFAMgKAHQgKAHgNACQgSABgKgMIgBAMIgTACgAAAgPQgKACgHAGQgGAHAAAIIAAAVQAAAJAGAFQAHAGAJgCQAMgBAGgJQAHgKAAgOQAAgNgHgIQgFgHgKAAIgCAAg");
//         this.shape_10.setTransform(569.5,13.8);

//         this.shape_11 = new cjs.Shape();
//         this.shape_11.graphics.f("#FFFFFF").s().p("AggAuQgJgHAAgNQAAgKAFgHQAEgGAHgDQAIgEAIgCIAUgFQAGgBACgCQAAAAAAAAQABgBAAgBQAAAAAAgBQAAAAAAgBQAAgEgBgDQgBgDgFgDQgFgBgGAAQgIABgFAEQgFAEgBAIIgVACQAAgIAFgJQAGgIAIgFQAKgFAMgCQATgCAKAKQAKAJAAASIAAA7IgSACIAAAAIgCgLQgDAGgIAEQgIAFgKABIgGAAQgMAAgHgFgAgEAIQgHABgEAEQgEACAAAHQAAAGAEADQAGADAHgBIAKgDQAFgCAEgEQADgEAAgGIAAgMg");
//         this.shape_11.setTransform(558.275,16.5141);

//         this.shape_12 = new cjs.Shape();
//         this.shape_12.graphics.f("#FFFFFF").s().p("AgKhCIAVgCIAACHIgVACg");
//         this.shape_12.setTransform(550.9,15.25);

//         this.shape_13 = new cjs.Shape();
//         this.shape_13.graphics.f("#FFFFFF").s().p("AgKhCIAVgCIAACHIgVACg");
//         this.shape_13.setTransform(546.225,15.675);

//         this.shape_14 = new cjs.Shape();
//         this.shape_14.graphics.f("#FFFFFF").s().p("AgiAoQgMgMAAgYQAAgWAMgPQAOgPAUgBQAWgCANAMQAMAMAAAYQAAAXgMAOQgNAPgWABIgGABQgRAAgLgLgAAAgeQgKAAgHAJQgHAJAAAOQAAAQAHAHQAGAHALgBQAMAAAHgJQAGgKABgNQgBgPgGgIQgGgGgKAAIgDAAg");
//         this.shape_14.setTransform(538.3,18.2814);

//         this.shape_15 = new cjs.Shape();
//         this.shape_15.graphics.f("#FFFFFF").s().p("AgoA1QgOgRAAggQgBgfAPgTQARgUAZgBQAWgCAOALQAOAMACAVIgXACQgBgMgJgHQgGgGgNABQgQABgIANQgJANAAAWQAAAXAJAMQAJAMAPgCQAMAAAIgIQAIgIADgMIAWgCQgDAXgOANQgNANgYACIgFAAQgWAAgOgPg");
//         this.shape_15.setTransform(526.6,17.5012);

//         this.shape_16 = new cjs.Shape();
//         this.shape_16.graphics.f("#FFFFFF").s().p("AgaBBQgIgGgGgLQgFgLgBgPQABgPAFgLQAFgMAKgHQAJgGAOgBQAJAAAGACQAGADAGAGIAAgxIAVgBIAACGIgTABIgBgMQgFAGgHAFQgJAEgJABIgCAAQgKAAgKgFgAgRgCQgGAIAAAOQAAAOAGAJQAIAIAKgBQALAAAGgGQAGgHABgJIAAgVQgBgIgGgFQgGgFgLAAQgLABgHAIg");
//         this.shape_16.setTransform(469.2,20.7521);

//         this.shape_17 = new cjs.Shape();
//         this.shape_17.graphics.f("#FFFFFF").s().p("AgpgtIATgBIACAMQAEgHAHgDQAHgEAKgBQAQgBAJAJQAJAIAAASIAAA+IgWABIAAg7QAAgTgSAAQgIABgGAFQgIAGABAJIAAA7IgWABg");
//         this.shape_17.setTransform(458.4,23.1486);

//         this.shape_18 = new cjs.Shape();
//         this.shape_18.graphics.f("#FFFFFF").s().p("AggAsQgJgHAAgOQAAgLAEgFQAEgGAIgDQAHgDAJgBIAUgEQAFgBADgCQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgBAAAAQAAgEgBgDQgDgEgDgCQgEgCgIAAQgHABgFAEQgGAEgBAHIgUAAQABgJAEgHQAFgHAJgFQAKgFALAAQATgBALAKQAKAKAAASIAAA7IgSABIgBgBIgBgLQgEAGgHAEQgIAEgKAAIgEAAQgOAAgHgGgAgEAHQgHACgFADQgEADAAAGQAAAGAFADQAFADAHAAIALgCQAGgDADgDQADgEAAgGIAAgMg");
//         this.shape_18.setTransform(447.575,23.6296);

//         this.shape_19 = new cjs.Shape();
//         this.shape_19.graphics.f("#FFFFFF").s().p("AgphCIAWgBIAAAxQADgFAJgEQAHgEAIAAQAQgBAJAJQAJAJAAAQIAAA/IgVABIAAg8QAAgSgTAAQgHAAgIAGQgGAFAAAJIAAA7IgWABg");
//         this.shape_19.setTransform(433.05,22.275);

//         this.shape_20 = new cjs.Shape();
//         this.shape_20.graphics.f("#FFFFFF").s().p("AgXAtQgLgHgFgKQgFgKAAgQQAAgPAFgLQAGgLAKgHQAKgGAPgBQAOgBAIAFQAKAFAFAIQAFAJAAAJIgVABQgCgJgFgEQgGgEgIAAQgMABgFAIQgHAJABANQgBAPAHAIQAGAIALgBQAIAAAGgFQAHgEABgJIAVgBQAAAKgGAIQgFAJgKAGQgJAFgNAAIgCAAQgNAAgKgFg");
//         this.shape_20.setTransform(422.25,24.4247);

//         this.shape_21 = new cjs.Shape();
//         this.shape_21.graphics.f("#FFFFFF").s().p("AgbguIATAAIACANQADgGAHgFQAFgDAKgCIAJACIAAATIgHAAQgOAAgGAGQgGAGAAANIAAA0IgWAAg");
//         this.shape_21.setTransform(414.075,24.6);

//         this.shape_22 = new cjs.Shape();
//         this.shape_22.graphics.f("#FFFFFF").s().p("AggArQgJgHAAgNQAAgKAEgHQAEgFAIgDIAQgFIAUgDQAGAAACgCQAAgBAAAAQABgBAAAAQAAgBAAAAQAAgBAAgBQAAgEgBgDQgBgDgFgCQgFgDgHABQgHAAgFADQgGAEgBAHIgUABQAAgKAFgGQAFgIAJgFQAJgEANAAQATgBAKAKQAKAKAAASIAAA8IgTAAIgBgLQgFAGgGADQgIAEgKAAIgCAAQgOAAgJgHgAgEAIQgHAAgFAEQgEADAAAGQAAAGAFADQAFADAIAAQAFAAAFgCQAGgCADgEQADgDAAgGIAAgNg");
//         this.shape_22.setTransform(404.675,24.8722);

//         this.shape_23 = new cjs.Shape();
//         this.shape_23.graphics.f("#FFFFFF").s().p("AgYAsQgKgGgFgLQgGgMAAgOQAAgNAGgMQAFgLALgHQAKgHAOAAQAPgBAKAGQAJAGAGAKQAFAMAAAMIgBAKIhDABQABAMAGAHQAGAGALAAQAJAAAFgDQAFgDADgHIAVAAQgCAIgFAHQgFAHgJAFQgKAEgNAAQgPAAgKgGgAgOgaQgGAHgCALIAogBIAEgBIABgEQAAgGgFgHQgGgFgKAAQgJAAgHAGg");
//         this.shape_23.setTransform(394.325,25.0731);

//         this.shape_24 = new cjs.Shape();
//         this.shape_24.graphics.f("#FFFFFF").s().p("AgjA6QgNgLgCgUIAXAAQAFAWAXAAQAMAAAIgGQAGgFAAgKQABgIgGgEQgFgEgMgCIgKgCQgpgGgBgeQAAgMAHgJQAFgIALgFQALgFANAAQAVAAANAKQANALACASIgXAAQgBgJgIgGQgHgFgKAAQgLABgGAEQgGAFAAAIQAAAIAFAEQAFAEALACIAKACQAXAEAKAIQAKAJAAAQQAAAMgGAJQgGAJgMAGQgMAFgOAAIgDAAQgUAAgNgKg");
//         this.shape_24.setTransform(383,23.5542);

//         this.shape_25 = new cjs.Shape();
//         this.shape_25.graphics.f("#FFFFFF").s().p("AgYAsQgKgHgFgLQgGgKAAgPQAAgQAGgKQAEgLAMgHQAJgGAPAAQAPgBAJAHQAKAGAGAKQAEAMAAAMIgBAJIhCAAQABAMAGAHQAFAHAMAAQAJAAAEgDQAGgCADgHIAUAAQgBAIgFAHQgFAHgJAEQgKAEgNAAQgNAAgMgGgAgOgaQgGAFgCAMIAoAAIAEgBIABgDQAAgIgGgFQgEgGgMAAQgJAAgGAGg");
//         this.shape_25.setTransform(323.05,25.55);

//         this.shape_26 = new cjs.Shape();
//         this.shape_26.graphics.f("#FFFFFF").s().p("AgKBEIAAiHIAVAAIAACHg");
//         this.shape_26.setTransform(315.3,23.575);

//         this.shape_27 = new cjs.Shape();
//         this.shape_27.graphics.f("#FFFFFF").s().p("AgZA3IgCALIgTAAIAAiGIAXAAIAAAyQAJgNATAAQAMAAAKAGQAJAHAFALQAFAJABAQQAAAPgGAMQgFALgKAHQgKAGgNAAQgSAAgKgOgAgRgGQgGAGAAAIIAAAVQAAAJAGAGQAHAGAKgBQALAAAGgIQAHgHAAgPQAAgPgHgIQgGgIgLAAQgKAAgHAGg");
//         this.shape_27.setTransform(307.5,23.6);

//         this.shape_28 = new cjs.Shape();
//         this.shape_28.graphics.f("#FFFFFF").s().p("AggAqQgJgHAAgOQAAgKAEgGQAFgFAHgDQAIgDAIgBIAUgCIAIgCQAAgBAAAAQABgBAAAAQAAgBAAAAQABgBAAgBQAAgEgCgDQgCgDgEgDQgFgCgGAAQgIAAgGADQgEAEgCAHIgUAAQAAgJAFgHQAGgIAIgEQALgEALAAQASAAALAKQAKALAAASIAAA7IgTAAIgBgLQgEAFgHAEQgHADgLAAQgRAAgIgIgAgEAIQgIABgDACQgFADAAAGQABAHAEADQAFADAHAAIALgCQAGgBADgEQADgEABgFIAAgNg");
//         this.shape_28.setTransform(296.25,25.325);

//         this.shape_29 = new cjs.Shape();
//         this.shape_29.graphics.f("#FFFFFF").s().p("AgKBEIAAiHIAVAAIAACHg");
//         this.shape_29.setTransform(288.85,23.3);

//         this.shape_30 = new cjs.Shape();
//         this.shape_30.graphics.f("#FFFFFF").s().p("AggAqQgJgHAAgOQAAgKAFgGQAEgFAHgDQAJgDAHgBIAUgCIAIgCQAAgBAAAAQABgBAAAAQAAgBAAgBQAAAAAAgBIgBgHQgCgEgFgCQgEgCgGAAQgIAAgGADQgEADgBAIIgVgBQAAgHAFgJQAEgGAKgFQAJgEANAAQASAAALAKQAKALAAASIAAA7IgTAAIgBgLQgEAFgHAEQgIADgKAAQgQAAgJgIgAgEAHQgJACgCACQgEADgBAGQAAAGAFADQAEAEAIAAQAGAAAFgCQAGgBADgEQADgEAAgFIAAgNg");
//         this.shape_30.setTransform(281.15,25.125);

//         this.shape_31 = new cjs.Shape();
//         this.shape_31.graphics.f("#FFFFFF").s().p("AABAyQgOAAgKgGQgLgHgFgLQgFgLAAgPQAAgOAFgMQAGgLAKgGQAKgGAPAAQANAAAKAFQAJAGAEAIQAFAHACALIgWAAQgBgJgGgFQgFgEgJAAQgMAAgFAIQgGAIgBAOQABAPAGAIQAFAIALAAQAKAAAGgEQAFgEACgJIAVAAQgBAKgFAIQgFAIgJAGQgIAEgLAAIgFAAg");
//         this.shape_31.setTransform(270.9,24.9327);

//         this.shape_32 = new cjs.Shape();
//         this.shape_32.graphics.f("#FFFFFF").s().p("AgiA4QgOgLgCgUIAXABQAFAXAXAAQANAAAHgFQAHgFgBgJQAAgIgEgFQgGgEgMgDIgKgCQgpgIAAgeQAAgMAGgIQAFgIALgFQALgEANAAQAVAAANALQAOAMACASIgYgBQgCgKgHgFQgGgGgLAAQgKAAgGAFQgHAEABAJQAAAHAEAFQAFAEAMACIAKADQAUADAMAJQAKAKAAAQQAAAMgGAJQgGAJgLAFQgLAEgQAAQgVgBgOgLg");
//         this.shape_32.setTransform(259.6,22.9975);

//         this.shape_33 = new cjs.Shape();
//         this.shape_33.graphics.f("#FFFFFF").s().p("AABAyQgOAAgKgHQgKgHgGgLQgFgNgBgMQABgPAFgMQAFgKALgHQAJgGAPABQAOAAAKAHQAKAHAGAKQAEAKAAAOIAAAEIgBAFIhCgDQABAMAGAIQAGAHALAAQAIABAGgDQAGgEACgFIAUABIABAAQgBAGgFAJQgFAHgKADQgIADgJAAIgGAAgAgNgbQgHAHgBAKIAnACIAFgBIABgDQgBgHgFgGQgHgHgKAAQgJAAgFAFg");
//         this.shape_33.setTransform(199.3,22.5779);

//         this.shape_34 = new cjs.Shape();
//         this.shape_34.graphics.f("#FFFFFF").s().p("AAUAyIAAg7QAAgUgSgBQgIAAgGAFQgIAEAAAKIAAA7IgVgBIAAhhIATABIABANQAEgGAIgEQAIgDAJAAQAQABAJAJQAJAKAAARIAAA/g");
//         this.shape_34.setTransform(188.6,22.025);

//         this.shape_35 = new cjs.Shape();
//         this.shape_35.graphics.f("#FFFFFF").s().p("AgKBBIAAhgIAVABIAABggAgKgrIAAgWIAVACIAAAVg");
//         this.shape_35.setTransform(180.75,19.9);

//         this.shape_36 = new cjs.Shape();
//         this.shape_36.graphics.f("#FFFFFF").s().p("AAUBFIAAg8QAAgSgSgBQgHgBgHAFQgHAEAAAJIAAA8IgWgCIAAiGIAWABIAAAxQAFgGAGgCQAHgDAJABQAQABAJAJQAJAKAAAQIAAA/g");
//         this.shape_36.setTransform(173.025,19.225);

//         this.shape_37 = new cjs.Shape();
//         this.shape_37.graphics.f("#FFFFFF").s().p("AACAyQgNAAgMgIQgLgHgFgLQgFgNAAgNQAAgOAFgMQAGgLAKgGQAKgGAPABQAPACAHAFQAIAFAHAJQAEAIACALIgWgBQgCgJgFgFQgGgFgIAAQgMgBgFAIQgHAIAAAPQAAANAHAJQAFAIAMABQAJABAFgFQAHgDABgJIAVABQgBAKgFAIQgEAHgLAGQgGAEgLAAIgFgBg");
//         this.shape_37.setTransform(162.25,20.5019);

//         this.shape_38 = new cjs.Shape();
//         this.shape_38.graphics.f("#FFFFFF").s().p("AAYAyIgCgMQgEAGgHADQgIADgKgBQgRgBgIgIQgJgIAAgOQAAgKAFgGQAFgFAGgCQAKgDAGAAIAUgBQAGAAACgCQAAAAAAgBQABAAAAgBQAAAAAAgBQAAAAAAgBQAAgEgBgDQgCgEgEgDQgEgCgHgBQgHAAgGADQgFADgCAHIgUgBQAAgJAFgHQAEgHAKgEQAKgDAMAAQATACAKALQAKAKAAATIAAA7gAgEAHQgIABgDACQgEADAAAFQAAAHAEADQAFADAIABQAEABAGgCQAHgBACgEQAEgDAAgGIAAgMg");
//         this.shape_38.setTransform(151.575,19.8219);

//         this.shape_39 = new cjs.Shape();
//         this.shape_39.graphics.f("#FFFFFF").s().p("AAsBFIAAhaIgkBPIgPgCIglhUIAABaIgVgCIAAiCIAYACIApBiIAqhbIAYACIAACCg");
//         this.shape_39.setTransform(138.525,17.125);

//         this.shape_40 = new cjs.Shape();
//         this.shape_40.graphics.f("#FFFFFF").s().p("AgCBEQgVgCgMgIQgMgJAAgMQAAgIAFgEQAEgFAHgBQgFgDgCgEQgDgFAAgFQAAgFAEgFQADgEAGgCQgNgKAAgQQAAgPALgHQALgHASACQANABAJAGIAbADIAAAQIgOgCQAFAGAAAIQAAAOgLAGQgLAHgSgCQgFgBgJgDQgHADAAAFQAAAFAJACIAZADQAPABAJAJQAJAIAAAOQAAAPgMAHQgJAFgOAAIgMgBgAgWAbQgDADAAAFQAAAGAGAFQAFAEANABQAYADAAgOQAAgGgEgDQgEgDgHgBIgVgDQgGAAgDADgAgPgwQgFADAAAHQAAAHAFAFQAFAEAKABQASADAAgPQAAgIgFgEQgFgEgIgCIgDAAQgIAAgEADg");
//         this.shape_40.setTransform(80.425,14.9978);

//         this.shape_41 = new cjs.Shape();
//         this.shape_41.graphics.f("#FFFFFF").s().p("AAUAzIAAg7QAAgTgSgDQgHgBgHAEQgHAFAAAJIAAA7IgWgDIAAhgIATACIABANQAFgGAHgDQAIgDAJACQAPABAKAKQAJALAAARIAAA/g");
//         this.shape_41.setTransform(69.975,11.975);

//         this.shape_42 = new cjs.Shape();
//         this.shape_42.graphics.f("#FFFFFF").s().p("AgKBAIAAhgIAVADIAABggAgKgsIAAgWIAVADIAAAWg");
//         this.shape_42.setTransform(62.2,9.25);

//         this.shape_43 = new cjs.Shape();
//         this.shape_43.graphics.f("#FFFFFF").s().p("AAvA3IAAg6QAAgVgRgCQgHgBgGAFQgGAEAAAJIAAA7IgVgDIAAg7QAAgTgRgDQgIgBgFAFQgHADAAAKIAAA7IgVgEIAAhfIASACIACANQAEgGAHgDQAIgCAJABQAIABAIAFQAGAFADAJQAEgGAIgEQAIgDAMABQAPADAIAKQAJAJAAASIAAA/g");
//         this.shape_43.setTransform(51.775,9.5);

//         this.shape_44 = new cjs.Shape();
//         this.shape_44.graphics.f("#FFFFFF").s().p("AAYAyIgCgMQgEAFgHADQgHACgLgBQgRgDgHgJQgKgJABgNQgBgKAFgFQAFgFAHgCQAGgCAJAAIAUABQAHAAAAgBQABAAAAgBQAAAAABgBQAAgBAAAAQAAgBAAgBQAAgEgCgDQgBgEgEgDQgFgCgGgCQgIAAgFACQgGADgBAHIgUgDQAAgJAGgHQADgGAKgDQAKgDAMACQASADALALQAKANgBARIAAA8gAgPAHQgFACAAAGQAAAGAGAEQADAEAIABQAFABAGgBQAFgBAEgDQAEgEAAgFIAAgMIgZgBQgGAAgFADg");
//         this.shape_44.setTransform(38.3,7.71);

//         this.shape_45 = new cjs.Shape();
//         this.shape_45.graphics.f("#FFFFFF").s().p("AABAyQgOgDgLgIQgJgHgGgNQgFgLAAgOQAAgQAFgKQAFgKAKgFQAKgFAPACQAOACAKAIQAKAJAFAKQAFANAAALIgBAKIhCgLQAAAMAHAIQAGAIAKACQAJABAGgCQAFgCACgGIAVAEQgBAIgGAGQgFAGgJADIgMABIgKgBgAgOgdQgGAFgBALIAnAHQABAAAAAAQABAAABAAQAAAAAAAAQABAAAAgBIABgDQAAgHgFgHQgHgHgKgBIgDAAQgHAAgFADg");
//         this.shape_45.setTransform(28.1,5.8528);

//         this.shape_46 = new cjs.Shape();
//         this.shape_46.graphics.f("#FFFFFF").s().p("AgbAuIAAhfIATADIACAOQAEgHAGgCQAGgDAJACIAJACIAAAUIgHgCQgOgCgGAFQgGAFAAAMIAAA0g");
//         this.shape_46.setTransform(19.95,4.125);

//         this.shape_47 = new cjs.Shape();
//         this.shape_47.graphics.f("#FFFFFF").s().p("AANBBQgNgCgHgJQgHgJAAgOIAAgzIgRgDIAAgSIALACQAEABABgBQACgBAAgEIADgWIARADIAAAdIAWAEIAAASIgWgEIAAAvQAAAIADAEQAEAEAHABIAKACIAAARg");
//         this.shape_47.setTransform(12.15,1.775);

//         this.shape_48 = new cjs.Shape();
//         this.shape_48.graphics.f("#FFFFFF").s().p("AABBEQgVgEgOgOQgNgOgCgUIAXAFQAEAXAXAFQANADAGgEQAHgFAAgJQAAgIgFgFQgGgGgLgEIgKgEQgogOAAgfQgBgMAHgIQAGgHAJgDQAMgCAMADQAWAEAMANQANANABATIgWgEQgCgLgHgGQgHgHgKgCQgKgCgGADQgHAEAAAIQABAHAEAGQAHAGAKAEIAJAEQAXAIAJAKQAKALAAARQAAAMgGAIQgGAIgLACQgFACgHAAIgOgCg");
//         this.shape_48.setTransform(2.9,-0.5318);

//         this.shape_49 = new cjs.Shape();
//         this.shape_49.graphics.f("#FFFFFF").s().p("AgogpIASgEIABAMQAFgHAHgFQAIgGAKgCQAPgDAIAHQAKAIgBARIAAA+IgVAFIAAg7QAAgUgSAEQgHABgHAHQgHAHAAAJIAAA7IgVAEg");
//         this.shape_49.setTransform(654.55,25.33);

//         this.shape_50 = new cjs.Shape();
//         this.shape_50.graphics.f("#FFFFFF").s().p("AgiArQgMgLAAgXQAAgWAMgRQANgPAVgEQAWgEANALQAMALAAAYQAAAWgNAQQgMAPgWAEIgKABQgOAAgKgIgAAAgeQgKACgHAJQgHAKAAAOQAAAPAHAHQAGAGALgCQALgCAHgJQAHgKAAgOQAAgOgHgHQgFgGgIAAIgFABg");
//         this.shape_50.setTransform(643.7,27.1849);

//         this.shape_51 = new cjs.Shape();
//         this.shape_51.graphics.f("#FFFFFF").s().p("AgKgcIAVgEIAABfIgVAEgAgLg+IAXgFIAAAXIgXADg");
//         this.shape_51.setTransform(635.9,26.85);

//         this.shape_52 = new cjs.Shape();
//         this.shape_52.graphics.f("#FFFFFF").s().p("AgHA7QgHgGAAgOIAAgzIgRACIAAgRIALgCIAGgCIABgGIADgWIAQgDIAAAcIAYgEIAAASIgXAEIAAAwQAAAIADACQADACAIgBIALgCIAAASIgSAEIgIAAQgIAAgFgEg");
//         this.shape_52.setTransform(629.725,28.1368);

//         this.shape_53 = new cjs.Shape();
//         this.shape_53.graphics.f("#FFFFFF").s().p("AgfAwQgKgGABgOQAAgKAEgHQAEgHAIgEQAHgDAIgCIAUgGQAFgCADgCQABgBAAgEQAAgDgBgDQgDgEgDgBQgEgCgHABQgJACgEAEQgFAEgCAIIgUADQAAgJAGgIQAEgIAJgGQAJgGANgCQATgDAJAJQALAIgBASIAAA8IgSADIgBgLQgEAFgHAGQgHAFgLABIgJABQgJAAgGgEgAgEAIQgGACgFAEQgFAEAAAFQAAAGAGADQAFADAGgCQAHgBAEgCQAGgEADgDQADgFABgFIAAgMg");
//         this.shape_53.setTransform(621.15,30.994);

//         this.shape_54 = new cjs.Shape();
//         this.shape_54.graphics.f("#FFFFFF").s().p("AgagrIASgDIACANQAEgGAFgGQAIgFAJgBIAIAAIAAATIgHABQgOACgGAHQgGAHAAAMIAAA1IgVADg");
//         this.shape_54.setTransform(613.25,32.1375);

//         this.shape_55 = new cjs.Shape();
//         this.shape_55.graphics.f("#FFFFFF").s().p("AgHA7QgHgGAAgPIAAgzIgRACIAAgRIALgCQAEAAACgCQABAAAAgFIACgXIARgCIAAAcIAYgDIAAASIgYADIAAAvQAAAJAEACQADACAIgBIAKgBIAAARIgSAEIgHAAQgIAAgFgEg");
//         this.shape_55.setTransform(605.4,31.8347);

//         this.shape_56 = new cjs.Shape();
//         this.shape_56.graphics.f("#FFFFFF").s().p("AgbAuQgMgHgBgNIAAAAIAVgDQAEAMAPgCQALgCADgDQAFgEAAgGQAAgFgDgCQgEgCgJAAIgIAAQgSAAgGgGQgIgFAAgMQAAgNAKgKQAKgKARgCQARgCAKAGQALAHABANIgUADQgDgMgQACQgGABgFAEQgFAEAAAFQAAAFADACQAFACAHgBIAIAAQATAAAHAGQAIAFAAANQAAAPgLAJQgMAKgSACIgIABQgMAAgHgFg");
//         this.shape_56.setTransform(597.25,34.3847);

//         this.shape_57 = new cjs.Shape();
//         this.shape_57.graphics.f("#FFFFFF").s().p("AgXAvQgLgFgFgLQgFgLAAgOQAAgNAFgNQAGgNAKgHQAKgIAOgBQAPgDAKAGQAJAEAFAKQAFAKAAANIAAAGIgBAEIhCAIQABAMAGAGQAHAHAKgCQAJgBAFgEQAGgEABgGIAVgDQAAAIgGAIQgFAIgJAFQgLAGgMABIgGABQgLAAgHgEgAABggIABAAQgJABgHAHQgFAHgDALIAogFIAEgCIABgDQAAgHgFgFQgFgEgHAAIgFAAg");
//         this.shape_57.setTransform(587.325,35.6047);

//         this.shape_58 = new cjs.Shape();
//         this.shape_58.graphics.f("#FFFFFF").s().p("AgpBFIAAiHIAWgCIAAAxQAEgGAHgEQAGgEAKgCQARgBAIAIQAJAHAAASIAAA+IgWADIAAg8QAAgTgSADQgIABgGAFQgHAGAAAJIAAA8IgWACg");
//         this.shape_58.setTransform(576.65,35.325);

//         this.shape_59 = new cjs.Shape();
//         this.shape_59.graphics.f("#FFFFFF").s().p("AgXAvQgKgFgGgLQgFgKAAgPQAAgPAFgLQAFgMALgIQAMgIANgBQAOgCAJAFQAJAEAEAIQAFAHABAKIgVACQgBgJgGgDQgGgEgIABQgLABgGAJQgGAJAAAOQAAAPAGAHQAGAIALgCQAJgBAFgFQAGgEACgKIAVgCQgBAKgFAJQgGAJgJAGQgJAGgNACIgGAAQgMAAgHgEg");
//         this.shape_59.setTransform(565.925,38.0486);

//         this.shape_60 = new cjs.Shape();
//         this.shape_60.graphics.f("#FFFFFF").s().p("AgbgsIATgCIACANQAEgIAGgDQAGgFAJgBQAGgBADABIAAATIgHAAQgPACgFAGQgGAIAAAMIAAA0IgWADg");
//         this.shape_60.setTransform(557.775,38.9);

//         this.shape_61 = new cjs.Shape();
//         this.shape_61.graphics.f("#FFFFFF").s().p("AgqA3QgQgSAAgfQAAgfAQgUQAQgUAagCQAcgDAPARQAQAQAAAgQAAAggQATQgPAUgcACIgHAAQgWAAgNgNgAAAgvQgRADgIAMQgJANAAAWQAAAYAJALQAIAMARgCQASgCAIgNQAJgNAAgWQAAgXgJgMQgHgKgPAAIgEAAg");
//         this.shape_61.setTransform(546.9,38.25);

//         this.shape_62 = new cjs.Shape();
//         this.shape_62.graphics.f("#FFFFFF").s().p("AgpgtIATgBIABAMQAEgGAIgFQAHgEALgBQAPAAAJAIQAJAJAAARIAAA+IgWACIAAg7QAAgUgSABQgHAAgIAGQgGAGgBAJIAAA7IgVABg");
//         this.shape_62.setTransform(476.35,44.9736);

//         this.shape_63 = new cjs.Shape();
//         this.shape_63.graphics.f("#FFFFFF").s().p("AgiAnQgNgNAAgXQAAgXANgOQANgOAVgBQAXgBAMAMQANANAAAXQAAAXgNAOQgNAPgWAAIAAAAIgCABQgVAAgLgMgAgSgWQgGAJAAAOQAAAPAGAIQAHAHALAAQAMAAAHgJQAGgIAAgOQAAgQgGgHQgGgIgNAAQgLABgHAIg");
//         this.shape_63.setTransform(465.325,45.5499);

//         this.shape_64 = new cjs.Shape();
//         this.shape_64.graphics.f("#FFFFFF").s().p("AgKgeIAVgBIAABgIgVABgAgKhAIAVgBIAAAWIgVABg");
//         this.shape_64.setTransform(457.4,44.2);

//         this.shape_65 = new cjs.Shape();
//         this.shape_65.graphics.f("#FFFFFF").s().p("AgHA5QgHgGAAgPIAAgzIgRAAIAAgRIAKAAIAGgCIACgFIACgXIARgBIAAAdIAYgBIAAASIgYABIAAAvQAAAJAEACQADADAIgBIALAAIAAARIgKACIgIAAIgEABQgLAAgGgHg");
//         this.shape_65.setTransform(451.15,44.8063);

//         this.shape_66 = new cjs.Shape();
//         this.shape_66.graphics.f("#FFFFFF").s().p("AggAsQgJgHAAgOQAAgJAFgHQAEgGAHgDQAIgDAIgBIAUgEQAGgBACgCQAAAAABgBQAAgBAAAAQABgBAAAAQAAgBAAAAIgCgHQgCgEgEgCQgEgCgHABQgHAAgGAEQgFADgCAIIgUAAQAAgJAFgHQAFgIAJgEQAKgFAMAAQATgBAKAKQAKAJAAATIAAA7IgSABIAAgBIgCgLQgDAFgIAFQgIAEgKABQgRAAgIgHgAgEAIQgHABgEADQgFAEAAAFQAAAGAFADQAFAEAIgBQAGAAAEgCQAGgCADgEQAEgFAAgFIAAgMg");
//         this.shape_66.setTransform(442.475,46.5455);

//         this.shape_67 = new cjs.Shape();
//         this.shape_67.graphics.f("#FFFFFF").s().p("AgnAgIAzg+IgyACIAAgSIBMgDIAAASIgzA+IA1gCIAAASIhPADg");
//         this.shape_67.setTransform(432.6,46.875);

//         this.shape_68 = new cjs.Shape();
//         this.shape_68.graphics.f("#FFFFFF").s().p("AgKgeIAVgBIAABgIgVABgAgLhAIAXgBIAAAWIgXABg");
//         this.shape_68.setTransform(425.4,45.375);

//         this.shape_69 = new cjs.Shape();
//         this.shape_69.graphics.f("#FFFFFF").s().p("AgKhDIAVAAIAACGIgVABg");
//         this.shape_69.setTransform(420.675,45.3);

//         this.shape_70 = new cjs.Shape();
//         this.shape_70.graphics.f("#FFFFFF").s().p("AggArQgJgHAAgNQAAgKAEgHQAEgFAIgDQAHgDAJgCIAUgDIAIgCQABgCAAgDIgBgHQgDgEgDgCQgEgCgIAAQgIABgEADQgGAEgBAHIgUABQABgKAEgGQAGgJAIgEQAJgEAMgBQAUAAAKAKQAKAKAAASIAAA7IgTABIgBgMQgEAGgHAEQgIAEgKAAIgCABQgOAAgJgIgAgEAHQgIACgEADQgEADAAAGQAAAGAFADQAFADAHAAIALgCQAGgCADgEQADgEAAgGIAAgMg");
//         this.shape_70.setTransform(412.975,47.4516);

//         this.shape_71 = new cjs.Shape();
//         this.shape_71.graphics.f("#FFFFFF").s().p("AggAqQgJgJAAgSIAAg+IAWAAIAAA6QAAATASABQAJgBAGgFQAGgHAAgIIAAg6IAWgBIAABgIgTAAIgCgMQgEAHgIADQgIAFgIAAQgRAAgIgIg");
//         this.shape_71.setTransform(402.475,47.75);

//         this.shape_72 = new cjs.Shape();
//         this.shape_72.graphics.f("#FFFFFF").s().p("AgcArQgLgIgBgNIAVgBQADAMAQAAQAJAAAFgDQAFgEAAgGQAAgFgEgDQgEgCgIgBIgIgBQgRgBgIgHQgIgGAAgNQAAgNALgIQAKgJARAAQASAAAJAHQALAIABAOIgVAAQgDgMgPAAQgHAAgFADQgFAEAAAFQAAAFAEACQAEADAIAAIAHABQASACAJAHQAIAGAAANQAAAOgLAJQgLAIgTAAIgBAAQgQAAgLgHg");
//         this.shape_72.setTransform(392.375,47.8766);

//         this.shape_73 = new cjs.Shape();
//         this.shape_73.graphics.f("#FFFFFF").s().p("AgKgeIAVgBIAABgIgVABgAgLgrIAAgVIAXgBIAAAWg");
//         this.shape_73.setTransform(385.35,46.325);

//         this.shape_74 = new cjs.Shape();
//         this.shape_74.graphics.f("#FFFFFF").s().p("Ag4hAIAYAAIAeBlQABABAAAAQAAABABAAQAAAAAAABQAAAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBIAfhmIAYAAIgsCCIgbABg");
//         this.shape_74.setTransform(377.05,46.425);

//         this.shape_75 = new cjs.Shape();
//         this.shape_75.graphics.f("#FFFFFF").s().p("AAVAxIgVglIgVAlIgZgBIAigxIgfgvIAZABIATAhIAUghIAYAAIggAvIAiAxg");
//         this.shape_75.setTransform(309.875,48.3);

//         this.shape_76 = new cjs.Shape();
//         this.shape_76.graphics.f("#FFFFFF").s().p("AgXAsQgMgHgFgLQgEgLAAgPQgBgNAGgMQAFgMALgGQALgHANABQAPAAAJAGQAKAGAFALQAFAKABANIAAAFIgBAFIhEgBQACAMAGAHQAGAHALAAQAIAAAGgDQAGgEABgFIAWAAQgBAHgGAIQgFAHgKAEQgJAEgMAAQgOAAgLgGgAgNgaQgGAFgDAMIAoAAIAEgBQAAAAABgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgHgFgGQgGgGgKAAQgKAAgFAGg");
//         this.shape_76.setTransform(299.95,48.2232);

//         this.shape_77 = new cjs.Shape();
//         this.shape_77.graphics.f("#FFFFFF").s().p("AgaA+QgJgGgFgMQgFgLAAgPQAAgQAFgKQAGgMAJgFQAKgHANABQAHAAAIADQAHAEAFAFIAAgwIAVAAIAACGIgSAAIgCgNQgFAIgIADQgHADgKAAQgLAAgLgGgAgQgEQgHAHAAAPQAAAPAHAIQAHAIAKAAQAKAAAHgFQAHgHAAgIIAAgWQAAgIgHgFQgGgGgLAAQgLAAgGAIg");
//         this.shape_77.setTransform(288.675,46.25);

//         this.shape_78 = new cjs.Shape();
//         this.shape_78.graphics.f("#FFFFFF").s().p("AAUAyIAAg7QAAgTgSgBQgIAAgGAFQgHAEAAAKIAAA7IgWgBIAAhgIATABIABAMQAFgGAHgEQAJgEAJABQAPAAAJAJQAJAJAAARIAAA/g");
//         this.shape_78.setTransform(277.875,47.8472);

//         this.shape_79 = new cjs.Shape();
//         this.shape_79.graphics.f("#FFFFFF").s().p("AgKBBIAAiCIAVABIAACCg");
//         this.shape_79.setTransform(269.85,46.025);

//         this.shape_80 = new cjs.Shape();
//         this.shape_80.graphics.f("#FFFFFF").s().p("AgCBEQgWgBgLgIQgMgHAAgNQAAgHAEgFQAFgFAHgBQgFgEgCgDQgDgEAAgGQAAgGAEgEQADgFAHgCQgOgJAAgQQAAgPALgIQAKgHATAAQANABAJAFIAbABIAAAQIgNgBQAEAGAAAHQAAAOgLAIQgKAHgTgBIgOgCQgHADAAAEQAAAHAKAAIAYABQAPABAJAIQAKAIgBANQAAAQgMAIQgKAHgUAAIgFgBgAgVAcQgEADAAAFQAAAHAGADQAHAEALABQAZABAAgOQAAgGgEgDQgEgCgHgBIgXgBQgEAAgDADgAgPgwQgEAEAAAHQAAAHAEAEQAGAEAJABQATABgBgPQAAgHgFgFQgEgDgJgBQgJAAgGADg");
//         this.shape_80.setTransform(199.1,47.1543);

//         this.shape_81 = new cjs.Shape();
//         this.shape_81.graphics.f("#FFFFFF").s().p("AAUAxIAAg6QAAgUgSgBQgHAAgHAEQgHAEAAALIAAA6IgWgBIAAhgIATABIABANQAFgHAHgDQAIgDAJAAQAQABAJAJQAJAKAAARIAAA/g");
//         this.shape_81.setTransform(188.575,44.825);

//         this.shape_82 = new cjs.Shape();
//         this.shape_82.graphics.f("#FFFFFF").s().p("AgKBBIAAhgIAVABIAABggAgKgsIAAgVIAVABIAAAWg");
//         this.shape_82.setTransform(180.75,42.7);

//         this.shape_83 = new cjs.Shape();
//         this.shape_83.graphics.f("#FFFFFF").s().p("AAUAxIAAg6QAAgUgSgBQgIAAgGAEQgHAFAAAKIAAA6IgWgBIAAhgIASABIADANQAEgHAHgDQAHgEAKABQAQABAJAKQAJAIAAATIAAA+g");
//         this.shape_83.setTransform(173,43.95);

//         this.shape_84 = new cjs.Shape();
//         this.shape_84.graphics.f("#FFFFFF").s().p("AgaAwIAAhgIASABIACAOQAEgHAFgDQAIgDAIAAQAHAAABACIAAATIgGgBQgNAAgHAFQgGAGAAAMIAAA0g");
//         this.shape_84.setTransform(164.35,43.275);

//         this.shape_85 = new cjs.Shape();
//         this.shape_85.graphics.f("#FFFFFF").s().p("AAXAyIABgBIgCgLQgEAFgHAEQgIADgKgBQgQgBgJgIQgJgJAAgNQAAgKAFgGQADgEAIgDQAGgCAKgBIAUgBIAIgCQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgBAAgBIgBgHIgGgGQgFgDgHAAQgHAAgFADQgGADgBAHIgUgBQABgJAEgHQAFgHAJgEQAJgDAMAAQATACALAKQAKAMAAARIAAA8gAgEAGQgIABgDADQgFACAAAGQAAAGAFAEQAFAEAIAAIAKgBQAFgBAEgEQADgDAAgGIAAgMg");
//         this.shape_85.setTransform(154.975,42.8219);

//         this.shape_86 = new cjs.Shape();
//         this.shape_86.graphics.f("#FFFFFF").s().p("AABAyQgQgBgJgHQgKgHgFgMQgGgLAAgOQABgOAFgMQAGgMAJgFQALgGAOABQAPACAKAGQAJAHAGALQAEAMAAAMIgBAJIhDgFQACAMAGAIQAGAIALAAQAIABAGgDQAGgDACgGIAUACIAAAAQgBAJgFAFQgFAHgJAEQgHADgKAAIgGgBgAgOgbQgGAFgCALIAoADQABABAAAAQABAAABAAQAAAAAAgBQABAAAAAAQAAAAAAAAQABgBAAAAQAAgBAAAAQAAgBAAgBQAAgHgFgGQgGgGgLgBIgBAAQgIAAgGAFg");
//         this.shape_86.setTransform(144.65,42.004);

//         this.shape_87 = new cjs.Shape();
//         this.shape_87.graphics.f("#FFFFFF").s().p("AgoA+IAAiCIAWACIAABuIA7AFIAAAUg");
//         this.shape_87.setTransform(135.175,39.575);

//         this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.pltform_copy2, new cjs.Rectangle(-2.1,-8.6,673.4,67.39999999999999), null);


//     (lib.platform_control = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // timeline functions:
//         this.frame_0 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_9 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_26 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_47 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_56 = function() {
//             var _this = this;

//             _this.stop();
//         }

//         // actions tween:
//         this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9).call(this.frame_9).wait(17).call(this.frame_26).wait(21).call(this.frame_47).wait(9).call(this.frame_56).wait(5));

//         // Layer_1
//         this.instance = new lib.platform_hover1a_1();
//         this.instance.setTransform(611,341.5,1,1,0,0,0,611,341.5);
//         this.instance.alpha = 0;
//         this.instance._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(19).to({_off:false},0).to({alpha:1},7).wait(13).to({alpha:0},7).wait(3).to({alpha:1},0).to({alpha:0},7).wait(5));

//         this._renderFirstFrame();

//     }).prototype = p = new cjs.MovieClip();
//     p.nominalBounds = new cjs.Rectangle(0,0,1222,683);


//     (lib.data_1 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1_copy
//         this.instance = new lib.data_ani();
//         this.instance.setTransform(611,561.5,1,1,0,0,0,611,341.5);
//         this.instance.alpha = 0;

//         this.timeline.addTween(cjs.Tween.get(this.instance).to({y:341.5,alpha:1},132).wait(1));

//         // Layer_1
//         this.instance_1 = new lib.data_ani();
//         this.instance_1.setTransform(611,341.5,1,1,0,0,0,611,341.5);

//         this.timeline.addTween(cjs.Tween.get(this.instance_1).to({y:121.5},132).wait(1));

//         this._renderFirstFrame();

//     }).prototype = p = new cjs.MovieClip();
//     p.nominalBounds = new cjs.Rectangle(0,-220,1222,1123);


//     (lib.bi5 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#393E46").s().p("AhhBiQgVgCgRgNQgQgNgIgUQgHgWAFgTQAEgUAQgPQAWgVAeAAIAEAAIABgDQAOgWAWgNQAYgMAYAAQAKAAALACQAgAHAUAWQAVAVAFAfIABAGIAKgBQAWAAAQAPQAQAPAAAXQAAAXgQAPQgPAQgXAAgAiEgRQgNAMgEAQQgEASAGAQQAFARAPALQANALASABIDOABQARAAANgMQAMgNAAgRQAAgRgMgMQgNgNgRAAIgPACQAAAAgBAAQgBAAAAgBQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAgBAAAAQgBAAAAgBIgBgLQgEgbgTgTQgSgTgbgFQgKgDgJAAQgVAAgVALQgUAMgLATIgDAGIgDACIgDABIgHAAIgCAAQgYAAgRARg");
//         this.shape.setTransform(32.0204,17.6459,1.15,1.15);

//         this.shape_1 = new cjs.Shape();
//         this.shape_1.graphics.f("#393E46").s().p("AgRASQgIgHAAgLIABgGQACgGAFgFQAEgEAGgCQAHgCAFABQAHACAEAEQAFAEACAGQADAFgBAGQgBAHgDAFQgEAFgGADQgGADgFAAQgKAAgHgIgAgEgLIgFAEIgDAFIAAACQAAAGAEADQAEAEAEAAQADAAACgBQADgBACgDIACgFIABgDIgBgEIgDgEIgEgDIgFgBg");
//         this.shape_1.setTransform(32.0683,41.4139,1.15,1.15);

//         this.shape_2 = new cjs.Shape();
//         this.shape_2.graphics.f("#393E46").s().p("AgNAVQgHgEgDgHQgDgIACgGQACgHAFgGQAGgFAHgCQAGgBAIACQAHAEAEAGQAEAHABAGIgBAFQgBAHgEAEQgDAEgGADQgFACgGAAQgHABgGgFgAgIgIQgEAEAAAEQAAAFAEAEQAEAEAEAAIAGgBIAEgEIACgFIABgDQAAgFgEgDQgDgEgGAAQgDAAgFAEg");
//         this.shape_2.setTransform(44.5889,35.9021,1.15,1.15);

//         this.shape_3 = new cjs.Shape();
//         this.shape_3.graphics.f("#393E46").s().p("AgQATQgHgGgBgKQgCgIAGgJQAGgHAJgDQAIgCAJAFQAJAEADAKQADAHgDAKQgEAIgJAFQgGADgFAAQgIAAgIgHgAgIgIQgEAEAAAEQAAAFAEAEQAEAEAEAAIAGgBIAEgEIADgFIAAgDQAAgEgEgEQgEgEgFAAQgEAAgEAEg");
//         this.shape_3.setTransform(19.5449,35.8829,1.15,1.15);

//         this.shape_4 = new cjs.Shape();
//         this.shape_4.graphics.f("#393E46").s().p("AgDAwQgBgBAAAAQgBgBAAAAQAAgBAAgBQAAAAAAgBIAAhVQAAgBAAAAQAAgBAAgBQAAAAABgBQAAAAABgBQAAAAABgBQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAAAQAAABAAAAQAAABAAABIAABVQAAABAAABQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAABQgBAAAAAAQgBABgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQgBAAAAAAQgBgBAAAAg");
//         this.shape_4.setTransform(32.0252,34.0909,1.15,1.15);

//         this.shape_5 = new cjs.Shape();
//         this.shape_5.graphics.f("#393E46").s().p("AgKAkQgKAAgGgHQgGgGAAgJIAAgqQAAgBAAAAQAAgBAAgBQABAAAAgBQAAAAABgBQAAAAABgBQAAAAABAAQAAgBABAAQABAAAAAAQABAAAAAAQABAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAAAQAAABAAAAQAAABAAABIAAAqQAAAEADADQADACAEAAIAlAAQAAAAABAAQABABAAAAQABAAAAAAQABABAAAAQABABAAAAQAAABABAAQAAABAAABQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBABQAAAAgBABQAAAAgBAAQAAABgBAAQgBAAAAAAg");
//         this.shape_5.setTransform(39.3277,32.4809,1.15,1.15);

//         this.shape_6 = new cjs.Shape();
//         this.shape_6.graphics.f("#393E46").s().p("AgZAkQgBAAgBAAQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAABAAQAAAAABgBQABAAABAAIAkAAQADAAAEgCQACgEAAgDIAAgqQAAgBABgBQAAAAAAgBQAAAAABgBQAAAAAAgBQABAAAAgBQABAAAAAAQABgBABAAQAAAAABAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAABIAAAqQAAAJgGAGQgGAHgKAAg");
//         this.shape_6.setTransform(24.809,32.4809,1.15,1.15);

//         this.shape_7 = new cjs.Shape();
//         this.shape_7.graphics.f("#D4DBE4").s().p("AgOAPQgGgGAAgJQAAgIAGgGQAGgGAIAAQAJAAAGAGQAGAGAAAIQAAAJgGAGQgGAGgJAAQgIAAgGgGg");
//         this.shape_7.setTransform(32.0827,41.1633,1.15,1.15);

//         this.shape_8 = new cjs.Shape();
//         this.shape_8.graphics.f("#D4DBE4").s().p("AgKALQgFgFAAgGQAAgGAFgEQAFgFAFAAQAGAAAFAFQAFAEAAAGQAAAHgFAEQgEAFgHAAQgFAAgFgFg");
//         this.shape_8.setTransform(44.8189,35.7009,1.15,1.15);

//         this.shape_9 = new cjs.Shape();
//         this.shape_9.graphics.f("#D4DBE4").s().p("AgKALQgFgEAAgHQAAgGAFgEQAFgFAFAAQAHAAAEAFQAFAEAAAGQAAAGgFAFQgEAFgHAAQgFAAgFgFg");
//         this.shape_9.setTransform(19.3178,35.7009,1.15,1.15);

//         this.shape_10 = new cjs.Shape();
//         this.shape_10.graphics.f().rs(["rgba(212,219,228,0.647)","#FFFFFF"],[0,1],20.9,-40.9,0,20.9,-40.9,76.8).ss(1,0,0,4).p("AAAkiQB5AABVBWQBVBVAAB3QAAB5hVBVQhVBVh5AAQh3AAhVhVQhWhVAAh5QAAh3BWhVQBVhWB3AAg");
//         this.shape_10.setTransform(32.0472,24.6575,1.1499,1.1499);

//         this.shape_11 = new cjs.Shape();
//         this.shape_11.graphics.rf(["#FFFFFF","#F0F3F7"],[0,0.918],-10.5,-26.9,0,-10.5,-26.9,47.4).s().p("AjQDRQhXhWAAh7QAAh5BXhXQBXhXB5AAQB7AABWBXQBXBXAAB5QAAB7hXBWQhWBXh7AAQh5AAhXhXg");
//         this.shape_11.setTransform(32.0472,24.6575,1.1499,1.1499);

//         this.shape_12 = new cjs.Shape();
//         this.shape_12.graphics.f("#393E46").s().p("AAUA9QgHgCgEgFQgDgEAAgGQAAgHADgDQAEgDAEgCQgDgBgCgDQgCgCAAgFQAAgFADgDQABgDAGgCQgGgDgBgEQgCgEAAgGQAAgLAGgFQAIgHAOAAIAKABIAHACIATAAIAAAKIgKAAQADAFAAAGQAAAGgDAFQgDAEgGADQgHADgKAAQgHAAgFgCIgEADQgBABAAAAQAAAAgBABQAAAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQABABAAAAQAAAAABABQADABADAAIAUAAQAMAAAGAGQAGAGAAAJQAAAKgIAHQgKAGgQAAQgMAAgHgDgAAYAhIgEADQgCACAAAEQAAAFAFADQAEADAMAAQALAAAGgDQAEgDAAgGQAAgFgDgCQgDgCgGAAIgTAAIgFABgAAagVQgDADAAAGQAAAGADADQAFADAJAAQAIAAAEgDQAFgDAAgGQAAgGgFgDQgEgEgIAAQgIAAgGAEgABhAhQgHgFgEgIQgEgJAAgKQAAgJAEgJQADgHAIgGQAHgFALAAQAKAAAIAEQAHAFADAHQAEAIAAAJIAAADIgBADIgzAAQABALAFAGQAFAGAKAAQAHAAAFgDQAFgCABgGIANAAQgCAGgEAFQgEAFgFADQgGACgLAAQgLAAgHgEgABmgTQgGAGgBAJIAjAAIADgBIABgDQAAgHgFgEQgFgFgJAAQgIAAgFAFgAg6AhQgHgFgDgIQgEgIAAgLQAAgKAEgIQAEgIAGgFQAHgFALAAQAHAAAEADQAGACAEAFIAAgmIANAAIAABjIgLAAIgBgKQgDAGgHADQgFACgIAAQgKAAgHgEgAg2gRQgGAHABALQgBALAGAHQAFAHAKAAQAGAAAEgCQAEgBAEgEQACgEAAgGIAAgQQAAgFgCgEQgEgEgEgCQgEgCgGAAQgKAAgFAHgAiSAkIAAhgIA9AAIAAAMIgwAAIAAAdIArAAIAAAMIgrAAIAAAfIAxAAIAAAMg");
//         this.shape_12.setTransform(31.5623,88.6315,1.33,1.33);

//         this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

//         // Layer_2
//         this.instance = new lib.shadow_bottom();
//         this.instance.setTransform(36.75,28.4,1.15,1.15,0,0,0,32.5,32.6);

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.bi5, new cjs.Rectangle(-2.4,-9.8,76.80000000000001,107), null);


//     (lib.bi4 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#393E46").s().p("ABvCCQgHgGgCgJIANAAQABAEACACQADADAEAAIAHABQAGAAAFgCQAFgEAAgFQAAgFgEgCQgEgCgGgBIgGAAQgLgCgHgEQgGgFAAgJQAAgJAHgHQAIgGAMAAQANAAAHAGQAHAGABAJIgMAAQgCgGgEgCQgEgCgFAAQgHAAgEADQgEADAAAEQAAAEACACQACACAIABIAHABQAHABAFACQAGABADAFQAEAFAAAGQAAAKgIAGQgHAHgOAAQgNAAgIgGgAAGCDQgHgFgEgIQgDgIAAgLQAAgMADgHQAEgIAHgFQAHgFAMAAQALAAAHAFQAIAFAEAIQADAHAAAMQAAALgDAIQgEAIgIAFQgHAFgLAAQgMAAgHgFgAAJBQQgFAHAAAMQAAAMAFAHQAGAGAKAAQAKAAAFgGQAGgIAAgLQAAgMgGgHQgFgHgKAAQgKAAgGAHgAhKCDQgHgEgEgJQgEgJAAgKQAAgKAEgJQADgIAIgFQAHgFAMAAQALAAAHAFQAIAFAEAIQAEAJAAAKQAAAKgEAJQgEAIgIAFQgHAFgLAAQgMAAgHgFgAhHBQQgFAHAAAMQAAAMAFAHQAGAGAKAAQAKAAAFgGQAGgIAAgLQAAgMgGgHQgFgHgKAAQgKAAgGAHgABLCGIAAhkIANAAIAABkgAiECGIAAhVIgeAAIAAgLIBJAAIAAALIgeAAIAABVgAEjgHIAAgKIAEAAIAHgBIAFgEQADgDABgFIADgGIgEAAIgahFIAOAAIASA1QAAABAAAAQAAABABAAQAAAAAAABQAAAAABAAQAAAAAAAAQAAgBABAAQAAAAAAgBQABAAAAgBIASg1IANAAIgcBNQgEALgGAFQgFAFgKAAgAD5gnQgFgFAAgJIAAgpIgNAAIAAgLIAIAAIAFgBIABgEIACgQIAKAAIAAAVIASAAIAAALIgSAAIAAAnQAAAFACADQADADAHAAIAIAAIAAAKIgNABQgLAAgEgGgABygnQgGgFAAgKQAAgHADgEQADgFAFgCIAMgDIAQgCIAGgCQABAAAAgBQAAAAAAgBQABAAAAgBQAAAAAAgBIgCgGQgBgDgEgCQgDgCgGAAQgHAAgFADQgEADgBAGIgMAAQAAgGAEgFQADgFAHgEQAGgDAJAAQAOAAAHAIQAHAHAAANIAAAsIgKAAIgBgIQgDAEgGADQgGADgIAAQgMAAgHgGgACFhCQgGABgDADQgEACAAAFQAAAGAEADQAEACAHAAQAFAAAEgBQAFgCADgDQADgDAAgFIAAgLgAhZgmQgHgFgEgIQgDgIAAgLQAAgLADgIQAEgIAHgFQAHgFAKAAQAGAAAHADQAFACAEAFIAAgmIANAAIAABkIgLAAIgBgJQgEAFgGADQgGADgIAAQgKAAgGgFgAhVhZQgFAHAAAMQAAAMAFAGQAFAHAKAAQAFAAAFgBQAEgCADgEQADgDAAgHIAAgRQAAgGgDgDQgCgDgFgDIgJgCQgKAAgGAHgAC7gjIAAhGIALAAIABAKQADgFAFgDQAEgDAIAAIAGABIAAAKIgEAAQgWAAAAAUIAAAogAAfgjIAAhgIAhAAQASAAAIAIQAJAIAAAOQAAANgJAJQgIAIgSAAIgUAAIAAAkgAAshSIAUAAQALAAAFgFQAFgEAAgKQAAgJgFgGQgGgEgKAAIgUAAgAiWgjIAAhGIALAAIABAKQADgFAFgDQAFgDAHAAIAHABIAAAKIgFAAQgVAAAAAUIAAAogAi3gjIAAhGIANAAIAABGgAjXgjIAAgsQAAgRgQAAIgJACQgEADgDADQgDAEAAAFIAAAsIgMAAIAAhkIAMAAIAAAmQAFgFAEgCQAHgDAHAAQAMAAAGAHQAHAHAAAMIAAAugAlAgjIAAhVIgeAAIAAgLIBJAAIAAALIgeAAIAABVgAgXhEIAAgLIAmAAIAAALgAi3h2IAAgNIANAAIAAANg");
//         this.shape.setTransform(34.2152,100.9044,1.33,1.33);

//         this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

//         // Layer_1
//         this.shape_1 = new cjs.Shape();
//         this.shape_1.graphics.f("#393E46").s().p("AgmA6QgQgLgJgUQgIgUAEgUQAEgUAPgPQAQgPATgEQAVgEATAIQATAIAMARQAMASAAAUQAAAdgVAUQgUAVgdAAQgUAAgSgMgAgggwQgOAJgIARQgHARAEARQADASANAMQANAMASAEQARADAQgGQAQgHAKgPQAKgPAAgSQAAgXgRgSQgSgRgYAAQgRAAgPAKg");
//         this.shape_1.setTransform(33.1208,28.6782,1.15,1.15);

//         this.shape_2 = new cjs.Shape();
//         this.shape_2.graphics.f("#393E46").s().p("AAiCIIgEgDIgSgZIgYAAIAAAAIgTAZQgCACgDABQgDABgDgBIgYgLQgDAAgCgDIgBgGIAFgfIAAAAIgSgSIAAAAIgfAEQgCABgEgCQgCgBgCgDIgKgZIAAgGQABgCACgDIAZgSIABAAIAAgXIgBgBIgYgTQgCgCgBgDQgBgDABgDIAKgZIAEgEQADgBADAAIAfAEIARgQIAAAAIAAgBIgEgfIACgGIAEgEIAZgKIAGAAQADABABACIAUAZIAAABIAWAAIABgBIATgYIAFgEIAGABIAYAKQAEACABACQABADAAADIgEAfIAAABIAAAAIAQAQIABAAIAfgEIAFABQAEADAAACIAKAZQACADgBACQgBAEgCABIgaATIAAAYIAAAAIAZATQACABABAEQABADgBACIgKAZIgEAEIgGACIgfgFIAAAAIgBAAIgRARIAAABIAEAeQABADgCADQgBADgDABIgZAKIgDABgAAMBiIAEABIAEADIASAYIAXgJIgEgeIAAgFQABgDACgBIARgRIAEgDIAGAAIAdAEIAKgXIgYgSIgDgEIgBgFIAAgWIABgFIADgEIAYgSIgJgXIgeADIgFAAQgDgBgCgCIgPgQQgCgCgBgCIgBgFIAEgfIgWgJIgTAYIgFADIgFABIgVAAIgFgBIgEgDIgSgZIgXAKIADAeIAAAFIgDAEIgQAQQgBACgDABIgFAAIgfgEIgJAXIAYATIADAEIABAFIAAAWIgBAFIgDAEIgZASIAKAXIAegEIAFAAIAEADIARARIADAEIAAAGIgEAdIAWAKIASgYIAEgDIAGgBgAgmA6QgQgLgJgUQgIgUAEgUQAEgUAPgPQAQgPATgEQAVgEATAIQATAIAMARQAMASAAAUQAAAdgVAUQgUAVgdAAQgUAAgSgMgAgggwQgOAJgIARQgHARAEARQADASANAMQANAMASAEQARADAQgGQAQgHAKgPQAKgPAAgSQAAgXgRgSQgSgRgYAAQgRAAgPAKg");
//         this.shape_2.setTransform(33.1072,28.6542,1.15,1.15);

//         this.shape_3 = new cjs.Shape();
//         this.shape_3.graphics.f("#D4DBE4").s().p("AAlCEIgCgBIgTgaIgBgBIgDgBIgYAAIgCABIgCABIgTAZQAAAAAAABQAAAAgBAAQAAAAAAAAQgBAAAAABIgCAAIgZgLIgCgBIAAgDIAEgfIAAgCIgCgDIgRgRIgCgCIgCAAIgfAFIgDgBIgBgCIgKgYQgBgBAAAAQAAgBAAAAQAAAAAAAAQAAgBABAAIABgCIAZgTIACgCIAAgCIAAgXIAAgCIgCgCIgZgUIgBgCQAAAAAAgBQgBAAAAAAQAAgBABAAQAAAAAAAAIALgaIABgBIACAAIAgADIACAAIADgCIAPgPIACgDIAAgCIgDggIAAgCIACgBIAZgKQAAgBABAAQAAAAAAAAQAAAAABAAQAAAAAAABIADABIATAZIACACIACAAIAWAAIADAAIABgCIAUgZIADgBIACAAIAZAKQAAABAAAAQABAAAAAAQAAAAAAAAQAAABABAAIAAACIgEAgIAAACIACACIAPAQIADACIACAAIAfgEIADABIACACIAKAZIAAACIgBADIgaATIgBACIAAACIgBAXIABACIABACIAZATQAAAAABABQAAAAAAAAQAAAAAAABQAAAAAAABIAAACIgKAZIgBACIgDAAIgfgFIgCAAQgBAAAAABQgBAAAAAAQAAAAAAAAQgBABAAAAIgRAQIgCADIAAADIAFAeIgBADIgCACIgYAKgAgLg+QgUAEgNANQgOAPgEATQgEARAIATQAHARAQAMQARALASAAQAcgBASgSQASgTABgbQAAgSgLgRQgLgQgSgHQgMgFgNAAIgLABg");
//         this.shape_3.setTransform(33.0698,28.6398,1.15,1.15);

//         this.shape_4 = new cjs.Shape();
//         this.shape_4.graphics.f().rs(["rgba(212,219,228,0.647)","#FFFFFF"],[0,1],20.9,-40.9,0,20.9,-40.9,76.8).ss(1,0,0,4).p("AAAkiQB5AABVBWQBVBVAAB3QAAB5hVBVQhVBVh5AAQh3AAhVhVQhWhVAAh5QAAh3BWhVQBVhWB3AAg");
//         this.shape_4.setTransform(32.1515,28.6093,1.1499,1.1499);

//         this.shape_5 = new cjs.Shape();
//         this.shape_5.graphics.rf(["#FFFFFF","#F0F3F7"],[0,1],-22.1,-21.6,0,-22.1,-21.6,51.6).s().p("AjQDRQhXhWAAh7QAAh5BXhXQBXhXB5AAQB7AABWBXQBXBXAAB5QAAB7hXBWQhWBXh7AAQh5AAhXhXg");
//         this.shape_5.setTransform(32.1515,28.6093,1.1499,1.1499);

//         this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

//         // Layer_2
//         this.instance = new lib.shadow_bottom();
//         this.instance.setTransform(34,32.4,1.15,1.15,0,0,0,32.5,32.5);

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.bi4, new cjs.Rectangle(-12.5,-5.8,93.5,124.8), null);


//     (lib.bi3 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#393E46").s().p("AhEB6QgLgMAAgZQABgYAKgNQAMgNAUAAQALAAAHAEQAHAEAGAIQAEAHABAKIgMAAQgCgJgGgHQgHgFgJAAQgOAAgHAJQgIALAAASQAAATAIAKQAHAKANAAQAJAAAIgGQAGgFACgKIAMAAQgBAPgJAIQgKAJgRAAQgVAAgKgNgAFkCBQgHgFgBgKIAMAAQABAEACACQAEADACABIAIABQAGAAAEgDQAFgCABgHQAAgFgEgCQgDgCgHAAIgHgBQgLgCgFgEQgHgEAAgKQAAgJAHgGQAIgGANAAQAMAAAHAFQAGAGACAJIgMAAQgCgGgEgCIgJgCQgIAAgDADQgFADAAAEQABAEACACQADADAIAAIAGABQAJABADACQAGACADAEQADAEAAAIQABAKgJAGQgHAGgNAAQgOAAgHgGgADqCCQgGgEgEgIQgEgJgBgKQABgKAEgKQAEgJAGgEQAIgEALAAQALAAAGAEQAHAEADAIQAFAHAAAJIgBAIIgzAAQAAAKAGAGQAEAGAKAAQAJAAADgDQAFgDABgFIANAAQgBAGgEAFQgFAGgFACQgHADgJAAQgLAAgIgFgADvBNQgGAGAAAJIAjAAIACgBIABgDQAAgGgEgFQgGgFgIAAQgJAAgFAFgAC2CCQgFgFABgKIAAgpIgOAAIAAgLIAIAAIAFAAIACgFIABgQIAKAAIAAAVIASAAIAAALIgSAAIAAAnQAAAGACACQADADAHAAIAIAAIAAAKIgNABQgLAAgEgFgAAcCCQgHgEgEgIQgEgJAAgKQAAgKAEgKQAEgJAHgEQAHgEALAAQAMAAAFAEQAIAEADAIQAEAHAAAJIgBAIIgzAAQAAAKAGAGQAEAGALAAQAHAAAFgDQAFgDABgFIAMAAQgBAGgEAFQgEAGgGACQgGADgKAAQgLAAgHgFgAAhBNQgGAGAAAJIAiAAIADgBIABgDQAAgGgFgFQgFgFgJAAQgIAAgFAFgAizCCQgGgGAAgKQAAgHADgEQADgFAFgCIAMgDIARgCQAEAAABgCQAAAAABgBQAAAAAAgBQAAAAAAgBQABAAAAgBIgCgGQgBgDgEgCQgDgCgGAAQgIAAgEADQgFADAAAGIgMAAQAAgFAEgGQAEgGAFgCQAIgDAIAAQAOAAAGAHQAIAHAAANIAAAsIgKAAIgBgIQgEAEgFADQgGADgJAAQgMAAgGgFgAigBnQgHABgDACQgDADAAAFQAAAFAEADQAEADAGAAQAGAAAEgCQAEgCADgDQADgDABgEIAAgLgAjhCCQgFgFAAgKIAAgpIgNAAIAAgLIAJAAIADAAIACgFIACgQIAKAAIAAAVIASAAIAAALIgSAAIAAAnQAAAGACACQACADAIAAIAHAAIAAAKIgMABQgLAAgEgFgAkyCCQgGgGAAgKQAAgHADgEQADgFAFgCIAMgDIARgCIAFgCQAAAAABgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIgBgGQgCgDgDgCQgEgCgFAAQgIAAgEADQgFADAAAGIgMAAQAAgFAEgGQAEgGAGgCQAGgDAJAAQANAAAHAHQAIAHAAANIAAAsIgKAAIgBgIQgDAEgGADQgGADgJAAQgLAAgHgFgAkfBnQgHABgCACQgEADAAAFQAAAFAEADQAEADAGAAQAFAAAFgCQAEgCADgDQADgDAAgEIAAgLgAEtCFIAAhGIALAAIABAKQADgFAFgDQAFgDAHAAIAHABIAAALIgFAAQgWAAABATIAAAogACOCFIAAgsQAAgQgQAAQgFAAgEACQgFABgCAEQgDAEAAAGIAAArIgMAAIAAhGIALAAIABAJQADgFAGgDQAGgCAHAAQAMAAAGAGQAHAHAAAMIAAAugAmVCFIAAhgIAjAAQAWAAAMANQAKAMABAXQgBAXgKANQgLAMgXAAgAmHB6IAVAAQAQAAAHgJQAIgJAAgTQAAgSgIgJQgHgJgQAAIgVAAgAl7goQgKgFgFgMQgEgLAAgQQAAgQAEgKQAFgMAKgGQAKgGANAAQAOAAAKAGQAJAHAFALQAFAKAAAQQAAAQgFALQgFALgJAGQgKAGgOAAQgNAAgKgGgAl5hwQgIAKAAASQAAATAIAKQAHAKAOAAQAPAAAHgKQAIgKAAgTQAAgSgIgKQgHgKgPAAQgOAAgHAKgAFbgoQgIgFgBgKIAMAAQAAADADADIAHAEIAHABQAGAAAFgDQAFgCAAgHQgBgEgDgDQgDgCgHAAIgGgBQgLgCgHgEQgFgEAAgKQgBgKAIgFQAGgGAOAAQANAAAGAFQAHAHABAIIgMAAQgBgGgFgCIgJgCQgHAAgEADQgEACAAAFQAAAEACACQADACAIABIAGABIANADQAFACAEAEQACAEAAAIQAAAKgHAGQgIAGgNAAQgOAAgGgGgAEVgnQgHgEgEgIQgEgKAAgJQAAgKAEgKQAEgJAHgEQAIgEAKAAQALAAAHAEQAHAEADAIQAEAHAAAJIgBAIIgzAAQABALAEAFQAGAGAKAAQAHAAAEgDQAGgDABgFIAMAAQAAAGgEAFQgFAGgGACQgGADgJAAQgLAAgIgFgAEZhcQgFAFgBAKIAjAAIADgBIABgDQAAgGgFgFQgFgFgJAAQgIAAgGAFgADJgoQgHgFgCgKIANAAQABAEACACQADADAEABIAHABQAGAAAFgDQAEgCAAgHQAAgFgDgCQgEgCgGAAIgGgBQgMgCgGgEQgGgEAAgKQAAgJAHgGQAIgGANAAQANAAAGAFQAHAGABAJIgMAAQgBgGgFgCIgJgCQgHAAgFADQgEADABAEQAAAEACACQADADAHAAIAHABQAIABAEACQAGACADAEQADAEABAIQAAAKgJAGQgHAGgNAAQgOAAgHgGgAgVgnQgHgEgEgIQgDgIgBgLQABgLADgJQAEgIAIgFQAHgEALAAQAJAAAHAEQAHAEAEAIQADAGAAAKIAAAEIgBAEIgyAAQABAKAFAGQAFAGAKAAQAHAAADgDQAFgDACgFIAMAAQAAAFgEAGQgGAGgFACQgGADgIAAQgLAAgIgFgAgQhcQgFAFgCAKIAiAAIAEgBIAAgDQAAgGgFgFQgFgFgHAAQgJAAgFAFgAClgkIAAhGIANAAIAABGgACFgkIAAgsQAAgQgPAAQgFAAgDACQgDABgDAEQgDAEAAAGIAAArIgMAAIAAgsQAAgQgPAAQgEAAgEACQgEABgCAEQgDADAAAHIAAArIgMAAIAAhGIAKAAIABAJQADgEAGgEQAGgCAHAAQAPAAAFAMQADgFAGgEQAHgDAIAAQALAAAGAGQAGAHAAAMIAAAugAhSgkIAAhGIALAAIABAKQADgFAFgDQAEgDAIAAIAGABIAAALIgEAAQgVAAgBATIAAAogAingkIAAhgIAhAAQASAAAIAIQAJAJAAANQAAAOgJAIQgIAJgSAAIgTAAIAAAjgAiZhTIATAAQALAAAFgEQAGgFgBgKQABgKgGgEQgHgFgJAAIgTAAgAj4gkIAAgsQAAgQgPAAQgGAAgEACQgEABgDAEQgCAEAAAGIAAArIgNAAIAAhGIAKAAIABAJQAFgFAEgDQAHgCAHAAQAMAAAHAGQAGAIABALIAAAugAjehEIAAgLIAoAAIAAALgACkh2IAAgOIAPAAIAAAOg");
//         this.shape.setTransform(48.6803,95.5879,1.33,1.33);

//         this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

//         // Layer_1
//         this.shape_1 = new cjs.Shape();
//         this.shape_1.graphics.f("#393E46").s().p("AgGAFQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAAAAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAIANAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAg");
//         this.shape_1.setTransform(39.2195,35.6621,1.15,1.15);

//         this.shape_2 = new cjs.Shape();
//         this.shape_2.graphics.f("#393E46").s().p("AgrAFQgBAAAAAAQgBAAAAAAQgBgBAAAAQgBAAAAgBQAAAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQAAgBABAAQAAAAABgBQAAAAABAAQAAAAABAAIBXAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAg");
//         this.shape_2.setTransform(52.0419,35.6621,1.15,1.15);

//         this.shape_3 = new cjs.Shape();
//         this.shape_3.graphics.f("#393E46").s().p("AgGAFQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAIANAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAAAQAAAAAAABQAAAAgBABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAg");
//         this.shape_3.setTransform(39.2195,26.3472,1.15,1.15);

//         this.shape_4 = new cjs.Shape();
//         this.shape_4.graphics.f("#393E46").s().p("AgrAFQgBAAAAAAQgBAAAAAAQgBgBAAAAQgBAAAAgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQAAgBABAAQAAAAABgBQAAAAABAAQAAAAABAAIBXAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAg");
//         this.shape_4.setTransform(52.0419,26.3472,1.15,1.15);

//         this.shape_5 = new cjs.Shape();
//         this.shape_5.graphics.f("#393E46").s().p("Ah+AFIgDgCQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAAAQAAAAABgBQAAAAAAgBQAAAAABAAIADgCID9AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAAAQAAAAAAABQAAAAgBABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAg");
//         this.shape_5.setTransform(47.787,31.0046,1.15,1.15);

//         this.shape_6 = new cjs.Shape();
//         this.shape_6.graphics.f("#393E46").s().p("Ah+AFIgDgCQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAAAQAAAAABgBQAAAAAAgBQAAAAABAAIADgCID9AAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAAAQAAAAAAABQAAAAgBABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAg");
//         this.shape_6.setTransform(47.787,21.6897,1.15,1.15);

//         this.shape_7 = new cjs.Shape();
//         this.shape_7.graphics.f("#393E46").s().p("AgGAFQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAIANAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAAAQAAAAAAABQAAAAgBABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAg");
//         this.shape_7.setTransform(39.2195,17.0322,1.15,1.15);

//         this.shape_8 = new cjs.Shape();
//         this.shape_8.graphics.f("#393E46").s().p("AgrAFQgBAAAAAAQgBAAAAAAQgBgBAAAAQgBAAAAgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQAAgBABAAQAAAAABgBQAAAAABAAQAAAAABAAIBXAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAg");
//         this.shape_8.setTransform(52.0419,17.0322,1.15,1.15);

//         this.shape_9 = new cjs.Shape();
//         this.shape_9.graphics.f("#393E46").s().p("AhqB/IgJgCQgGgDgCgDQgEgEgCgEQgCgEAAgFIAAjLQAAgFACgEQABgEAFgFQADgDAFgCQAEgCAFAAIDVAAQAFAAAFACIAIAFQAEAFABAEQACAEAAAFIAADLQAAAFgCAEIgFAIQgDADgFADQgGACgEAAgAhvhzIgFADIgEAFIgBAGIAADLIABAFIAEAFQACADADAAQACACADAAIDVAAIAGgCQACAAADgDIADgFIABgFIAAjLIgBgGIgDgFIgFgDIgGgBIjVAAIgFABg");
//         this.shape_9.setTransform(47.787,26.3759,1.15,1.15);

//         this.shape_10 = new cjs.Shape();
//         this.shape_10.graphics.f("#D4DBE4").s().p("AhqApIgHgCQgEgBgCgDQgDgCgCgFQgBgDAAgEIAAg9ID7AAIAAA9IgBAIIgEAGQgDADgEABQgDACgEAAg");
//         this.shape_10.setTransform(47.7295,35.6909,1.15,1.15);

//         this.shape_11 = new cjs.Shape();
//         this.shape_11.graphics.f().rs(["rgba(212,219,228,0.647)","#FFFFFF"],[0,1],20.9,-40.9,0,20.9,-40.9,77.8).ss(1,0,0,4).p("AAAkiQB5AABVBWQBVBVAAB3QAAB5hVBVQhVBVh5AAQh3AAhWhVQhVhVAAh5QAAh3BVhVQBWhWB3AAg");
//         this.shape_11.setTransform(47.539,25.1075,1.1499,1.1499);

//         this.shape_12 = new cjs.Shape();
//         this.shape_12.graphics.rf(["#FFFFFF","#F0F3F7"],[0,1],-22.1,-21.6,0,-22.1,-21.6,51.6).s().p("AjQDRQhXhWAAh7QAAh5BXhXQBXhXB5AAQB7AABWBXQBXBXAAB5QAAB7hXBWQhWBXh7AAQh5AAhXhXg");
//         this.shape_12.setTransform(47.539,25.1075,1.1499,1.1499);

//         this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

//         // Layer_2
//         this.instance = new lib.shadow_bottom();
//         this.instance.setTransform(47,29.05,1.15,1.15,0,0,0,32.6,32.5);

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.bi3, new cjs.Rectangle(-5.2,-9.3,107.8,122.89999999999999), null);


//     (lib.bi2 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#393E46").s().p("AAAAaIgJgCIgIgFQgEgFgCgEQgCgFAAgFIABgGQABgFAFgFQADgEAGgCQAGgDADAAQAMABAGAHQAIAIAAAJIgBAGQgBAFgEAFQgDAEgGADQgGADgFAAgAgEgMIgFAEIgDAFIgBADIABAFIADAFIAFADIAEABIAGgBQAEgCABgDIADgEIAAgEQAAgFgEgEQgEgEgGABIAAgBIgEABg");
//         this.shape.setTransform(41.4328,38.5198,1.15,1.15);

//         this.shape_1 = new cjs.Shape();
//         this.shape_1.graphics.f("#393E46").s().p("AgPAUQgHgFgCgJQgCgIADgHQADgIAIgFQAIgEAHABQAIABAHAGQAGAGACAJQABAJgFAHQgCAFgHAEQgGAEgHAAQgIAAgHgGgAgGgLQgEACgCAFQgCAEACADQAAAEAFAEQADADAEAAQAEAAADgCQADgCACgDQADgFgBgDQgBgEgDgEQgDgDgFgBIgCAAQgDAAgDACg");
//         this.shape_1.setTransform(27.7452,32.662,1.15,1.15);

//         this.shape_2 = new cjs.Shape();
//         this.shape_2.graphics.f("#393E46").s().p("AAAAaQgJAAgIgIQgIgHAAgKQAAgJAHgIQAHgIAKgBIABAAQAKAAAIAHQAHAHABALQABAIgHAJQgHAHgKACgAgJgIQgEADAAAFQAAAGAEAEQAEAEAFAAIABAAQAHgBACgEQAEgEAAgFQAAgFgFgEQgDgEgGAAIgBAAQgFAAgDAFg");
//         this.shape_2.setTransform(37.2406,21.9886,1.15,1.15);

//         this.shape_3 = new cjs.Shape();
//         this.shape_3.graphics.f("#393E46").s().p("AggACIADgKQAgAGAeABIgBAKQgfAAghgHg");
//         this.shape_3.setTransform(47.5852,39.4973,1.15,1.15);

//         this.shape_4 = new cjs.Shape();
//         this.shape_4.graphics.f("#393E46").s().p("AgagMIAIgJQAWAUAXANIgGALQgXgQgYgTg");
//         this.shape_4.setTransform(22.8891,29.3773,1.15,1.15);

//         this.shape_5 = new cjs.Shape();
//         this.shape_5.graphics.f("#393E46").s().p("AgpgLIAGgKQAkAUApAMIgEALQgrgOgkgTg");
//         this.shape_5.setTransform(34.4753,35.9035,1.15,1.15);

//         this.shape_6 = new cjs.Shape();
//         this.shape_6.graphics.f("#393E46").s().p("AgeAbQAagiAbgaIAIAJQgdAagWAgg");
//         this.shape_6.setTransform(32.2041,27.1061,1.15,1.15);

//         this.shape_7 = new cjs.Shape();
//         this.shape_7.graphics.f("#393E46").s().p("AgpAUQAcgVAbgQIAXgLIABAAIAEALIAAAAIgBABIgFACIgQAIQgcAPgaAUg");
//         this.shape_7.setTransform(43.3878,17.7049,1.15,1.15);

//         this.shape_8 = new cjs.Shape();
//         this.shape_8.graphics.f("#393E46").s().p("AgQATQAJgTAOgXIAKAHIgWAog");
//         this.shape_8.setTransform(24.9879,37.1973,1.15,1.15);

//         this.shape_9 = new cjs.Shape();
//         this.shape_9.graphics.f("#393E46").s().p("AgPgOIAKgGQAIARANARIgKAHQgOgVgHgOg");
//         this.shape_9.setTransform(43.9052,42.861,1.15,1.15);

//         this.shape_10 = new cjs.Shape();
//         this.shape_10.graphics.f("#393E46").s().p("AgEgiIALABQgDAgACAkIgLAAQgCgjADgig");
//         this.shape_10.setTransform(36.9399,15.5774,1.15,1.15);

//         this.shape_11 = new cjs.Shape();
//         this.shape_11.graphics.f("#393E46").s().p("AgSgxIAMgDQAGA0ATAwIgMAFQgSg1gHgxg");
//         this.shape_11.setTransform(38.9603,30.4123,1.15,1.15);

//         this.shape_12 = new cjs.Shape();
//         this.shape_12.graphics.f("#393E46").s().p("AhvBwQgugugBhCQABhAAugvQAvguBAAAQBBAAAvAuQAuAvABBAQgBBCguAuQgvAvhBAAQhAAAgvgvgAhmhmQgsAqABA8QgBA9AsArQAqArA8AAQA9AAArgrQAqgrAAg9QAAg8gqgqQgrgrg9gBQg8ABgqArg");
//         this.shape_12.setTransform(37.6665,29.0898,1.15,1.15);

//         this.shape_13 = new cjs.Shape();
//         this.shape_13.graphics.f("#D4DBE4").s().p("AgNAOQgGgFAAgJQAAgIAGgFQAGgGAHAAQAJAAAFAGQAGAGAAAHQAAAJgGAFQgFAGgJAAQgHAAgGgGg");
//         this.shape_13.setTransform(28.2078,32.7698,1.15,1.15);

//         this.shape_14 = new cjs.Shape();
//         this.shape_14.graphics.f("#D4DBE4").s().p("AgNAOQgGgGAAgIQAAgHAGgGQAGgGAHAAQAIAAAGAGQAGAGAAAHQAAAIgGAGQgGAGgIAAQgIAAgFgGg");
//         this.shape_14.setTransform(41.3465,38.7785,1.15,1.15);

//         this.shape_15 = new cjs.Shape();
//         this.shape_15.graphics.f("#D4DBE4").s().p("AgNAOQgGgFAAgJQAAgIAGgFQAFgGAIAAQAIAAAGAGQAGAFAAAIQAAAJgGAFQgGAGgIAAQgHAAgGgGg");
//         this.shape_15.setTransform(37.2065,21.9599,1.15,1.15);

//         this.shape_16 = new cjs.Shape();
//         this.shape_16.graphics.f().rs(["rgba(212,219,228,0.647)","#FFFFFF"],[0,1],20.9,-40.9,0,20.9,-40.9,77.8).ss(1,0,0,4).p("AAAkiQB5AABVBWQBVBVAAB3QAAB5hVBVQhVBVh5AAQh3AAhVhVQhWhVAAh5QAAh3BWhVQBVhWB3AAg");
//         this.shape_16.setTransform(37.9731,29.0593,1.1499,1.1499);

//         this.shape_17 = new cjs.Shape();
//         this.shape_17.graphics.rf(["#FFFFFF","#F0F3F7"],[0,1],15.3,-23.2,0,15.3,-23.2,53.6).s().p("AjQDRQhXhWAAh7QAAh5BXhXQBXhXB5AAQB7AABWBXQBXBXAAB5QAAB7hXBWQhWBXh7AAQh5AAhXhXg");
//         this.shape_17.setTransform(37.9731,29.0593,1.1499,1.1499);

//         this.shape_18 = new cjs.Shape();
//         this.shape_18.graphics.f("#393E46").s().p("Aj+B/QgKgHgBgOIANAAQACAJAGAEQAGAFAKAAIALgCQAEgBAEgEQADgEAAgGQAAgHgEgEQgFgEgKgBIgIgCQgQgDgGgGQgIgHAAgLQAAgIAEgGQAFgHAHgDQAHgDALAAQAJAAAIADQAHADAFAGQAFAGABAKIgNAAQgCgJgGgEQgGgEgIAAQgJAAgFAEQgGAEAAAHIABAHQACADAEADIALADIAIABQAQADAHAHQAIAHAAALQAAAJgFAHQgDAFgJAFQgIADgLAAQgQAAgKgIgADZCBQgHgFgCgKIANAAQABAEACACIAGADIAHABQAGAAAGgCQAEgDAAgGQAAgFgDgCQgDgCgHgBIgGAAQgMgCgGgEQgGgFAAgJQAAgJAHgHQAHgGANAAQANAAAHAGQAHAHABAIIgMAAQgCgGgEgCQgEgCgGAAQgGAAgFADQgDADAAAEQAAAEACACQACACAIABIAHABQAGAAAGADQAGABADAFQADAEAAAHQAAAKgHAGQgIAHgOAAQgMAAgIgGgACUCCQgIgFgEgIQgDgHAAgMQAAgLAEgIQAEgJAHgEQAHgFALAAQALAAAGAFQAHADAEAIQADAHAAAKIAAAEIAAADIgzAAQAAAKAFAHQAGAGAKAAQAFAAAGgDQAFgDACgFIAMAAQgBAGgEAFQgDAFgHADQgGADgKAAQgLAAgHgFgACYBNQgFAFgBAKIAjAAIADgBIABgDQAAgGgGgFQgFgFgIAAQgIAAgGAFgABHCCQgHgEgEgJQgDgHAAgLQAAgMADgIQAEgIAIgFQAHgFALAAQAKAAAGAEQAGADAEAGQADAFABAIIgMAAQgCgHgEgEQgFgEgHAAQgKAAgFAHQgGAIAAAMQAAALAGAHQAFAGAKAAQAHAAAFgDQAFgFACgGIAMAAQgBAHgEAGQgDAFgHAEQgIAEgIAAQgLAAgIgFgAikCCQgHgFgEgIQgEgJAAgKQAAgKAEgJQAEgJAHgEQAHgFAMAAQAKAAAHAFQAHADAEAIQADAJAAAIIAAAEIgBADIgzAAQABALAFAGQAGAGAJAAQAHAAAFgDQAFgDABgFIANAAQgCAGgDAFQgEAEgGAEQgHADgJAAQgMAAgHgFgAifBNQgGAHAAAIIAiAAIADgBIABgDQAAgGgFgFQgGgFgHAAQgJAAgFAFgAAbCFIAAhGIANAAIAABGgAgZCFIgahGIANAAIASA2QABAAAAABQAAAAAAABQABAAAAAAQAAAAAAAAQABAAAAAAQABAAAAAAQAAgBAAAAQAAgBAAAAIARg2IAOAAIgZBGgAhhCFIAAhGIALAAIABAKQADgFAFgDQAFgDAHAAIAGABIAAAKIgEAAQgVAAAAAUIAAAogAAbAyIAAgNIANAAIAAANgAgpgJIAAhhIALAAIABAJQAEgGAFgCQAGgDAIAAQAJAAAHAFQAGAFAEAIQAEAHAAAMQAAAKgEAJQgEAJgHAEQgGAFgKAAQgGAAgGgDQgFgCgFgFIAAAjgAgShfQgFADgDADQgDAEAAAGIAAARQAAAFADAEIAHAGQAFABAFAAQAKAAAFgHQAFgGAAgMQAAgMgFgHQgGgHgJAAIgJACgAh8gJIAAhhIALAAIABAJQADgFAHgDQAGgDAHAAQALAAAGAFQAHAFADAIQAEAIAAALQAAAJgEAKQgDAIgHAFQgHAFgLAAQgGAAgGgDQgFgCgEgFIAAAjgAhlhfQgGADgBADQgDAEAAAGIAAARQAAAFADAEQACADAFADQAEABAFAAQALAAAFgHQAFgHAAgLQAAgLgFgIQgGgHgKAAIgJACgACOgpQgJgHAAgMQAAgKAGgGIAOgMIgIgMQgCgHAAgFQAAgFACgGQADgFAFgDQAGgDAIAAQAIAAAFADQAFADADAFQACAFAAAFQAAAIgFAHQgHAHgHAFIAYAcQAFgEADgGIAEgQIALAAQgBAMgEAIQgFAKgGAEIAGAEIAIABIACAAIAAAJIgDABIgEAAQgGAAgEgCQgDgBgFgFQgGAEgHACQgHADgIAAQgPAAgIgHgACWhIQgEAEAAAGQAAAFACADQACADAEADQAFADAHAAQAGAAAEgCIAKgEIgagdQgHAEgDAEgACeh4QgDAEAAAEQAAAGADADIAGAKIAKgJQAEgFAAgFQAAgFgDgDQgDgDgFAAQgGAAgDADgAArgoQgIgGAAgJIAMAAQABAEADACQACACAEABIAHABQAFAAAGgCQAFgDAAgGQAAgFgEgCQgDgCgHgBIgGAAQgLgCgGgEQgHgFAAgJQAAgJAIgHQAHgGANAAQANAAAGAGQAHAGABAJIgMAAQgBgGgFgCQgEgCgFAAQgHAAgEADQgEADAAAEQAAAEADACQACACAIABIAGABIAMADQAGABADAFQAEAEAAAHQAAAKgIAGQgHAHgOAAQgMAAgJgGgAiWgkIgJgaIgpAAIgJAaIgOAAIAjhgIARAAIAjBggAi2h1IgOAsIAhAAIgPgsIgCgCIgCACg");
//         this.shape_18.setTransform(37.4012,101.0657,1.33,1.33);

//         this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

//         // Layer_2
//         this.instance = new lib.shadow_bottom();
//         this.instance.setTransform(35.3,34,1.15,1.15,0,0,0,32.6,32.5);

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.bi2, new cjs.Rectangle(-2.2,-5.4,75,124.5), null);


//     (lib.bi1 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#393E46").s().p("AgQBGQAFAAACgEQAFgFADgKQAIgUgBgfQABgdgIgVQgDgKgFgFQgDgDgEAAIAAgKQAIgBAHAIQAEAGAFALQAIAWAAAgQAAAhgIAWQgGANgDAEQgHAIgIgBg");
//         this.shape.setTransform(44.9598,17.0446,1.15,1.15);

//         this.shape_1 = new cjs.Shape();
//         this.shape_1.graphics.f("#393E46").s().p("Ag3A5QgYgYAAghQAAggAYgXQAXgXAgAAQAhAAAYAXQAXAXAAAgQAAAhgXAYQgYAWghAAQggAAgXgWgAgwgwQgVAUAAAcQAAAdAVAVQAUAUAcAAQAdAAAUgUQAVgVAAgdQAAgcgVgUQgUgVgdABQgcgBgUAVg");
//         this.shape_1.setTransform(43.0336,17.0446,1.15,1.15);

//         this.shape_2 = new cjs.Shape();
//         this.shape_2.graphics.f("#393E46").s().p("Ag+AFQgFAAAAgFQAAgEAFAAIB+AAQAEAAAAAEQAAAFgEAAg");
//         this.shape_2.setTransform(43.0336,21.2709,1.15,1.15);

//         this.shape_3 = new cjs.Shape();
//         this.shape_3.graphics.f("#393E46").s().p("Ag+AFQgFAAAAgFQAAgEAFAAIB+AAQAEAAAAAEQAAAFgEAAg");
//         this.shape_3.setTransform(43.0336,12.8472,1.15,1.15);

//         this.shape_4 = new cjs.Shape();
//         this.shape_4.graphics.f("#393E46").s().p("AhKAFQgFAAAAgFQAAgEAFAAICVAAQAFAAAAAEQAAAFgFAAg");
//         this.shape_4.setTransform(43.0336,17.0446,1.15,1.15);

//         this.shape_5 = new cjs.Shape();
//         this.shape_5.graphics.f("#393E46").s().p("AAABIQgFgHgEgKQgJgYAAgfQAAgeAJgYQADgJAGgIQAGgIAIABQAFAAAAAEQAAAGgFAAQgDAAgEADQgEAFgDAKQgIAVAAAdQAAAfAIAUQADAKAEAFQAEAEADAAQAFAAAAAFQAAAFgFgBQgIABgGgIg");
//         this.shape_5.setTransform(41.4236,17.0446,1.15,1.15);

//         this.shape_6 = new cjs.Shape();
//         this.shape_6.graphics.f("#D4DBE4").s().p("Ag3A4QgXgXAAghQAAggAXgXQAXgXAgAAQAhAAAXAXQAXAXAAAgQAAAhgXAXQgXAXghAAQggAAgXgXg");
//         this.shape_6.setTransform(43.0911,17.1021,1.15,1.15);

//         this.shape_7 = new cjs.Shape();
//         this.shape_7.graphics.f("#434951").s().p("ABiB1QAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAgBQgBAAAAAAQAAgBgBAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAgBQABAAAAgBQAAAAABgBQAAAAABAAQAAgBABAAQAAAAABAAQABAAAAAAIAjAAQAVgBAPgPQAQgOAAgWQAAgWgQgOQgPgPgVAAIgEAAIgOACQgBAAAAgBQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAAAAAgBIgCgOQgFgggXgYQgWgXghgHQgNgDgKABQgbAAgYANQgZAOgOAXIgEAHIgCACIgDABIgJAAQgfAAgWAVQgQAPgFAVQgFATAHAWQAIAUARAOQASANAVACIALAAQABAAAAAAQABAAABABQAAAAABAAQAAABAAAAQABABAAAAQABABAAAAQAAABAAAAQAAABAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAABgBAAQAAABAAAAQgBAAAAABQgBAAgBAAQAAAAgBAAIgMAAQgagCgUgQQgVgPgIgYQgJgYAGgZQAHgYASgSQAagaAkABIAFAAIACgEQAQgaAbgQQAbgPAfAAQANAAAMAEQAmAIAZAZQAZAaAFAlIACAIIAHgBIAGAAQAbAAATARQATAUAAAaQAAAbgTASQgSAUgcgBg");
//         this.shape_7.setTransform(43.7006,8.1322,1.15,1.15);

//         this.shape_8 = new cjs.Shape();
//         this.shape_8.graphics.f().rs(["rgba(212,219,228,0.647)","#FFFFFF"],[0,1],20.9,-40.9,0,20.9,-40.9,77.8).ss(1,0,0,4).p("AAAkiQB5AABVBWQBVBVAAB3QAAB5hVBVQhVBVh5AAQh3AAhVhVQhWhVAAh5QAAh3BWhVQBVhWB3AAg");
//         this.shape_8.setTransform(44.0093,11.6075,1.1499,1.1499);

//         this.shape_9 = new cjs.Shape();
//         this.shape_9.graphics.rf(["#FFFFFF","#F0F3F7"],[0,1],15.3,-23.2,0,15.3,-23.2,53.6).s().p("AjQDRQhXhWAAh7QAAh5BXhXQBXhXB5AAQB7AABWBXQBXBXAAB5QAAB7hXBWQhWBXh7AAQh5AAhXhXg");
//         this.shape_9.setTransform(44.0093,11.6075,1.1499,1.1499);

//         this.shape_10 = new cjs.Shape();
//         this.shape_10.graphics.f("#393E46").s().p("AjJB7QgLgNAAgYQAAgYALgNQALgNAUAAQALAAAIADQAIAFAEAIQAFAFACALIgOAAQgBgJgHgGQgGgGgKAAQgNAAgIAKQgHAKAAASQAAAUAHAKQAIAJANABQAJgBAHgFQAHgGACgKIANAAQgCAPgKAJQgJAJgRAAQgVAAgKgNgACjCCQgHgGgBgJIAMAAQABAEADACQACACAEABIAHABQAFAAAGgCQAFgEAAgFQAAgFgEgCQgDgCgGgBIgHgBQgLgBgGgEQgHgFAAgKQAAgIAIgHQAHgGANAAQANAAAGAGQAIAGAAAJIgMAAQgBgGgFgDQgEgCgFABQgHAAgEACQgEAEAAAEQAAAEADACQACACAIABIAGAAQAHABAGADQAFABAEAEQADAFAAAIQAAAJgIAGQgIAHgNAAQgMgBgJgFgABYCCQgGgEgEgIQgEgIAAgLQAAgJAEgKQAEgJAHgEQAGgFALAAQAGAAAGACQAGADAEAFIAAgmIAMAAIAABkIgLAAIgBgJQgCAEgHAEQgGACgIABQgKAAgHgGgABcBRQgFAGAAAMQAAAMAFAGQAFAHALAAQAFAAAFgBQADgDAEgDQADgEAAgGIAAgRQAAgGgDgDQgCgEgFgCQgFgBgFgBQgKAAgGAIgAAFCBQgGgHAAgNIAAguIAMAAIAAAtQAAAQAPAAQAGAAADgBIAHgGQADgEAAgFIAAgtIAMAAIAABHIgKAAIgBgJQgDAEgGAEQgGACgIABQgLgBgHgGgAhFCDQgIgFgEgIQgEgJAAgKQAAgLAEgIQAEgIAIgFQAHgFALAAQAMAAAHAFQAIAEADAJQAEAIAAALQAAAKgEAJQgDAIgIAFQgHAEgMABQgLgBgHgEgAhCBQQgGAHAAAMQAAALAGAIQAFAGAKAAQAKAAAGgGQAFgHAAgMQAAgMgFgHQgGgGgKgBQgKABgFAGgAhyCGIAAhkIANAAIAABkgACKgmQgIgFgEgIQgDgIAAgLQAAgKAEgJQAEgJAHgEQAHgFALAAQAKAAAGADQAHAEADAGQAEAGAAAHIgMAAQgBgIgFgDQgFgDgHgBQgKAAgFAHQgFAHAAAMQAAAMAFAGQAFAHAKAAQAIAAAEgEQAFgCACgIIAMAAQgBAGgEAHQgDAFgHAEQgGADgKAAQgLAAgHgEgAAAgkQgHgDgDgFIgBAJIgKAAIAAhkIAMAAIAAAmQAEgFAFgDQAGgCAHAAQAKAAAHAFQAHAFADAIQAEAIAAAKQAAAKgEAJQgEAJgHAFQgHAEgKAAQgHABgFgDgAAAheQgDACgDAEQgDAEAAAFIAAARQAAAGADAEQADAEADACQAFABAFAAQAKAAAFgHQAGgHAAgMQAAgKgGgIQgFgHgKAAQgFABgFABgAhfgoQgGgHAAgNIAAguIANAAIAAAsQAAARAPAAQAFAAAEgBQAFgDACgDQACgEAAgGIAAgsIANAAIAABHIgLAAIgBgJQgDAFgGADQgGACgIAAQgKAAgIgGgABdgjIAAhHIANAAIAABHgAA8gjIAAhkIANAAIAABkgAi4gjIAAhhIAiAAQARABAIAHQAJAJAAAOQAAAOgJAIQgIAIgRAAIgUAAIAAAkgAiqhSIATAAQALAAAFgFQAGgFAAgJQAAgJgGgGQgFgFgLAAIgTAAgABdh1IAAgPIAOAAIAAAPg");
//         this.shape_10.setTransform(43.3869,81.5417,1.33,1.33);

//         this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

//         // Layer_2
//         this.instance = new lib.shadow_bottom();
//         this.instance.setTransform(40.25,15.55,1.15,1.15,0,0,0,32.6,32.5);

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

//         this._renderFirstFrame();

//     }).prototype = getMCSymbolPrototype(lib.bi1, new cjs.Rectangle(2.8,-22.8,75.7,122.5), null);


//     (lib.top_security1_1 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // timeline functions:
//         this.frame_0 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_9 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_26 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_47 = function() {
//             var _this = this;

//             _this.stop();
//         }
//         this.frame_56 = function() {
//             var _this = this;

//             _this.stop();
//         }

//         // actions tween:
//         this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9).call(this.frame_9).wait(17).call(this.frame_26).wait(21).call(this.frame_47).wait(9).call(this.frame_56).wait(95));

//         // Layer_4
//         this.shape = new cjs.Shape();
//         this.shape.graphics.f("#393E46").s().p("AEQBRIAAgXIAHAAQAJAAAFgDQADgCAEgIIgIAAIgehdIAgAAIAPA6QAAABAAABQAAAAAAABQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABgBAAAAQAAgBAAgBIAPg6IAfAAIgfBgQgEAMgFAIQgGAIgHADQgJADgKABgAlXAmQgOgMgBgUIAgAAQADARARAAQAIAAAFgDQAFgEAAgFQAAgGgEgCQgEgDgIgBIgLgBQgpgIAAgeQAAgMAGgJQAGgJALgFQAKgEAQAAQAPAAAKAEQAMAFAGAJQAGAKABALIghAAQgBgGgFgEQgFgDgGAAQgHAAgFADQgEACAAAGQAAAEAEADQADACAHACIALACQAVAEALAJQALAJAAAPQAAANgHAJQgFAJgMAFQgMAFgPAAQgXAAgOgLgADKASIAAgpIgOAAIAAgYIAJAAQADAAACgBQABgBABgEIADgWIAZAAIAAAbIAUAAIAAAZIgUAAIAAAjQAAAGADADQACABAGAAIALAAIAAAZIgLABIgKAAQgfAAAAgegAgYAnQgIgIAAgRIAAg+IAeAAIAAA4QAAANAKAAQAGAAAFgDQAEgFAAgGIAAg3IAeAAIAABeIgaAAIgCgMQgEAGgHAFQgHADgIAAQgPAAgIgJgAh+AkQgNgOAAgWQAAgPAGgLQAGgLAKgGQAMgGAOAAQANAAAJAFQAKAEAGAJQAGAKAAALIgdAAQgDgNgMAAQgIAAgEAHQgFAFAAALQAAAVARAAQAMABADgNIAdAAQAAALgGAKQgHAJgJAEQgJAFgNAAQgXAAgMgMgAjnAkQgMgOAAgWQAAgXAMgNQANgNAWAAQAWAAAMAMQAMAOAAAVIgBAJIg9AAQACASAPAAQAMAAADgJIAdAAQgBAKgGAHQgGAHgKAEQgKAEgMAAQgWAAgNgMgAjUgLIAbAAQAEAAAAgEQAAgGgEgDQgEgEgGAAQgOAAgDARgACSAuIAAheIAeAAIAABegABIAuIAAheIAbAAIACAOQADgGAHgEQAHgFAIAAIAHABIAAAcIgIAAQgMAAgFAFQgFAFAAAKIAAAugACRg6IAAgYIAgAAIAAAYg");
//         this.shape.setTransform(74.7718,48.5246,1.1,1.1);

//         this.instance = new lib.CompoundPath_1();
//         this.instance.setTransform(94.25,72.15,1,1,0,0,0,74,32.4);
//         this.instance.alpha = 0.6016;

//         this.instance_1 = new lib.CompoundPath_2();
//         this.instance_1.setTransform(94.25,35.65,1,1,0,0,0,72,5);
//         this.instance_1.alpha = 0.1602;

//         this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.shape}]}).wait(151));

//         // Layer_3
//         this.instance_2 = new lib.top_security_hover();
//         this.instance_2.setTransform(91,54,1,1,0,0,0,91,54);
//         this.instance_2.alpha = 0;
//         this.instance_2._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(19).to({_off:false},0).to({alpha:1},7).wait(13).to({regX:155.9,regY:6,x:155.9,y:6},0).to({alpha:0},8).wait(2).to({regX:91,regY:54,x:91,y:54,alpha:1},0).wait(1).to({alpha:0},6).to({_off:true},73).wait(22));

//         // Layer_1
//         this.instance_3 = new lib.top_security1();

//         this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true},68).wait(83));

//         this._renderFirstFrame();

//     }).prototype = p = new cjs.MovieClip();
//     p.nominalBounds = new cjs.Rectangle(0,0,161,81);


//     (lib.bottom_icons = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // timeline functions:
//         this.frame_39 = function() {
//             var _this = this;
//             /*
//             Stop a Movie Clip/Video
//             Stops the specified movie clip or video.
//             */
//             _this.stop();
//         }

//         // actions tween:
//         this.timeline.addTween(cjs.Tween.get(this).wait(39).call(this.frame_39).wait(10));

//         // bi5
//         this.instance = new lib.bi5();
//         this.instance.setTransform(582.1,107.5,1,1,0,0,0,29.6,47.5);
//         this.instance.alpha = 0;
//         this.instance._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(14).to({_off:false},0).to({y:73.5,alpha:1},11,cjs.Ease.quadOut).wait(24));

//         // bi4
//         this.instance_1 = new lib.bi4();
//         this.instance_1.setTransform(445.65,85.5,1,1,0,0,0,34.2,51.5);
//         this.instance_1.alpha = 0;
//         this.instance_1._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(12).to({_off:false},0).to({y:51.5,alpha:1},11,cjs.Ease.quadOut).wait(26));

//         // bi3
//         this.instance_2 = new lib.bi3();
//         this.instance_2.setTransform(298.9,112.1,1,1,0,0,0,40.6,52.1);
//         this.instance_2.alpha = 0;
//         this.instance_2._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(8).to({_off:false},0).to({y:78.1,alpha:1},11,cjs.Ease.quadInOut).wait(30));

//         // bi2
//         this.instance_3 = new lib.bi2();
//         this.instance_3.setTransform(158.75,85.5,1,1,0,0,0,29.6,51.5);
//         this.instance_3.alpha = 0;
//         this.instance_3._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(4).to({_off:false},0).to({y:51.5,alpha:1},11,cjs.Ease.quadOut).wait(34));

//         // bi1
//         this.instance_4 = new lib.bi1();
//         this.instance_4.setTransform(15.1,119.6,1,1,0,0,0,29.6,52.1);
//         this.instance_4.alpha = 0;

//         this.timeline.addTween(cjs.Tween.get(this.instance_4).to({x:14.1,y:92.6,alpha:1},11,cjs.Ease.quadOut).wait(38));

//         this._renderFirstFrame();

//     }).prototype = p = new cjs.MovieClip();
//     p.nominalBounds = new cjs.Rectangle(-12.7,-5.5,639.6,179.1);


//     (lib.main = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // timeline functions:
//         this.frame_5 = function() {
//             var _this = this;
//             /*
//             Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
//             Can be used on the main timeline or on movie clip timelines.
//             */
//             //_this.gotoAndPlay(149);
//         }
//         this.frame_93 = function() {
//             var _this = this;

//             var _hold_plat = 'no';
//             var _hold_sec = 'no';
//             var _hold_obsv = 'no';
//             var _hold_comm = 'no';
//             var _hold_cust = 'no';


//             function Clear_Holds()
//             {
//                 if (_hold_plat == 'yes') {
//                     _this.platform_control.gotoAndPlay(40);
//                     _hold_plat = 'no';
//                 }
//                 if (_hold_comm == 'yes') {
//                     _this.top_comm.gotoAndPlay(40);
//                     _hold_comm = 'no';
//                 }
//                 if (_hold_cust == 'yes') {
//                     _this.top_custom.gotoAndPlay(40);
//                     _hold_cust = 'no';
//                 }
//                 if (_hold_sec == 'yes') {
//                     _this.top_sec.gotoAndPlay(40);
//                     _hold_sec = 'no';
//                 }
//                 if (_hold_obsv == 'yes') {
//                     _this.top_obsv.gotoAndPlay(40);
//                     _hold_obsv = 'no';
//                 } 
//             }


//             /*
//             Mousing over the specified symbol instance executes a function.
//             '3' is the number of the times event should be triggered.
//             */
//             stage.enableMouseOver(3);


//             _this.button_platform1.on('click', function(){
//             if (_hold_plat != 'yes') {
//                 _this.platform_control.gotoAndPlay(20);

//                 Clear_Holds();

//             }

//             //_hold_comm = 'no';
//             _hold_plat = 'yes';
//             $('.infographic-cta .slider ul li').removeClass('active').css('display','none')
//             $('.the-splunk').addClass('active').css('display','block');

//             });


//             _this.button_comm.on('click', function(){
//             if (_hold_comm != 'yes') {
//                 _this.top_comm.gotoAndPlay(20);

//                 Clear_Holds();

//             }

//             _hold_comm = 'yes';
//             //_hold_plat = 'no';
//             $('.infographic-cta .slider ul li').removeClass('active').css('display','none')
//             $('.community').addClass('active').css('display','block');

//             });

//             // custom button section

//             // https://dev.splunk.com/


//             _this.button_custom.on('click', function(){
//             if (_hold_cust != 'yes') {
//                 _this.top_custom.gotoAndPlay(20);

//                 Clear_Holds();

//             }

//             _hold_cust = 'yes';
//             $('.infographic-cta .slider ul li').removeClass('active').css('display','none')
//             $('.custom').addClass('active').css('display','block');


//             });


//             // security section

//             _this.button_sec.on('click', function(){
//             if (_hold_sec != 'yes') {
//                 _this.top_sec.gotoAndPlay(20);

//                 Clear_Holds();

//             }

//             _hold_sec = 'yes';
//             $('.infographic-cta .slider ul li').removeClass('active').css('display','none')
//             $('.security').addClass('active').css('display','block');
//             });


//             // observability section


//             _this.button_obsv.on('click', function(){
//             if (_hold_obsv != 'yes') {
//                 _this.top_obsv.gotoAndPlay(20);
//                 Clear_Holds();
//             }

//             _hold_obsv = 'yes';
//             $('.infographic-cta .slider ul li').removeClass('active').css('display','none')
//             $('.observability').addClass('active').css('display','block');
//             });

//             $('.next').click(function() {
//                 let index= $('.infographic-cta .slider ul li.active').index();
//                 if(index==0){
//                     if (_hold_sec != 'yes') {
//                         _this.top_sec.gotoAndPlay(20);
//                         Clear_Holds();
//                     }
//                     _hold_sec = 'yes';
//                 }else if(index==1){
//                     if (_hold_obsv != 'yes') {
//                         _this.top_obsv.gotoAndPlay(20);
//                         Clear_Holds();
//                     }

//                     _hold_obsv = 'yes';
//                 }else if(index==2){
//                     if (_hold_comm != 'yes') {
//                         _this.top_comm.gotoAndPlay(20);

//                         Clear_Holds();

//                     }

//                     _hold_comm = 'yes';
//                 }else if(index==3){
//                     if (_hold_cust != 'yes') {
//                         _this.top_custom.gotoAndPlay(20);

//                         Clear_Holds();

//                     }

//                     _hold_cust = 'yes';
//                 }else if(index==4){
//                     if (_hold_plat != 'yes') {
//                         _this.platform_control.gotoAndPlay(20);

//                         Clear_Holds();

//                     }

//                     //_hold_comm = 'no';
//                     _hold_plat = 'yes';
//                 }
//             });

//             $('.prev').click(function() {
//                 let index= $('.infographic-cta .slider ul li.active').index();
//                 if(index==0){
//                     if (_hold_sec != 'yes') {
//                         _this.top_sec.gotoAndPlay(20);
//                         Clear_Holds();
//                     }
//                     _hold_sec = 'yes';
//                 }else if(index==1){
//                     if (_hold_obsv != 'yes') {
//                         _this.top_obsv.gotoAndPlay(20);
//                         Clear_Holds();
//                     }

//                     _hold_obsv = 'yes';
//                 }else if(index==2){
//                     if (_hold_comm != 'yes') {
//                         _this.top_comm.gotoAndPlay(20);

//                         Clear_Holds();

//                     }

//                     _hold_comm = 'yes';
//                 }else if(index==3){
//                     if (_hold_cust != 'yes') {
//                         _this.top_custom.gotoAndPlay(20);

//                         Clear_Holds();

//                     }

//                     _hold_cust = 'yes';
//                 }else if(index==4){
//                     if (_hold_plat != 'yes') {
//                         _this.platform_control.gotoAndPlay(20);

//                         Clear_Holds();

//                     }

//                     //_hold_comm = 'no';
//                     _hold_plat = 'yes';
//                 }
//             });
//             if (_hold_sec != 'yes') {
//                 _this.top_sec.gotoAndPlay(20);
//                 Clear_Holds();
//             }
//             _hold_sec = 'yes';
//         }
//         this.frame_143 = function() {
//             var _this = this;

//             _this.stop();
//         }

//         // actions tween:
//         this.timeline.addTween(cjs.Tween.get(this).wait(5).call(this.frame_5).wait(88).call(this.frame_93).wait(50).call(this.frame_143).wait(58));

//         // Layer_29 (mask)
//         var mask = new cjs.Shape();
//         mask._off = true;
//         var mask_graphics_60 = new cjs.Graphics().p("AuQU0IAAwYMA/+AAAIAAQYg");

//         this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(60).to({graphics:mask_graphics_60,x:318.2219,y:133.2097}).wait(17).to({graphics:null,x:0,y:0}).wait(124));

//         // top_observe1
//         this.top_obsv = new lib.top_observe1();
//         this.top_obsv.name = "top_obsv";
//         this.top_obsv.setTransform(514.45,305.7,1.1,1.1,0,0,0,82,40.6);
//         this.top_obsv._off = true;

//         var maskedShapeInstanceList = [this.top_obsv];

//         for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
//             maskedShapeInstanceList[shapedInstanceItr].mask = mask;
//         }

//         this.timeline.addTween(cjs.Tween.get(this.top_obsv).wait(65).to({_off:false},0).to({y:221.7},13,cjs.Ease.quadOut).wait(123));

//         // top_security1
//         this.top_sec = new lib.top_security1_1();
//         this.top_sec.name = "top_sec";
//         this.top_sec.setTransform(341.3,305.7,1.1,1.1,0,0,0,80.5,40.6);
//         this.top_sec._off = true;

//         var maskedShapeInstanceList = [this.top_sec];

//         for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
//             maskedShapeInstanceList[shapedInstanceItr].mask = mask;
//         }

//         this.timeline.addTween(cjs.Tween.get(this.top_sec).wait(60).to({_off:false},0).to({y:221.65},12).to({_off:true},128).wait(1));

//         // Layer_25 (mask)
//         var mask_1 = new cjs.Shape();
//         mask_1._off = true;
//         var mask_1_graphics_54 = new cjs.Graphics().p("EgyEATIIAAy4MCC9AAAIAAS4g");

//         this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(54).to({graphics:mask_1_graphics_54,x:517.7141,y:122.4121}).wait(95).to({graphics:null,x:0,y:0}).wait(52));

//         // top_custom
//         this.top_custom = new lib.top_custom();
//         this.top_custom.name = "top_custom";
//         this.top_custom.setTransform(907.85,365.05,1.054,1.1422,0,0,0,92.6,102);
//         this.top_custom._off = true;

//         var maskedShapeInstanceList = [this.top_custom];

//         for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
//             maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
//         }

//         this.timeline.addTween(cjs.Tween.get(this.top_custom).wait(82).to({_off:false},0).to({x:909.15,y:245.55},12,cjs.Ease.quadOut).to({_off:true},106).wait(1));

//         // top_community
//         this.top_comm = new lib.top_community();
//         this.top_comm.name = "top_comm";
//         this.top_comm.setTransform(716.25,251.7,1.0703,1.1451,0,0,0,89.7,5.7);
//         this.top_comm._off = true;

//         var maskedShapeInstanceList = [this.top_comm];

//         for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
//             maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
//         }

//         this.timeline.addTween(cjs.Tween.get(this.top_comm).wait(74).to({_off:false},0).to({y:135.5},12,cjs.Ease.quadOut).to({_off:true},114).wait(1));

//         // top_splunk
//         this.instance = new lib.top_splunk();
//         this.instance.setTransform(427,250.85,1.026,1.1402,0,0,0,192,4.5);
//         this.instance._off = true;

//         var maskedShapeInstanceList = [this.instance];

//         for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
//             maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
//         }

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(54).to({_off:false},0).to({y:135.05},12,cjs.Ease.quadOut).to({_off:true},134).wait(1));

//         // Layer_20
//         this.instance_1 = new lib.shadows();
//         this.instance_1.setTransform(611,341.5,1,1,0,0,0,611,341.5);
//         this.instance_1.alpha = 0;
//         this.instance_1._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(54).to({_off:false},0).to({alpha:1},39).to({_off:true},107).wait(1));

//         // Layer_1
//         this.instance_2 = new lib.platform_copy1();
//         this.instance_2.setTransform(608.95,453.2,1,1,0,0,0,201.2,21.3);
//         this.instance_2.alpha = 0;
//         this.instance_2._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(15).to({_off:false},0).to({y:345.5,alpha:1},8,cjs.Ease.quadOut).to({_off:true},177).wait(1));

//         // Layer_1
//         this.instance_3 = new lib.pltform_copy2();
//         this.instance_3.setTransform(607.2,398.95,1,1,0,0,0,336.7,33.7);
//         this.instance_3._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(34).to({_off:false},0).to({_off:true},166).wait(1));

//         // Layer_2
//         this.platform_control = new lib.platform_control();
//         this.platform_control.name = "platform_control";
//         this.platform_control.setTransform(611,341.5,1,1,0,0,0,611,341.5);
//         this.platform_control._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.platform_control).wait(93).to({_off:false},0).to({_off:true},107).wait(1));

//         // Layer_5
//         this.instance_4 = new lib.platform1a();
//         this.instance_4.setTransform(613.05,415.65,0.0482,0.0482,0,0,0,613.5,243.6);
//         this.instance_4._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1).to({_off:false},0).to({regX:613,regY:243.7,scaleX:1,scaleY:1,x:613,y:415.7},9,cjs.Ease.quadInOut).to({_off:true},1).wait(190));

//         // Layer_10 (mask)
//         var mask_2 = new cjs.Shape();
//         mask_2._off = true;
//         var mask_2_graphics_23 = new cjs.Graphics().p("Ag/UyMAAAgpjIB/AAMAAAApjg");
//         var mask_2_graphics_24 = new cjs.Graphics().p("AnuVOMAAAgqbIPdAAMAAAAqbg");
//         var mask_2_graphics_25 = new cjs.Graphics().p("AudVpMAAAgrRIc7AAMAAAArRg");
//         var mask_2_graphics_26 = new cjs.Graphics().p("A1MWFMAAAgsIMAqZAAAMAAAAsIg");
//         var mask_2_graphics_27 = new cjs.Graphics().p("A77WgMAAAgs+MA33AAAMAAAAs+g");
//         var mask_2_graphics_28 = new cjs.Graphics().p("EgiqAW7MAAAgt1MBFVAAAMAAAAt1g");
//         var mask_2_graphics_29 = new cjs.Graphics().p("EgpZAXWMAAAgurMBS0AAAMAAAAurg");
//         var mask_2_graphics_30 = new cjs.Graphics().p("EgwJAXyMAAAgviMBgTAAAMAAAAvig");
//         var mask_2_graphics_31 = new cjs.Graphics().p("Eg24AYNMAAAgwYMBtxAAAMAAAAwYg");
//         var mask_2_graphics_32 = new cjs.Graphics().p("Eg9nAYoMAAAgxPMB7PAAAMAAAAxPg");
//         var mask_2_graphics_33 = new cjs.Graphics().p("EhEWAZDMAAAgyFMCItAAAMAAAAyFg");
//         var mask_2_graphics_34 = new cjs.Graphics().p("Eg/1AmxMAAAgy8MCWLAAAMAAAAy8g");

//         this.timeline.addTween(cjs.Tween.get(mask_2).to({graphics:null,x:0,y:0}).wait(23).to({graphics:mask_2_graphics_23,x:161.725,y:333.1}).wait(1).to({graphics:mask_2_graphics_24,x:203.8,y:333.1}).wait(1).to({graphics:mask_2_graphics_25,x:245.9,y:333.1}).wait(1).to({graphics:mask_2_graphics_26,x:287.975,y:333.1}).wait(1).to({graphics:mask_2_graphics_27,x:330.075,y:333.1}).wait(1).to({graphics:mask_2_graphics_28,x:372.15,y:333.1}).wait(1).to({graphics:mask_2_graphics_29,x:414.25,y:333.1}).wait(1).to({graphics:mask_2_graphics_30,x:456.325,y:333.1}).wait(1).to({graphics:mask_2_graphics_31,x:498.425,y:333.1}).wait(1).to({graphics:mask_2_graphics_32,x:540.5,y:333.1}).wait(1).to({graphics:mask_2_graphics_33,x:582.6,y:333.1}).wait(1).to({graphics:mask_2_graphics_34,x:552.65,y:248.0785}).wait(167));

//         // Layer_1
//         this.instance_5 = new lib.pltform_copy2();
//         this.instance_5.setTransform(607.2,398.95,1,1,0,0,0,336.7,33.7);
//         this.instance_5._off = true;

//         var maskedShapeInstanceList = [this.instance_5];

//         for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
//             maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
//         }

//         this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(24).to({_off:false},0).to({_off:true},10).wait(167));

//         // Layer_6
//         this.instance_6 = new lib.platform1c();
//         this.instance_6.setTransform(611,341.5,1,1,0,0,0,611,341.5);
//         this.instance_6.alpha = 0;
//         this.instance_6._off = true;

//         var maskedShapeInstanceList = [this.instance_6];

//         for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
//             maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
//         }

//         this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(24).to({_off:false},0).to({alpha:1},7).to({_off:true},169).wait(1));

//         // Layer_4 (mask)
//         var mask_3 = new cjs.Shape();
//         mask_3._off = true;
//         var mask_3_graphics_10 = new cjs.Graphics().p("Egy9AShQoJhHkkhZQkRhSgIhMIhAs4QgXgVgBgVIhRvpQgBhIFkhDQFYhAJzgxQUshpdSAAQdTAAUtBpQJyAxFYBAQFjBDAABIQAAAIgDAIIg2PRIAAAFIgBAJIAAAFIgCAAQgSAxh9AyIgpLrIABAFIgBAKIgBAFIAAAAQgcBMkaBQQkuBYoJBEQzqCo+FAAQ+pAAzwitg");
//         var mask_3_graphics_11 = new cjs.Graphics().p("Egy9ATPQoJhKkkhbQkRhXgIhOIhAtYQgXgXgBgVIhRwPQgBhMFkhFQFYhDJzgzQUshtdSAAQdTAAUtBtQJyAzFYBDQFjBFAABMQAAAHgDAJIg2P3IAAAFIgBAKIAAAFIgCAAQgSAyh9A0IgpMIIABAGIgBAKIgBAGIAAAAQgcBPkaBTQkuBboJBHQzqCu+FAAQ+pAAzwi0g");
//         var mask_3_graphics_12 = new cjs.Graphics().p("Egy9AT9QoJhNkkhfQkRhZgIhRIhAt5QgXgXgBgWIhRw3QgBhOFkhIQFYhFJzg1QUshxdSAAQdTAAUtBxQJyA1FYBFQFjBIAABOQAAAIgDAJIg2QdIAAAGIgBAKIAAAFIgCAAQgSA0h9A3IgpMlIABAFIgBAMIgBAEIAAAAQgcBSkaBXQkuBeoJBKQzqC1+FAAQ+pAAzwi7g");
//         var mask_3_graphics_13 = new cjs.Graphics().p("Egy9AUsQoJhQkkhiQkRhdgIhUIhAuZQgXgYgBgXIhRxdQgBhSFkhKQFYhIJzg3QUsh1dSAAQdTAAUtB1QJyA3FYBIQFjBKAABSQAAAIgDAJIg2RDIAAAGIgBALIAAAFIgCAAQgSA2h9A4IgpNCIABAGIgBAMIgBAFIAAAAQgcBVkaBaQkuBhoJBNQzqC7+FAAQ+pAAzwjBg");
//         var mask_3_graphics_14 = new cjs.Graphics().p("Egy9AVZQoJhSkkhlQkRhhgIhXIhAu4QgXgZgBgYIhRyEQgBhVFkhMQFYhLJzg5QUsh4dSAAQdTAAUtB4QJyA5FYBLQFjBMAABVQAAAHgDALIg2RoIAAAHIgBAKIAAAGIgCAAQgSA4h9A6IgpNfIABAGIgBAMIgBAGIAAAAQgcBYkaBcQkuBloJBQQzqDC+FAAQ+pAAzwjJg");
//         var mask_3_graphics_15 = new cjs.Graphics().p("Egy9AWIQoJhVkkhqQkRhjgIhaIhAvZQgXgZgBgZIhRysQgBhXFkhPQFYhMJzg7QUsh9dSgBQdTABUtB9QJyA7FYBMQFjBPAABXQAAAJgDAKIg2SPIAAAHIgBALIAAAGIgCAAQgSA5h9A9IgpN8IABAGIgBANIgBAFIAAAAQgcBbkaBgQkuBooJBSQzqDJ+FAAQ+pgBzwjOg");
//         var mask_3_graphics_16 = new cjs.Graphics().p("Egy9AW2QoJhZkkhsQkRhngIhcIhAv5QgXgbgBgZIhRzSQgBhbFkhRQFYhPJzg+QUsiAdSAAQdTAAUtCAQJyA+FYBPQFjBRAABbQAAAIgDALIg2S1IAAAGIgBAMIAAAGIgCAAQgSA7h9A/IgpOaIABAFIgBAOIgBAFIAAAAQgcBekaBjQkuBsoJBUQzqDP+FAAQ+pABzwjWg");
//         var mask_3_graphics_17 = new cjs.Graphics().p("Egy9AXkQoJhbkkhwQkRhpgIhgIhAwaQgXgbgBgaIhRz5QgBhdFkhVQFYhSJzg+QUsiGdSAAQdTAAUtCGQJyA+FYBSQFjBVAABdQAAAIgDAMIg2TbIAAAGIgBAMIAAAGIgCAAQgSA9h9BBIgpO3IABAGIgBAOIgBAFIAAAAQgcBhkaBmQkuBwoJBXQzqDW+FgBQ+pAAzwjcg");
//         var mask_3_graphics_18 = new cjs.Graphics().p("Egy9AYTQoJhekkh0QkRhtgIhiIhAw6QgXgcgBgbIhR0hQgBhfFkhYQFYhTJzhBQUsiJdSgBQdTABUtCJQJyBBFYBTQFjBYAABfQAAAKgDALIg2UBIAAAHIgBANIAAAGIgCAAQgSA/h9BCIgpPUIABAHIgBAOIgBAFIAAAAQgcBlkaBpQkuByoJBbQzqDb+FAAQ+pABzwjjg");
//         var mask_3_graphics_19 = new cjs.Graphics().p("Egy9AZAQoJhgkkh3QkRhwgIhmIhAxZQgXgdgBgcIhR1IQgBhiFkhaQFYhWJzhDQUsiNdSAAQdTAAUtCNQJyBDFYBWQFjBaAABiQAAAKgDAMIg2UnIAAAHIgBANIAAAGIgCAAQgSBBh9BFIgpPxIABAHIgBAOIgBAGIAAAAQgcBmkaBtQkuB2oJBdQzqDi+FAAQ+pAAzwjqg");
//         var mask_3_graphics_20 = new cjs.Graphics().p("Egy9AZvQoJhkkkh6QkRhzgIhpIhAx5QgXgegBgdIhR1uQgBhmFkhcQFYhZJzhFQUsiRdSAAQdTAAUtCRQJyBFFYBZQFjBcAABmQAAAJgDAMIg2VOIAAAHIgBANIAAAHIgCAAQgSBDh9BGIgpQOIABAHIgBAPIgBAGIAAAAQgcBqkaBvQkuB6oJBfQzqDp+FAAQ+pAAzwjwg");
//         var mask_3_graphics_21 = new cjs.Graphics().p("Egy9AacQoJhlkkh+QkRh3gIhrIhAyaQgXgfgBgdIhR2WQgBhoFkhfQFYhbJzhHQUsiVdSAAQdTAAUtCVQJyBHFYBbQFjBfAABoQAAALgDAMIg2VzIAAAIIgBANIAAAHIgCAAQgSBFh9BJIgpQqIABAHIgBAQIgBAGIAAAAQgcBtkaByQkuB9oJBiQzqDw+FAAQ+pAAzwj4g");
//         var mask_3_graphics_22 = new cjs.Graphics().p("Egy9AbLQoJhpkkiBQkRh6gIhuIhAy6QgXgfgBgfIhR28QgBhsFkhhQFYheJzhIQUsiadSAAQdTAAUtCaQJyBIFYBeQFjBhAABsQAAAKgDANIg2WZIAAAIIgBAOIAAAGIgCAAQgSBHh9BLIgpRIIABAIIgBAPIgBAGIAAAAQgcBwkaB2QkuCAoJBlQzqD2+FAAQ+pAAzwj+g");

//         this.timeline.addTween(cjs.Tween.get(mask_3).to({graphics:null,x:0,y:0}).wait(10).to({graphics:mask_3_graphics_10,x:614.15,y:322.8}).wait(1).to({graphics:mask_3_graphics_11,x:614.15,y:317.5}).wait(1).to({graphics:mask_3_graphics_12,x:614.15,y:312.225}).wait(1).to({graphics:mask_3_graphics_13,x:614.15,y:306.925}).wait(1).to({graphics:mask_3_graphics_14,x:614.15,y:301.65}).wait(1).to({graphics:mask_3_graphics_15,x:614.15,y:296.35}).wait(1).to({graphics:mask_3_graphics_16,x:614.15,y:291.1}).wait(1).to({graphics:mask_3_graphics_17,x:614.15,y:285.8}).wait(1).to({graphics:mask_3_graphics_18,x:614.15,y:280.5}).wait(1).to({graphics:mask_3_graphics_19,x:614.15,y:275.225}).wait(1).to({graphics:mask_3_graphics_20,x:614.15,y:269.925}).wait(1).to({graphics:mask_3_graphics_21,x:614.15,y:264.65}).wait(1).to({graphics:mask_3_graphics_22,x:614.15,y:259.35}).wait(1).to({graphics:null,x:0,y:0}).wait(178));

//         // Layer_1
//         this.instance_7 = new lib.platorm1b();
//         this.instance_7.setTransform(611,513.5,1,1,0,0,0,611,341.5);
//         this.instance_7._off = true;

//         var maskedShapeInstanceList = [this.instance_7];

//         for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
//             maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
//         }

//         this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(10).to({_off:false},0).to({y:341.5},13,cjs.Ease.quadInOut).to({_off:true},177).wait(1));

//         // bottom_text1
//         this.instance_8 = new lib.bottom_text1();
//         this.instance_8.setTransform(610.15,513.65,1,1,0,0,0,133.6,8.7);
//         this.instance_8.alpha = 0;
//         this.instance_8._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(65).to({_off:false},0).to({y:496.65,alpha:1},8,cjs.Ease.quadOut).to({_off:true},127).wait(1));

//         // bottom1_copy
//         this.bottom_icons = new lib.bottom_icons();
//         this.bottom_icons.name = "bottom_icons";
//         this.bottom_icons.setTransform(608.15,590.35,1,1,0,0,0,305.8,65.1);
//         this.bottom_icons._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.bottom_icons).wait(45).to({_off:false},0).to({_off:true},155).wait(1));

//         // Layer_14
//         this.instance_9 = new lib.grad_a1();
//         this.instance_9.setTransform(-20.35,857.25,0.6537,2.5611,90,0,0,557.5,485.1);
//         this.instance_9.alpha = 0;
//         this.instance_9._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(33).to({_off:false},0).to({regX:557.8,regY:484.8,scaleX:0.1706,x:-24.6,y:694.6,alpha:1},13).to({_off:true},154).wait(1));

//         // Layer_12
//         this.instance_10 = new lib.grad_a1();
//         this.instance_10.setTransform(576.85,615.05,0.548,2.9635,-90,0,0,557.3,242.4);
//         this.instance_10._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(33).to({_off:false},0).wait(1).to({regX:557.5,regY:242.5,x:583.55,y:557.05},0).wait(1).to({x:590,y:498.75},0).wait(1).to({x:596.3,y:442},0).wait(1).to({x:602.2,y:388.5},0).wait(1).to({x:607.6,y:339.45},0).wait(1).to({scaleY:2.9634,x:612.45,y:295.45},0).wait(1).to({x:616.75,y:256.7},0).wait(1).to({x:620.45,y:223.05},0).wait(1).to({x:623.65,y:194.2},0).wait(1).to({x:626.35,y:169.65},0).wait(1).to({x:628.65,y:149.05},0).wait(1).to({x:630.55,y:131.9},0).wait(1).to({regX:557.2,regY:242.4,x:631.75,y:118.15},0).wait(1).to({regX:557.5,regY:242.5,x:633.2,y:107.25,alpha:0.6343},0).wait(1).to({scaleY:2.9635,x:634.1,y:99,alpha:0.3512},0).wait(1).to({x:634.75,y:92.9,alpha:0.1422},0).wait(1).to({regX:557.3,regY:242.4,x:634.85,y:88.9,alpha:0},0).to({_off:true},1).wait(150));

//         // Layer_13
//         this.instance_11 = new lib.data_1();
//         this.instance_11.setTransform(611,586.5,1,1,0,0,0,611,341.5);
//         this.instance_11._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(33).to({_off:false},0).to({_off:true},167).wait(1));

//         // Layer_11
//         this.instance_12 = new lib.bottom_bg();
//         this.instance_12._off = true;

//         this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(33).to({_off:false},0).to({_off:true},167).wait(1));

//         // buttons_main
//         this.button_sec = new lib.button_top();
//         this.button_sec.name = "button_sec";
//         this.button_sec.setTransform(354,217.1,0.933,0.933,0,0,0,89.5,54.1);
//         new cjs.ButtonHelper(this.button_sec, 0, 1, 1);

//         this.button_obsv = new lib.button_top();
//         this.button_obsv.name = "button_obsv";
//         this.button_obsv.setTransform(526.5,217.1,0.933,0.933,0,0,0,89.5,54.1);
//         new cjs.ButtonHelper(this.button_obsv, 0, 1, 1);

//         this.button_custom = new lib.button_top();
//         this.button_custom.name = "button_custom";
//         this.button_custom.setTransform(897.5,193.5,1,1,0,0,0,89.5,54);
//         new cjs.ButtonHelper(this.button_custom, 0, 1, 1);

//         this.button_comm = new lib.button_top();
//         this.button_comm.name = "button_comm";
//         this.button_comm.setTransform(714.5,193.5,1,1,0,0,0,89.5,54);
//         new cjs.ButtonHelper(this.button_comm, 0, 1, 1);

//         this.button_platform1 = new lib.button_platform1();
//         this.button_platform1.name = "button_platform1";
//         this.button_platform1.setTransform(616.5,365.95,1,1,0,0,0,400.1,80);
//         new cjs.ButtonHelper(this.button_platform1, 0, 1, 1);

//         this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.button_platform1},{t:this.button_comm},{t:this.button_custom},{t:this.button_obsv},{t:this.button_sec}]},93).to({state:[]},107).wait(1));

//         this._renderFirstFrame();

//     }).prototype = p = new cjs.MovieClip();
//     p.nominalBounds = new cjs.Rectangle(-141.5,-216.6,1495.3,1438.3);


//     // stage content:
//     (lib.Splunk_Marketecture_mobile_R2_003 = function(mode,startPosition,loop,reversed) {
//     if (loop == null) { loop = true; }
//     if (reversed == null) { reversed = false; }
//         var props = new Object();
//         props.mode = mode;
//         props.startPosition = startPosition;
//         props.labels = {};
//         props.loop = loop;
//         props.reversed = reversed;
//         cjs.MovieClip.apply(this,[props]);

//         // Layer_1
//         this.instance = new lib.main();
//         this.instance.setTransform(-170.1,-56.7);

//         this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

//         this._renderFirstFrame();

//     }).prototype = p = new lib.AnMovieClip();
//     p.nominalBounds = new cjs.Rectangle(0,0,0,0);
//     // library properties:
//     lib.properties = {
//         id: 'F739BF0229A9214E98F81D1F7A380E32',
//         width: 880,
//         height: 683,
//         fps: 24,
//         color: "#FFFFFF",
//         opacity: 1.00,
//         manifest: [
//             {src:"/canvas/images/Splunk_Marketecture_mobile_R2_atlas_1.png", id:"Splunk_Marketecture_mobile_R2_atlas_1"}
//         ],
//         preloads: []
//     };


//     // bootstrap callback support:

//     (lib.Stage = function(canvas) {
//         createjs.Stage.call(this, canvas);
//     }).prototype = p = new createjs.Stage();

//     p.setAutoPlay = function(autoPlay) {
//         this.tickEnabled = autoPlay;
//     }
//     p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
//     p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
//     p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
//     p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

//     p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

//     an.bootcompsLoaded = an.bootcompsLoaded || [];
//     if(!an.bootstrapListeners) {
//         an.bootstrapListeners=[];
//     }

//     an.bootstrapCallback=function(fnCallback) {
//         an.bootstrapListeners.push(fnCallback);
//         if(an.bootcompsLoaded.length > 0) {
//             for(var i=0; i<an.bootcompsLoaded.length; ++i) {
//                 fnCallback(an.bootcompsLoaded[i]);
//             }
//         }
//     };

//     an.compositions = an.compositions || {};
//     an.compositions['F739BF0229A9214E98F81D1F7A380E32'] = {
//         getStage: function() { return exportRoot.stage; },
//         getLibrary: function() { return lib; },
//         getSpriteSheet: function() { return ss; },
//         getImages: function() { return img; }
//     };

//     an.compositionLoaded = function(id) {
//         an.bootcompsLoaded.push(id);
//         for(var j=0; j<an.bootstrapListeners.length; j++) {
//             an.bootstrapListeners[j](id);
//         }
//     }

//     an.getComposition = function(id) {
//         return an.compositions[id];
//     }


//     an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
//         var lastW, lastH, lastS=1;		
//         window.addEventListener('resize', resizeCanvas);		
//         resizeCanvas();		
//         function resizeCanvas() {			
//             var w = lib.properties.width, h = lib.properties.height;			
//             var iw = window.innerWidth, ih=window.innerHeight;			
//             var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
//             if(isResp) {                
//                 if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
//                     sRatio = lastS;                
//                 }				
//                 else if(!isScale) {					
//                     if(iw<w || ih<h)						
//                         sRatio = Math.min(xRatio, yRatio);				
//                 }				
//                 else if(scaleType==1) {					
//                     sRatio = Math.min(xRatio, yRatio);				
//                 }				
//                 else if(scaleType==2) {					
//                     sRatio = Math.max(xRatio, yRatio);				
//                 }			
//             }
//             domContainers[0].width = w * pRatio * sRatio;			
//             domContainers[0].height = h * pRatio * sRatio;
//             domContainers.forEach(function(container) {				
//                 container.style.width = w * sRatio + 'px';				
//                 container.style.height = h * sRatio + 'px';			
//             });
//             stage.scaleX = pRatio*sRatio;			
//             stage.scaleY = pRatio*sRatio;
//             lastW = iw; lastH = ih; lastS = sRatio;            
//             stage.tickOnUpdate = false;            
//             stage.update();            
//             stage.tickOnUpdate = true;		
//         }
//     }
//     an.handleSoundStreamOnTick = function(event) {
//         if(!event.paused){
//             var stageChild = stage.getChildAt(0);
//             if(!stageChild.paused || stageChild.ignorePause){
//                 stageChild.syncStreamSounds();
//             }
//         }
//     }
//     an.handleFilterCache = function(event) {
//         if(!event.paused){
//             var target = event.target;
//             if(target){
//                 if(target.filterCacheList){
//                     for(var index = 0; index < target.filterCacheList.length ; index++){
//                         var cacheInst = target.filterCacheList[index];
//                         if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
//                             cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
//                         }
//                     }
//                 }
//             }
//         }
//     }


//     })(createjs = createjs||{}, AdobeAn = AdobeAn||{});

//     var createjs, AdobeAn;
//     var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
// function init() {
// 	canvas = document.getElementById("canvas");
// 	anim_container = document.getElementById("animation_container");
// 	dom_overlay_container = document.getElementById("dom_overlay_container");
// 	var comp=AdobeAn.getComposition("F739BF0229A9214E98F81D1F7A380E32");
// 	var lib=comp.getLibrary();
// 	var loader = new createjs.LoadQueue(false);
// 	loader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
// 	loader.addEventListener("complete", function(evt){handleComplete(evt,comp)});
// 	var lib=comp.getLibrary();
// 	loader.loadManifest(lib.properties.manifest);
// }
// function handleFileLoad(evt, comp) {
// 	var images=comp.getImages();	
// 	if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }	
// }
// function handleComplete(evt,comp) {
// 	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
// 	var lib=comp.getLibrary();
// 	var ss=comp.getSpriteSheet();
// 	var queue = evt.target;
// 	var ssMetadata = lib.ssMetadata;
// 	for(i=0; i<ssMetadata.length; i++) {
// 		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
// 	}
// 	if($(window).width()<768)
// 		exportRoot = new lib.Splunk_Marketecture_mobile_R2_003();
// 	stage = new lib.Stage(canvas);
// 	stage.enableMouseOver();	
// 	//Registers the "tick" event listener.
// 	fnStartAnimation = function() {
// 		stage.addChild(exportRoot);
// 		createjs.Ticker.framerate = lib.properties.fps;
// 		createjs.Ticker.addEventListener("tick", stage);
// 	}	    
// 	//Code to support hidpi screens and responsive scaling.
// 	AdobeAn.makeResponsive(false,'both',false,1,[canvas,anim_container,dom_overlay_container]);	
// 	AdobeAn.compositionLoaded(lib.properties.id);
// 	fnStartAnimation();
// }
// $(document).ready(function(){


// let count =0;

// $(window).scroll(function() {    
//     var scroll = $(window).scrollTop();
//     if (scroll >= $('splunk-intro-with-img').offset().top - 150 && count==0) {
//         init();
// 		count=1;
//     }
// });

// })	
"use strict";
'use strict';

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
                    responsive: [{
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }, {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true
                        }
                    }, {
                        breakpoint: 595,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true
                        }
                    }]
                });
            }
        });
    });
})(jQuery);
'use strict';

(function ($) {

    smoothScroll();

    $(window).on('load resize', function () {
        var checkTarget = $('.sticky-bar');
        if (checkTarget.length) {
            stickyFilterBar();
        }
    });

    $('.drop-btn').on('click', function () {

        $(this).toggleClass('active');

        $('.sticky-bar ul').toggleClass('active');
    });

    $('.sticky-bar ul li a').on('click', function (e) {
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
'use strict';

(function ($) {
    $(document).ready(function () {
        $('.tab-grid .item-wrap .column-item').eq(0).addClass('active');
        $('.tab-grid .item-wrap .list-wrap .list-item').eq(0).addClass('active');
        appendAccordian();

        var tabChange = function tabChange() {
            var tabs = $('.tab-grid .list-wrap .list-item');
            var active = tabs.filter('.active');
            var next = active.next('.list-item').length ? active.next('.list-item') : tabs.filter(':first-child');
            next.addClass('active');
            next.siblings().removeClass('active');
            var index = next.index();
            $('.tab-grid .column-wrap .column-item').eq(index).addClass('active').siblings().removeClass('active');
        };
        // Tab Cycle function
        var tabCycle = setInterval(tabChange, 10000);
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
"use strict";
'use strict';

(function ($) {
  $(document).ready(function () {
    $('.slider-for').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: false,
      asNavFor: '.slider-nav',
      arrows: false
    });
    $('.slider-nav').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: false,
      adaptiveHeight: true,
      vertical: true,
      verticalSwiping: true,
      arrow: true,
      focusOnSelect: true

    });

    window.addEventListener('load', function () {
      var tabSlider = document.querySelector(".tab-slider-img");

      if (tabSlider) {
        setTimeout(function () {
          tabSlider.className += " slider-active";
        }, 500);
      }
    });
  });
})(jQuery);
// (function ($) {
//   $(document).ready(function() {
//   $('.slider-for').slick({
//       infinite: true,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       fade: true,
//       asNavFor: '.slider-nav',
//       arrows: false
//   });
//   $('.slider-nav').slick({
//       infinite: true,
//       slidesToShow: 6,
//       slidesToScroll: 1,
//       asNavFor: '.slider-for',
//       dots: false,
//       arrow: true,
//       focusOnSelect: true,
//       responsive: [
//           {
//               breakpoint: 991,
//               settings: {
//                   slidesToShow: 4,

//               },
//           },
//           {
//               breakpoint: 767,
//               settings: {
//                   slidesToShow: 3,
//               },
//           },
//           {
//               breakpoint: 595,
//               settings: {
//                   slidesToShow: 2,
//               },
//           },
//           {
//               breakpoint: 400,
//               settings: {
//                   slidesToShow: 1,
//               },
//           },
//       ],
//   });

//   window.addEventListener('load', function () {
//       let tabSlider = document.querySelector(".tab-slider");

//       if (tabSlider) {
//           setTimeout(function () {
//               tabSlider.className += " slider-active";
//           }, 500);
//       }
//   });
//   })
// })(jQuery);
"use strict";
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelectorAll(".tab-with-video").length > 0) {
    var tabWithVideo = document.querySelectorAll(".tab-with-video");
    var desktopButtons = document.querySelectorAll(".tab-with-video .tab-body .tab h6");
    var mobileButtons = document.querySelectorAll(".tab-with-video .tab-body .mobile-view h6");
    var img = document.querySelectorAll(".tab-with-video .tab-content .inner-content");
    var dropdown = document.querySelector(".tab-with-video .tab-body .open");
    var contentWrap = document.querySelector(".tab-with-video .tab-body .mobile-view");
    var spanHeading = document.querySelector(".tab-with-video .open span");

    if (tabWithVideo.length > 0) {
      img[0].classList.add("active");
      desktopButtons[0].classList.add("active");
      mobileButtons[0].classList.add("active");
      desktopButtons.forEach(function (btn, index) {
        btn.addEventListener("click", function () {
          spanHeading.textContent = desktopButtons[index].textContent;
          desktopButtons.forEach(function (btn) {
            return btn.classList.remove("active");
          });
          mobileButtons.forEach(function (btn) {
            return btn.classList.remove("active");
          });
          img.forEach(function (image) {
            return image.classList.remove("active");
          });
          btn.classList.add("active");
          img[index].classList.add("active");
          mobileButtons[index].classList.add("active");
        });
      });
      mobileButtons.forEach(function (btn, index) {
        btn.addEventListener("click", function () {
          spanHeading.textContent = mobileButtons[index].textContent;
          mobileButtons.forEach(function (btn) {
            return btn.classList.remove("active");
          });
          desktopButtons.forEach(function (btn) {
            return btn.classList.remove("active");
          });
          img.forEach(function (image) {
            return image.classList.remove("active");
          });
          btn.classList.add("active");
          img[index].classList.add("active");
          desktopButtons[index].classList.add("active");
          contentWrap.classList.toggle("active");
        });
      });
    }
    dropdown.addEventListener("click", function () {
      contentWrap.classList.toggle("active");
      dropdown.classList.toggle("active");
    });
  }
});
"use strict";

(function ($) {
    $(document).ready(function () {
        if ($(".tabs-with-accordion").length) {
            $('.tabs-with-accordion .nested-accordion h3').click(function (e) {
                $(".accordion-item").removeClass("active");
                $(".accordion-item .pannel").slideUp();
                e.preventDefault();
                var $this = $(this);
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
"use strict";
// (function ($) {
//     $(document).ready(function() {
//     $('.slider-for').slick({
//         infinite: true,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         fade: true,
//         asNavFor: '.slider-nav',
//         arrows: false
//     });
//     $('.slider-nav').slick({
//         infinite: true,
//         slidesToShow: 6,
//         slidesToScroll: 1,
//         asNavFor: '.slider-for',
//         dots: false,
//         arrow: true,
//         focusOnSelect: true,
//         responsive: [
//             {
//                 breakpoint: 991,
//                 settings: {
//                     slidesToShow: 4,

//                 },
//             },
//             {
//                 breakpoint: 767,
//                 settings: {
//                     slidesToShow: 3,
//                 },
//             },
//             {
//                 breakpoint: 595,
//                 settings: {
//                     slidesToShow: 2,
//                 },
//             },
//             {
//                 breakpoint: 400,
//                 settings: {
//                     slidesToShow: 1,
//                 },
//             },
//         ],
//     });

//     window.addEventListener('load', function () {
//         let tabSlider = document.querySelector(".tab-slider");

//         if (tabSlider) {
//             setTimeout(function () {
//                 tabSlider.className += " slider-active";
//             }, 500);
//         }
//     });
//     })
//   })(jQuery);
"use strict";
"use strict";

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
// (function ($) {
//   $(document).ready(function () {
//       let jsonData = [];
//       let selectedYears = new Set();
//       let selectedTopics = new Set();
//       const maxItems = 9;
//       let currentPage = 1;


//       // Helper function to update the URL based on selected filters and page number
//       function updateURLParams() {
//           const url = new URL(window.location);
//           url.searchParams.delete("year");
//           url.searchParams.delete("topic");

//           // Only set the page number if it's greater than 1
//           if (currentPage > 1) {
//               url.searchParams.set("page", currentPage);  // Update page number in URL
//           } else {
//               url.searchParams.delete("page"); // Remove page parameter if currentPage is 1
//           }

//           selectedYears.forEach(year => url.searchParams.append("year", year));
//           selectedTopics.forEach(topic => url.searchParams.append("topic", topic));

//           window.history.replaceState({}, '', url);
//       }

//       // Helper function to read filters and page number from URL
//       function loadFiltersFromURL() {
//           const urlParams = new URLSearchParams(window.location.search);
//           selectedYears = new Set(urlParams.getAll("year"));
//           selectedTopics = new Set(urlParams.getAll("topic"));
//           currentPage = parseInt(urlParams.get("page")) || 1;  // Set page from URL or default to 1
//       }

//       // Hide no-result on page load
//       $(".no-result").removeClass("active");

//       // Fetch JSON data and display it in the container
//       $.getJSON("/ajayverma/json/resource-filter.json", function (data) {
//           jsonData = data;
//           const parentDiv = $('.resource-filter .filter-content-wrap .inner-wrap');
//           parentDiv.empty();
//           data.forEach(item => {
//               const itemWrap = $(`
//                   <div class="item-wrap">
//                       <div class="content-inner">
//                           <div class="img-wrap">
//                               <img src="${item.imgSource}" alt="Manage banner">
//                           </div>
//                           <div class="body-content">
//                               <h6>${item.year} | ${item.topic}</h6>
//                               <h4>${item.title}</h4>
//                               <p>${item.description}</p>
//                           </div>
//                       </div>
//                   </div>
//               `);
//               parentDiv.append(itemWrap);
//           });

//           // Initialize filters from URL if available
//           loadFiltersFromURL();
//           applyURLFilters();
//           filterItems("");
//       });

//       function filterItems(searchText) {
//           let itemsToShow = $(".item-wrap");

//           // Filter by selected years
//           if (selectedYears.size > 0) {
//               itemsToShow = itemsToShow.filter(function () {
//                   const itemYear = $(this).find("h6").text().trim().split(' ')[0];
//                   return selectedYears.has(itemYear);
//               });
//           }

//           // Filter by selected topics
//           if (selectedTopics.size > 0) {
//               itemsToShow = itemsToShow.filter(function () {
//                   const itemTopic = $(this).find("h6").text().trim().split('|')[1].trim();
//                   return selectedTopics.has(itemTopic);
//               });
//           }

//           // Filter by search text
//           if (searchText) {
//               itemsToShow = itemsToShow.filter(function () {
//                   const itemText = $(this).find(".body-content h4").text().toLowerCase();
//                   return itemText.includes(searchText.toLowerCase());
//               });
//           }

//           $(".item-wrap").hide();
//           const totalItems = itemsToShow.length;
//           const totalPages = Math.ceil(totalItems / maxItems);
//           const start = (currentPage - 1) * maxItems;
//           const end = start + maxItems;

//           itemsToShow.slice(start, end).show();
//           $(".pagination-button").toggle(totalItems > maxItems);

//           $(".no-result").toggleClass("active", totalItems === 0);
//           updatePaginationButtons(totalPages);
//           $(".clear-btn").toggleClass("active", selectedYears.size > 0 || selectedTopics.size > 0 || searchText !== "");
//       }

//       function updatePaginationButtons(totalPages) {
//           let paginationHTML = `<li class="prev ${currentPage === 1 ? 'disabled' : ''}"><svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.0332 11.4861L0.99991 6.24307L6.0332 1.00006" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.6318 6.24304L1 6.24304" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></li>`;
//           for (let i = 1; i <= totalPages; i++) {
//               paginationHTML += `<li class="${i === currentPage ? 'active' : ''}">${i}</li>`;
//           }
//           paginationHTML += `<li class="next ${currentPage === totalPages ? 'disabled' : ''}"><svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.59827 11.8596L14.6316 6.61661L9.59827 1.37359" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 6.61658L14.6318 6.61658" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></li>`;
//           $("#pagination-container").html(paginationHTML);
//       }

//       // Handle pagination click events
//       $("#pagination-container").on("click", "li", function () {
//           if ($(this).hasClass("disabled") || $(this).hasClass("active")) return;
//           if ($(this).hasClass("prev")) currentPage--;
//           else if ($(this).hasClass("next")) currentPage++;
//           else currentPage = parseInt($(this).text());

//           updateURLParams(); // Update URL on page change

//           const searchText = $(".input-wrapper .search").val().trim();
//           filterItems(searchText);
//           $('html, body').animate({ scrollTop: $('.resource-filter').offset().top }, 500);
//       });

//       // Apply filters based on URL parameters
//       function applyURLFilters() {
//           selectedYears.forEach(year => $(`#year li:contains(${year})`).addClass("active"));
//           selectedTopics.forEach(topic => $(`#glossary_block li:contains(${topic})`).addClass("active"));
//           filterItems("");
//           updateBadges();
//       }

//       // Event listeners for Year and Topic filters
//       $("#year li").click(function () {
//           const year = $(this).text().trim();
//           if (year === "All") {
//               selectedYears.clear();
//               $("#year li").removeClass("active");
//               $(this).addClass("active");
//           } else {
//               $(this).toggleClass("active");
//               $(this).hasClass("active") ? selectedYears.add(year) : selectedYears.delete(year);
//               $("#year .all").removeClass("active");
//           }

//           updateURLParams();
//           currentPage = 1;
//           filterItems($(".input-wrapper .search").val().trim());
//           updateBadges();
//       });

//       $("#glossary_block li").click(function () {
//           const topic = $(this).text().trim();
//           if (topic === "All") {
//               selectedTopics.clear();
//               $("#glossary_block li").removeClass("active");
//               $(this).addClass("active");
//           } else {
//               $(this).toggleClass("active");
//               $(this).hasClass("active") ? selectedTopics.add(topic) : selectedTopics.delete(topic);
//               $("#glossary_block .all").removeClass("active");
//           }

//           updateURLParams();
//           currentPage = 1;
//           filterItems($(".input-wrapper .search").val().trim());
//           updateBadges();
//       });

//       // Badge update for filters
//       function updateBadges() {
//           const fieldWrap = $(".field-wrap");
//           fieldWrap.empty();
//           selectedYears.forEach(year => fieldWrap.append(`<span class="filter-badge year">${year}</span>`));
//           selectedTopics.forEach(topic => fieldWrap.append(`<span class="filter-badge topic">${topic}</span>`));
//           fieldWrap.toggleClass("active", selectedYears.size > 0 || selectedTopics.size > 0);
//       }

//       // Remove badge and update filter
//       $(".field-wrap").on("click", ".filter-badge", function () {
//           const value = $(this).text().trim();
//           if ($(this).hasClass("year")) {
//               selectedYears.delete(value);
//               $(`#year li:contains(${value})`).addClass("active");
//           } else if ($(this).hasClass("topic")) {
//               selectedTopics.delete(value);
//               $(`#glossary_block li:contains(${value})`).removeClass("active");
//           }

//           $(this).remove();
//           if (!$(".field-wrap .filter-badge").length) {
//               $(".field-wrap").removeClass("active");
//           }

//           updateURLParams();
//           currentPage = 1;
//           const searchText = $(".input-wrapper .search").val().trim();
//           filterItems(searchText);
//       });

//       $(".clear-btn").click(function () {
//           selectedYears.clear();
//           selectedTopics.clear();
//           currentPage = 1;
//           $(".input-wrapper .search").val("");
//           $("#year li, #glossary_block li").removeClass("active");
//           $(".field-wrap").empty().removeClass("active");
//           updateURLParams();
//           filterItems("");
//           $(this).removeClass("active");
//       });

//       $(".input-wrapper .search").on("input", function () {
//           currentPage = 1;
//           filterItems($(this).val().trim());
//       });

//       // Toggle filter lists (Year/Product)
//       $(".resource-filter .outer-wrap .nav-wrapper .table-title").click(function () {
//           if ($(this).parent().hasClass("active")) {
//               $(this).parent().removeClass("active");
//               $(this).parent().find(".list").slideUp();
//           } else {
//               $(".nav-wrapper").removeClass("active");
//               $(".nav-wrapper").find(".list").slideUp();
//               $(this).parent().addClass("active");
//               $(this).parent().find(".list").slideDown();
//           }
//       });

//       // Close filter lists on click outside
//       $(document).on("click", function (e) {
//           var container = $(".resource-filter .outer-wrap .nav-wrapper");
//           if (!container.is(e.target) && container.has(e.target).length === 0) {
//               $(".resource-filter .outer-wrap .nav-wrapper").removeClass("active");
//               $('.resource-filter .outer-wrap .nav-wrapper .list').slideUp();
//           }
//       });
//   });
// })(jQuery);
"use strict";
"use strict";
"use strict";
"use strict";

(function () {
    var MutationObserver,
        Util,
        WeakMap,
        getComputedStyle,
        getComputedStyleRX,
        bind = function bind(fn, me) {
        return function () {
            return fn.apply(me, arguments);
        };
    },
        indexOf = [].indexOf || function (item) {
        for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item) return i;
        }return -1;
    };

    Util = function () {
        function Util() {}

        Util.prototype.extend = function (custom, defaults) {
            var key, value;
            for (key in defaults) {
                value = defaults[key];
                if (custom[key] == null) {
                    custom[key] = value;
                }
            }
            return custom;
        };

        Util.prototype.isMobile = function (agent) {
            return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent)
            );
        };

        Util.prototype.createEvent = function (event, bubble, cancel, detail) {
            var customEvent;
            if (bubble == null) {
                bubble = false;
            }
            if (cancel == null) {
                cancel = false;
            }
            if (detail == null) {
                detail = null;
            }
            if (document.createEvent != null) {
                customEvent = document.createEvent('CustomEvent');
                customEvent.initCustomEvent(event, bubble, cancel, detail);
            } else if (document.createEventObject != null) {
                customEvent = document.createEventObject();
                customEvent.eventType = event;
            } else {
                customEvent.eventName = event;
            }
            return customEvent;
        };

        Util.prototype.emitEvent = function (elem, event) {
            if (elem.dispatchEvent != null) {
                return elem.dispatchEvent(event);
            } else if (event in (elem != null)) {
                return elem[event]();
            } else if ("on" + event in (elem != null)) {
                return elem["on" + event]();
            }
        };

        Util.prototype.addEvent = function (elem, event, fn) {
            if (elem.addEventListener != null) {
                return elem.addEventListener(event, fn, false);
            } else if (elem.attachEvent != null) {
                return elem.attachEvent("on" + event, fn);
            } else {
                return elem[event] = fn;
            }
        };

        Util.prototype.removeEvent = function (elem, event, fn) {
            if (elem.removeEventListener != null) {
                return elem.removeEventListener(event, fn, false);
            } else if (elem.detachEvent != null) {
                return elem.detachEvent("on" + event, fn);
            } else {
                return delete elem[event];
            }
        };

        Util.prototype.innerHeight = function () {
            if ('innerHeight' in window) {
                return window.innerHeight;
            } else {
                return document.documentElement.clientHeight;
            }
        };

        return Util;
    }();

    WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = function () {
        function WeakMap() {
            this.keys = [];
            this.values = [];
        }

        WeakMap.prototype.get = function (key) {
            var i, item, j, len, ref;
            ref = this.keys;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                item = ref[i];
                if (item === key) {
                    return this.values[i];
                }
            }
        };

        WeakMap.prototype.set = function (key, value) {
            var i, item, j, len, ref;
            ref = this.keys;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                item = ref[i];
                if (item === key) {
                    this.values[i] = value;
                    return;
                }
            }
            this.keys.push(key);
            return this.values.push(value);
        };

        return WeakMap;
    }());

    MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = function () {
        function MutationObserver() {
            if (typeof console !== "undefined" && console !== null) {
                console.warn('MutationObserver is not supported by your browser.');
            }
            if (typeof console !== "undefined" && console !== null) {
                console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
            }
        }

        MutationObserver.notSupported = true;

        MutationObserver.prototype.observe = function () {};

        return MutationObserver;
    }());

    getComputedStyle = this.getComputedStyle || function (el, pseudo) {
        this.getPropertyValue = function (prop) {
            var ref;
            if (prop === 'float') {
                prop = 'styleFloat';
            }
            if (getComputedStyleRX.test(prop)) {
                prop.replace(getComputedStyleRX, function (_, _char) {
                    return _char.toUpperCase();
                });
            }
            return ((ref = el.currentStyle) != null ? ref[prop] : void 0) || null;
        };
        return this;
    };

    getComputedStyleRX = /(\-([a-z]){1})/g;

    this.WOW = function () {
        WOW.prototype.defaults = {
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true,
            callback: null
        };

        function WOW(options) {
            if (options == null) {
                options = {};
            }
            this.scrollCallback = bind(this.scrollCallback, this);
            this.scrollHandler = bind(this.scrollHandler, this);
            this.resetAnimation = bind(this.resetAnimation, this);
            this.start = bind(this.start, this);
            this.scrolled = true;
            this.config = this.util().extend(options, this.defaults);
            this.animationNameCache = new WeakMap();
            this.wowEvent = this.util().createEvent(this.config.boxClass);
        }

        WOW.prototype.init = function () {
            var ref;
            this.element = window.document.documentElement;
            if ((ref = document.readyState) === "interactive" || ref === "complete") {
                this.start();
            } else {
                this.util().addEvent(document, 'DOMContentLoaded', this.start);
            }
            return this.finished = [];
        };

        WOW.prototype.start = function () {
            var box, j, len, ref;
            this.stopped = false;
            this.boxes = function () {
                var j, len, ref, results;
                ref = this.element.querySelectorAll("." + this.config.boxClass);
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    box = ref[j];
                    results.push(box);
                }
                return results;
            }.call(this);
            this.all = function () {
                var j, len, ref, results;
                ref = this.boxes;
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    box = ref[j];
                    results.push(box);
                }
                return results;
            }.call(this);
            if (this.boxes.length) {
                if (this.disabled()) {
                    this.resetStyle();
                } else {
                    ref = this.boxes;
                    for (j = 0, len = ref.length; j < len; j++) {
                        box = ref[j];
                        this.applyStyle(box, true);
                    }
                }
            }
            if (!this.disabled()) {
                this.util().addEvent(window, 'scroll', this.scrollHandler);
                this.util().addEvent(window, 'resize', this.scrollHandler);
                this.interval = setInterval(this.scrollCallback, 50);
            }
            if (this.config.live) {
                return new MutationObserver(function (_this) {
                    return function (records) {
                        var k, len1, node, record, results;
                        results = [];
                        for (k = 0, len1 = records.length; k < len1; k++) {
                            record = records[k];
                            results.push(function () {
                                var l, len2, ref1, results1;
                                ref1 = record.addedNodes || [];
                                results1 = [];
                                for (l = 0, len2 = ref1.length; l < len2; l++) {
                                    node = ref1[l];
                                    results1.push(this.doSync(node));
                                }
                                return results1;
                            }.call(_this));
                        }
                        return results;
                    };
                }(this)).observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
        };

        WOW.prototype.stop = function () {
            this.stopped = true;
            this.util().removeEvent(window, 'scroll', this.scrollHandler);
            this.util().removeEvent(window, 'resize', this.scrollHandler);
            if (this.interval != null) {
                return clearInterval(this.interval);
            }
        };

        WOW.prototype.sync = function (element) {
            if (MutationObserver.notSupported) {
                return this.doSync(this.element);
            }
        };

        WOW.prototype.doSync = function (element) {
            var box, j, len, ref, results;
            if (element == null) {
                element = this.element;
            }
            if (element.nodeType !== 1) {
                return;
            }
            element = element.parentNode || element;
            ref = element.querySelectorAll("." + this.config.boxClass);
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
                box = ref[j];
                if (indexOf.call(this.all, box) < 0) {
                    this.boxes.push(box);
                    this.all.push(box);
                    if (this.stopped || this.disabled()) {
                        this.resetStyle();
                    } else {
                        this.applyStyle(box, true);
                    }
                    results.push(this.scrolled = true);
                } else {
                    results.push(void 0);
                }
            }
            return results;
        };

        WOW.prototype.show = function (box) {
            this.applyStyle(box);
            box.className = box.className + " " + this.config.animateClass;
            if (this.config.callback != null) {
                this.config.callback(box);
            }
            this.util().emitEvent(box, this.wowEvent);
            this.util().addEvent(box, 'animationend', this.resetAnimation);
            this.util().addEvent(box, 'oanimationend', this.resetAnimation);
            this.util().addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
            this.util().addEvent(box, 'MSAnimationEnd', this.resetAnimation);
            return box;
        };

        WOW.prototype.applyStyle = function (box, hidden) {
            var delay, duration, iteration;
            duration = box.getAttribute('data-wow-duration');
            delay = box.getAttribute('data-wow-delay');
            iteration = box.getAttribute('data-wow-iteration');
            return this.animate(function (_this) {
                return function () {
                    return _this.customStyle(box, hidden, duration, delay, iteration);
                };
            }(this));
        };

        WOW.prototype.animate = function () {
            if ('requestAnimationFrame' in window) {
                return function (callback) {
                    return window.requestAnimationFrame(callback);
                };
            } else {
                return function (callback) {
                    return callback();
                };
            }
        }();

        WOW.prototype.resetStyle = function () {
            var box, j, len, ref, results;
            ref = this.boxes;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
                box = ref[j];
                results.push(box.style.visibility = 'visible');
            }
            return results;
        };

        WOW.prototype.resetAnimation = function (event) {
            var target;
            if (event.type.toLowerCase().indexOf('animationend') >= 0) {
                target = event.target || event.srcElement;
                return target.className = target.className.replace(this.config.animateClass, '').trim();
            }
        };

        WOW.prototype.customStyle = function (box, hidden, duration, delay, iteration) {
            if (hidden) {
                this.cacheAnimationName(box);
            }
            box.style.visibility = hidden ? 'hidden' : 'visible';
            if (duration) {
                this.vendorSet(box.style, {
                    animationDuration: duration
                });
            }
            if (delay) {
                this.vendorSet(box.style, {
                    animationDelay: delay
                });
            }
            if (iteration) {
                this.vendorSet(box.style, {
                    animationIterationCount: iteration
                });
            }
            this.vendorSet(box.style, {
                animationName: hidden ? 'none' : this.cachedAnimationName(box)
            });
            return box;
        };

        WOW.prototype.vendors = ["moz", "webkit"];

        WOW.prototype.vendorSet = function (elem, properties) {
            var name, results, value, vendor;
            results = [];
            for (name in properties) {
                value = properties[name];
                elem["" + name] = value;
                results.push(function () {
                    var j, len, ref, results1;
                    ref = this.vendors;
                    results1 = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                        vendor = ref[j];
                        results1.push(elem["" + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value);
                    }
                    return results1;
                }.call(this));
            }
            return results;
        };

        WOW.prototype.vendorCSS = function (elem, property) {
            var j, len, ref, result, style, vendor;
            style = getComputedStyle(elem);
            result = style.getPropertyCSSValue(property);
            ref = this.vendors;
            for (j = 0, len = ref.length; j < len; j++) {
                vendor = ref[j];
                result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
            }
            return result;
        };

        WOW.prototype.animationName = function (box) {
            var animationName;
            try {
                animationName = this.vendorCSS(box, 'animation-name').cssText;
            } catch (_error) {
                animationName = getComputedStyle(box).getPropertyValue('animation-name');
            }
            if (animationName === 'none') {
                return '';
            } else {
                return animationName;
            }
        };

        WOW.prototype.cacheAnimationName = function (box) {
            return this.animationNameCache.set(box, this.animationName(box));
        };

        WOW.prototype.cachedAnimationName = function (box) {
            return this.animationNameCache.get(box);
        };

        WOW.prototype.scrollHandler = function () {
            return this.scrolled = true;
        };

        WOW.prototype.scrollCallback = function () {
            var box;
            if (this.scrolled) {
                this.scrolled = false;
                this.boxes = function () {
                    var j, len, ref, results;
                    ref = this.boxes;
                    results = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                        box = ref[j];
                        if (!box) {
                            continue;
                        }
                        if (this.isVisible(box)) {
                            this.show(box);
                            continue;
                        }
                        results.push(box);
                    }
                    return results;
                }.call(this);
                if (!(this.boxes.length || this.config.live)) {
                    return this.stop();
                }
            }
        };

        WOW.prototype.offsetTop = function (element) {
            var top;
            while (element.offsetTop === void 0) {
                element = element.parentNode;
            }
            top = element.offsetTop;
            while (element = element.offsetParent) {
                top += element.offsetTop;
            }
            return top;
        };

        WOW.prototype.isVisible = function (box) {
            var bottom, offset, top, viewBottom, viewTop;
            offset = box.getAttribute('data-wow-offset') || this.config.offset;
            viewTop = window.pageYOffset;
            viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;
            top = this.offsetTop(box);
            bottom = top + box.clientHeight;
            return top <= viewBottom && bottom >= viewTop;
        };

        WOW.prototype.util = function () {
            return this._util != null ? this._util : this._util = new Util();
        };

        WOW.prototype.disabled = function () {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent);
        };

        return WOW;
    }();
}).call(window);
//# sourceMappingURL=main.js.map
