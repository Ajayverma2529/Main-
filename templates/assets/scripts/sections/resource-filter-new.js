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