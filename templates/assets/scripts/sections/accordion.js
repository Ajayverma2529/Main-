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
  const $cardItems = $(".nile-col-three-grid .card-wrap .card-item");
  const numItems = $cardItems.length;
  let itemWidth;

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
      let jsonData = []; // To store JSON data
      let selectedYears = new Set(); // Set to hold selected years
      let selectedTopics = new Set(); // Set to hold selected topics
      const maxItems = 9; // Max number of items per page
      let currentPage = 1; // Current page number for pagination

      // Helper function to update URL parameters based on selected filters and page number
      function updateURLParams() {
        const url = new URL(window.location); // Get the current URL
        url.searchParams.delete("year"); // Remove the "year" parameter from the URL
        url.searchParams.delete("topic"); // Remove the "topic" parameter from the URL

        // If the current page is greater than 1, add it to the URL
        if (currentPage > 1) {
          url.searchParams.set("page", currentPage);
        } else {
          url.searchParams.delete("page"); // Remove the "page" parameter if it's page 1
        }

        // Append the selected years and topics to the URL
        selectedYears.forEach((year) => url.searchParams.append("year", year));
        selectedTopics.forEach((topic) =>
          url.searchParams.append("topic", topic)
        );

        // Update the browser's address bar without reloading the page
        window.history.replaceState({}, "", url);
      }

      // Helper function to read filters and page number from the URL on page load
      function loadFiltersFromURL() {
        const urlParams = new URLSearchParams(window.location.search); // Get URL parameters
        selectedYears = new Set(urlParams.getAll("year")); // Get all "year" values from URL
        selectedTopics = new Set(urlParams.getAll("topic")); // Get all "topic" values from URL
        currentPage = parseInt(urlParams.get("page")) || 1; // Get page number, default to 1 if not found
      }

      $(".no-result").removeClass("active"); // Hide no result message initially

      //<span>${item?.industry}</span>
      // Fetch JSON data and display it in the container
      $.getJSON("/ajayverma/json/resource-filter.json", function (data) {
        jsonData = data; // Store the fetched data
        const parentDiv = $(
          ".resource-filter .filter-content-wrap .inner-wrap"
        );
        parentDiv.empty(); // Empty the container before appending new items
        data.forEach((item) => {
          const itemWrap = $(`
                        <div class="item-wrap">
                            <div class="content-inner">
                                <div class="img-wrap">
                                    <img src="${item.imgSource}" alt="Manage banner">
                                </div>
                                <div class="body-content">
                                    <h6>${item.year} | ${item.topic}</h6>
                                    <h4>${item.title}</h4>
                                    <p>${item.description}</p>
                                </div>
                            </div>
                        </div>
                    `);
          parentDiv.append(itemWrap);
        });

        loadFiltersFromURL();
        applyURLFilters();
        filterItems("");
      });

      // Function to filter items based on selected filters and search text
      function filterItems(searchText) {
        let itemsToShow = $(".item-wrap"); // Initially show all items

        // Filter by selected years
        if (selectedYears.size > 0) {
          itemsToShow = itemsToShow.filter(function () {
            const itemYear = $(this).find("h6").text().trim().split(" ")[0];
            return selectedYears.has(itemYear); // Check if the year is selected
          });
        }

        // Filter by selected topics
        if (selectedTopics.size > 0) {
          itemsToShow = itemsToShow.filter(function () {
            const itemTopic = $(this)
              .find("h6")
              .text()
              .trim()
              .split("|")[1]
              .trim();
            return selectedTopics.has(itemTopic); // Check if the topic is selected
          });
        }

        // Filter by search text (if provided)
        if (searchText) {
          itemsToShow = itemsToShow.filter(function () {
            const itemText = $(this)
              .find(".body-content h4")
              .text()
              .toLowerCase();
            return itemText.includes(searchText.toLowerCase()); // Case-insensitive search
          });
        }

        // Hide all items initially
        $(".item-wrap").hide();
        const totalItems = itemsToShow.length; // Get the total number of filtered items
        const totalPages = Math.ceil(totalItems / maxItems); // Calculate the total number of pages
        const start = (currentPage - 1) * maxItems; // Calculate the starting index for current page
        const end = start + maxItems; // Calculate the ending index for current page

        // Show only the items for the current page
        itemsToShow.slice(start, end).show();
        $(".pagination-button").toggle(totalItems > maxItems); // Show pagination button if needed

        // Update result count
        $(".lenth-items .total-reslut").text(`${totalItems} Results`);

        // Show or hide "no result" message
        $(".no-result").toggleClass("active", totalItems === 0);
        updatePaginationButtons(totalPages); // Update pagination buttons
        $(".clear-btn").toggleClass(
          "active",
          selectedYears.size > 0 || selectedTopics.size > 0 || searchText !== ""
        ); // Show clear button if any filters are applied
      }

      // Function to update pagination buttons
      function updatePaginationButtons(totalPages) {
        let paginationHTML = `<li class="prev ${
          currentPage === 1 ? "disabled" : ""
        }"><svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.0332 11.4861L0.99991 6.24307L6.0332 1.00006" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.6318 6.24304L1 6.24304" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></li>`;
        for (let i = 1; i <= totalPages; i++) {
          paginationHTML += `<li class="${
            i === currentPage ? "active" : ""
          }">${i}</li>`; // Add page number buttons
        }
        paginationHTML += `<li class="next ${
          currentPage === totalPages ? "disabled" : ""
        }"><svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.59827 11.8596L14.6316 6.61661L9.59827 1.37359" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 6.61658L14.6318 6.61658" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></li>`;
        $("#pagination-container").html(paginationHTML); // Insert the pagination buttons into the container
      }

      // Handle pagination button clicks
      $("#pagination-container").on("click", "li", function () {
        if ($(this).hasClass("disabled") || $(this).hasClass("active")) return; // Prevent clicking on disabled or active buttons
        if ($(this).hasClass("prev")) currentPage--; // Go to the previous page
        else if ($(this).hasClass("next")) currentPage++; // Go to the next page
        else currentPage = parseInt($(this).text()); // Go to the page number clicked

        updateURLParams(); // Update the URL with the new page number

        const searchText = $(".input-wrapper .search").val().trim(); // Get search text
        filterItems(searchText); // Apply the filters based on the search text and selected filters
        $("html, body").animate(
          { scrollTop: $(".resource-filter").offset().top },
          500
        ); // Scroll to the top of the filter section
      });

      // Function to apply the filters stored in the URL
      function applyURLFilters() {
        selectedYears.forEach((year) =>
          $(`#year li:contains(${year})`).addClass("active")
        );
        selectedTopics.forEach((topic) =>
          $(`#glossary_block li:contains(${topic})`).addClass("active")
        );
        filterItems(""); // Apply the filters and show the filtered items
        updateBadges(); // Update the badges based on selected filters
      }

      // Handle year filter clicks
      $("#year li").click(function () {
        const year = $(this).text().trim(); // Get the selected year
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
        const topic = $(this).text().trim(); // Get the selected topic
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
        const fieldWrap = $(".field-wrap");
        fieldWrap.empty(); // Clear the existing badges
        selectedYears.forEach((year) =>
          fieldWrap.append(`<span class="filter-badge year">${year}</span>`)
        ); // Append year badges
        selectedTopics.forEach((topic) =>
          fieldWrap.append(`<span class="filter-badge topic">${topic}</span>`)
        ); // Append topic badges
        fieldWrap.toggleClass(
          "active",
          selectedYears.size > 0 || selectedTopics.size > 0
        ); // Show or hide the badges wrapper
      }

      // Remove badge when clicked
      $(".field-wrap").on("click", ".filter-badge", function () {
        const value = $(this).text().trim(); // Get the value of the clicked badge
        if ($(this).hasClass("year")) {
          selectedYears.delete(value); // Remove the year from the selected years
          $(`#year li:contains(${value})`).removeClass("active"); // Remove active class from the year filter
        } else if ($(this).hasClass("topic")) {
          selectedTopics.delete(value); // Remove the topic from the selected topics
          $(`#glossary_block li:contains(${value})`).removeClass("active"); // Remove active class from the topic filter
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
        const searchText = $(this).val().trim(); // Get search text
        filterItems(searchText); // Filter the items based on search
      });

      // Toggle navigation menu
      $(".resource-filter .outer-wrap .nav-wrapper .table-title").click(
        function () {
          if ($(this).parent().hasClass("active")) {
            $(this).parent().removeClass("active");
            $(this).parent().find(".list").slideUp(); // Close the list
          } else {
            $(".nav-wrapper").removeClass("active");
            $(".nav-wrapper").find(".list").slideUp(); // Close other lists
            $(this).parent().addClass("active");
            $(this).parent().find(".list").slideDown(); // Open the clicked list
          }
        }
      );

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
