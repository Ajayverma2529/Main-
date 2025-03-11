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
                    responsive: [
                        {
                            breakpoint: 1199,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                dots: true,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
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

//logo-tab-grids

(function ($) {
    $(document).ready(function () {
        $('.logo-tab-grids .item-wrap .column-item').eq(0).addClass('active');
        $('.logo-tab-grids .item-wrap .list-wrap .list-item').eq(0).addClass('active');


        var tabChange = function () {
            var tabs = $('.logo-tab-grids .list-wrap .list-item');
            var active = tabs.filter('.active');
            var next = active.next('.list-item').length ? active.next('.list-item') : tabs.filter(':first-child');
            next.addClass('active');
            next.siblings().removeClass('active');
            var index = next.index();
            $('.logo-tab-grids .column-wrap .column-item').eq(index).addClass('active').siblings().removeClass('active');
        }
        // Tab Cycle function
        var tabCycle = setInterval(tabChange, 50000)
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
            adaptiveHeight: true,
            // autoplay: true,
            // autoplaySpeed: 4000
        });

        if ((itemLength == 1)) {
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
        var showChar = 241;  // How many characters are shown by default
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
            let jsonData = [];
            let selectedYears = new Set();
            let selectedTopics = new Set();
            let selectedIndustries = new Set();
            let selectedProducts = new Set();
            const maxItems = 9;
            let currentPage = 1;

            // Helper function to update the URL
            function updateURLParams() {
                const url = new URL(window.location);
                url.searchParams.delete("year");
                url.searchParams.delete("topic");
                url.searchParams.delete("industry");
                url.searchParams.delete("product");

                if (currentPage > 1) {
                    url.searchParams.set("page", currentPage);
                } else {
                    url.searchParams.delete("page");
                }

                selectedYears.forEach(year => url.searchParams.append("year", year));
                selectedTopics.forEach(topic => url.searchParams.append("topic", topic));
                selectedIndustries.forEach(industry => url.searchParams.append("industry", industry));
                selectedProducts.forEach(product => url.searchParams.append("product", product));

                window.history.replaceState({}, '', url);
            }


            // Read filters and page number from the URL
            function loadFiltersFromURL() {
                const urlParams = new URLSearchParams(window.location.search);
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
                displayItems();       // Then display items
                applyURLFilters();    // Finally, apply URL filters
            });

            // Function to display items based on filters and pagination
            // Function to display items
            function displayItems() {
                const parentDiv = $('.resource-filter-new .filter-content-wrap .inner-wrap');
                parentDiv.empty();

                jsonData.forEach(item => {
                    const itemWrap = $(`
                        <div class="item-wrap">
                            <div class="content-inner">
                                <div class="img-wrap">
                                    <img src="${item.imgSource}" alt="Manage banner">
                                </div>
                                <div class="body-content">
                                    <h6>${item.year} | ${item.topic} | ${item.industry} | ${item.product}</h6>
                                    <h4>${item.title}</h4>
                                    <p>${item.description}</p>
                                </div>
                            </div>
                        </div>
                    `);
                    parentDiv.append(itemWrap);
                });

                filterItems(""); // Apply filters and pagination
            }
            // Function to filter and paginate items
            function filterItems(searchText) {
                let itemsToShow = $(".item-wrap");

                // Filter by year
                if (selectedYears.size > 0) {
                    itemsToShow = itemsToShow.filter(function () {
                        const itemYear = $(this).find("h6").text().trim().split('|')[0].trim();
                        return selectedYears.has(itemYear);
                    });
                }

                // Filter by topic
                if (selectedTopics.size > 0) {
                    itemsToShow = itemsToShow.filter(function () {
                        const itemTopic = $(this).find("h6").text().trim().split('|')[1].trim();
                        return selectedTopics.has(itemTopic);
                    });
                }

                // Filter by industry
                if (selectedIndustries.size > 0) {
                    itemsToShow = itemsToShow.filter(function () {
                        const itemIndustry = $(this).find("h6").text().trim().split('|')[2].trim();
                        return selectedIndustries.has(itemIndustry);
                    });
                }

                // Filter by product
                if (selectedProducts.size > 0) {
                    itemsToShow = itemsToShow.filter(function () {
                        const itemProduct = $(this).find("h6").text().trim().split('|')[3].trim();
                        return selectedProducts.has(itemProduct);
                    });
                }

                // Filter by search text
                if (searchText) {
                    itemsToShow = itemsToShow.filter(function () {
                        const itemText = $(this).find(".body-content h4").text().toLowerCase();
                        return itemText.includes(searchText.toLowerCase());
                    });
                }

                // Hide all items first, then show only matching items
                $(".item-wrap").hide();
                const totalItems = itemsToShow.length;
                const totalPages = Math.ceil(totalItems / maxItems);

                // Ensure currentPage doesn't exceed totalPages
                if (currentPage > totalPages) currentPage = totalPages;

                const start = (currentPage - 1) * maxItems;
                const end = start + maxItems;

                // Show only items for the current page
                itemsToShow.hide().slice(start, end).show();

                // Update UI elements
                $(".pagination-button").toggle(totalItems > maxItems);
                $(".lenth-items .total-reslut").text(`${totalItems} Results`);
                $(".no-result").toggleClass("active", totalItems === 0);
                updatePaginationButtons(totalPages);
                $(".clear-btn").toggleClass("active", selectedYears.size > 0 || selectedTopics.size > 0 || selectedIndustries.size > 0 || selectedProducts.size > 0 || searchText !== "");
            }

            // Function to update pagination buttons
            function updatePaginationButtons(totalPages) {
                let paginationHTML = `<li class="prev ${currentPage === 1 ? 'disabled' : ''}"><svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.0332 11.4861L0.99991 6.24307L6.0332 1.00006" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.6318 6.24304L1 6.24304" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></li>`;
                for (let i = 1; i <= totalPages; i++) {
                    paginationHTML += `<li class="${i === currentPage ? 'active' : ''}">${i}</li>`;
                }
                paginationHTML += `<li class="next ${currentPage === totalPages ? 'disabled' : ''}"><svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.59827 11.8596L14.6316 6.61661L9.59827 1.37359" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 6.61658L14.6318 6.61658" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></li>`;
                $("#pagination-container").html(paginationHTML);
            }

            // Handle filter clicks
            function handleFilterClick(filterSet, filterClass, element) {
                const value = $(element).text().trim();
                const isAll = value === "All";

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
                    $(`${filterClass} .all`).removeClass("active");
                }

                updateURLParams();
                currentPage = 1;
                filterItems($(".input-wrapper .search").val().trim());
                updateBadges();
            }

            // Apply filters stored in the URL
            function applyURLFilters() {
                selectedYears.forEach(year => $(`#year li:contains(${year})`).addClass("active"));
                selectedTopics.forEach(topic => $(`#glossary_block li:contains(${topic})`).addClass("active"));
                selectedIndustries.forEach(industry => $(`#industry li:contains(${industry})`).addClass("active"));
                selectedProducts.forEach(product => $(`#product li:contains(${product})`).addClass("active"));
                filterItems(""); // Apply filters to show filtered items
                updateBadges();  // Update badges based on selected filters
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
                const fieldWrap = $(".field-wrap");
                fieldWrap.empty();
                selectedYears.forEach(year => fieldWrap.append(`<span class="filter-badge year">${year}</span>`));
                selectedTopics.forEach(topic => fieldWrap.append(`<span class="filter-badge topic">${topic}</span>`));
                selectedIndustries.forEach(industry => fieldWrap.append(`<span class="filter-badge industry">${industry}</span>`));
                selectedProducts.forEach(product => fieldWrap.append(`<span class="filter-badge product">${product}</span>`));
                fieldWrap.toggleClass("active", selectedYears.size > 0 || selectedTopics.size > 0 || selectedIndustries.size > 0 || selectedProducts.size > 0);
            }

            $(".field-wrap").on("click", ".filter-badge", function () {
                const value = $(this).text().trim();
                if ($(this).hasClass("year")) {
                    selectedYears.delete(value);
                    $(`#year li:contains(${value})`).removeClass("active");
                } else if ($(this).hasClass("topic")) {
                    selectedTopics.delete(value);
                    $(`#glossary_block li:contains(${value})`).removeClass("active");
                } else if ($(this).hasClass("industry")) {
                    selectedIndustries.delete(value);
                    $(`#industry li:contains(${value})`).removeClass("active");
                }
                else if ($(this).hasClass("product")) {
                    selectedProducts.delete(value);
                    $(`#product li:contains(${value})`).removeClass("active");
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
                    $(this).parent().find(".list").slideUp();  // Close the list
                } else {
                    $(".nav-wrapper").removeClass("active");
                    $(".nav-wrapper").find(".list").slideUp();  // Close other lists
                    $(this).parent().addClass("active");
                    $(this).parent().find(".list").slideDown();  // Open the clicked list
                }
            });

            // Close filter lists if clicked outside
            $(document).on("click", function (e) {
                var container = $(".resource-filter-new .outer-wrap .nav-wrapper");
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    $(".resource-filter-new .outer-wrap .nav-wrapper").removeClass("active");
                    $('.resource-filter-new .outer-wrap .nav-wrapper .list').slideUp();  // Close all lists
                }
            });
        });
    }


})(jQuery);



