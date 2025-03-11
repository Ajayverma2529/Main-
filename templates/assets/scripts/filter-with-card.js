(function ($) {
    $(document).ready(function () {
        var winWidth = $(window).width();
        var tableTitle =  $('.filter-with-card .filter-box .table-title');
        var secondFilter = $('.filter-with-card .filter-box .second-filter .table-title');
        var secondFilterCategory = $('.filter-with-card .filter-box .second-filter .filter-category');
        var filterCategory = $('.filter-with-card .filter-box .filter-category');
        var dateRangeWrap = $('.filter-with-card .filter-box .date-rang-picker');

        tableTitle.on('click', function (e) {
            e.stopPropagation();
            if ($(this).hasClass('date-rang-picker')) {

                if (!$(this).hasClass('rotate')) {

                    secondFilter.removeClass('rotate');
                    secondFilterCategory.removeClass('drp-down-active');
                    $(this).addClass('rotate');

                } else {

                    $(this).find('.table-title').addClass('rotate');
                    $(this).find('.filter-category').addClass('drp-down-active');

                }
            } else {

                if (!$(this).hasClass('rotate')) {

                    tableTitle.removeClass('rotate');
                    filterCategory.removeClass('drp-down-active');
                    var click = $(this);
                    $(this).addClass('rotate');
                    $(this).closest('.drp-flt').find('.filter-category').addClass('drp-down-active');

                } else {

                    $(this).removeClass('rotate');
                    $(this).closest('.drp-flt').find('.filter-category').removeClass('drp-down-active');

                }
            }
        });
        $(document).on('click', function (e) {

            var htmlTag = $(e.target.parentElement);
            $(this).closest('.drp-flt').find('.filter-category').removeClass('drp-down-active');

            if (htmlTag.is($('li'))) {
            } else {

                $(this).find('.table-title').removeClass('rotate');
                $(this).find('.filter-category').removeClass('drp-down-active');

            }
            if ($(this).find(tableTitle).hasClass('rotate')) {

                dateRangeWrap.removeClass('rotate');

            }
        });

        $('.filter-with-card .content-wrap .text-wrap h6').matchHeight();
    });

})(jQuery);

(function ($) {
    var formSubmitBtn = '.views-element-container .views-exposed-form input.js-form-submit';

    var resourceTypeSelect =
        '.views-element-container .views-exposed-form select[data-drupal-selector="edit-field-resource-type-target-id"]';

    if ($(resourceTypeSelect).length) {
        var resourceTypeMenu = '.filter-with-card .filter-box #resource-type';

        if ($(resourceTypeMenu).length) {
            var resourceTypeDropdown = $(resourceTypeMenu).find('.filter-category > ul');

            $(resourceTypeDropdown).empty();

            $(resourceTypeSelect)
                .find('option')
                .each(function () {
                    appendItemToDropdown(this, resourceTypeDropdown);
                });

            $(resourceTypeDropdown).on('click', 'li > input', function () {
                setSelectValue(this, resourceTypeSelect);
            });
        }
    }

    var solutionTypeSelect =
        '.views-element-container .views-exposed-form select[data-drupal-selector="edit-field-solution-type-target-id"]';

    if ($(solutionTypeSelect).length) {
        var solutionTypeMenu = '.filter-with-card .filter-box #solution-type';

        if ($(solutionTypeMenu).length) {
            var solutionTypeDropdown = $(solutionTypeMenu).find('.filter-category > ul');

            $(solutionTypeDropdown).empty();

            $(solutionTypeSelect)
                .find('option')
                .each(function () {
                    appendItemToDropdown(this, solutionTypeDropdown);
                });

            $(solutionTypeDropdown).on('click', 'li > input', function () {
                setSelectValue(this, solutionTypeSelect);
            });
        }
    }

    var applicationTypeSelect =
        '.views-element-container .views-exposed-form select[data-drupal-selector="edit-field-solution-type-target-id"]';

    if ($(applicationTypeSelect).length) {
        var applicationTypeMenu = '.filter-with-card .filter-box #application-type';

        if ($(applicationTypeMenu).length) {
            var applicationTypeDropdown = $(applicationTypeMenu).find('.filter-category > ul');

            $(applicationTypeDropdown).empty();

            $(applicationTypeSelect)
                .find('option')
                .each(function () {
                    appendItemToDropdown(this, applicationTypeDropdown);
                });

            $(applicationTypeDropdown).on('click', 'li > input', function () {
                setSelectValue(this, applicationTypeSelect);
            });
        }
    }

    var filtersContainer = '.filter-with-card .filter-element .filter-element-wrap';

    $(filtersContainer).empty();

    $(filtersContainer).on('click', '.filters > i', function () {
        $('.views-element-container .views-exposed-form select[multiple="multiple"]')
            .find('option[value="' + this.parentElement.dataset.value + '"]')
            .prop('selected', false);
        $('.filter-with-card')
            .find('input[value="' + this.parentElement.dataset.value + '"]')
            .prop('checked', false);

        $(this.parentElement).remove();
        $(formSubmitBtn).trigger('click');
    });

    function resetDates(el) {
        if ($('input[data-drupal-selector="edit-field-event-date-value"]').length) {
            $('input[data-drupal-selector="edit-field-event-date-value"]').val('0 days');
        }

        if ($('input[data-drupal-selector="edit-field-event-date-value-1"]').length) {
            $('input[data-drupal-selector="edit-field-event-date-value-1"]').val('');
        }

        if ($('.date-filter input').length) {
            $('.date-filter input').data('daterangepicker').setStartDate(new Date());
            $('.date-filter input').data('daterangepicker').setEndDate(new Date());
        }
    }

    $('input[name="daterange"]').on('apply.daterangepicker', function (ev, picker) {
        $('input[data-drupal-selector="edit-field-event-date-value"]').val(picker.startDate.format('YYYY-MM-DD'));
        $('input[data-drupal-selector="edit-field-event-date-value-1"]').val(picker.endDate.format('YYYY-MM-DD'));

        $(formSubmitBtn).trigger('click');
    });

    $('input[name="daterange"]').on('cancel.daterangepicker', function (ev, picker) {
        resetDates();
        $(formSubmitBtn).trigger('click');
    });

    var clearFiltersBtn = '.filter-with-card .filter-element .filter-clear-btn a';

    if ($(clearFiltersBtn).length) {
        $(clearFiltersBtn).on('click', function (e) {
            e.preventDefault();

            $('.filter-with-card input[type="checkbox"]').prop('checked', false);
            $('.views-element-container .views-exposed-form select[multiple="multiple"]').val([]);
            $(filtersContainer).empty();

            resetDates();
            $(formSubmitBtn).trigger('click');
        });
    }

    if ($('.filter-with-card .views-element-container').length) {
        $(document).ajaxStart(function () {
            $('.filter-with-card .filter-category').addClass('prevent-click');
        });

        $(document).ajaxStop(function () {
            $('.filter-with-card .filter-category').removeClass('prevent-click');
        });

        $(document).ajaxComplete(function () {
            AOS.refreshHard();
            $('.filter-with-card .content-wrap .text-wrap h6').matchHeight();
        });
    }

    $(window).on('load', function () {
        if (!!window.location.href.split('?')[1]) {
            var urlString = window.location.href;
            var paramString = urlString.split('?')[1];
            var arrParam = paramString.split('&');

            for(var i = 0; i < arrParam.length; i++) {
                var pair = arrParam[i].split('=');
                var key = pair[0];
                var value = pair[1];

                switch(key) {
                    case 'solution-type':
                        $('.filter-with-card .filter-box #solution-type .filter-category > ul li label').each(function () {
                            var labelText = this.textContent;
                            labelText = labelText.toLowerCase();
                            labelText = labelText.replaceAll('&', '');
                            labelText = labelText.replaceAll('/', '-');
                            labelText = labelText.replaceAll(/ *\([^)]*\) */g, "");
                            labelText = labelText.replaceAll(' ', '-');
                            labelText = labelText.replaceAll('--', '-');
                            labelText = labelText.trim();

                            if (labelText === value.toLowerCase()) {
                                $(this).siblings('input').trigger('click');
                            }
                        });
                        break;

                    default:
                        break;
                }
            }
        }
    });

    function appendItemToDropdown(option, dropdown) {
        var itemHtml =
            '<li>' +
            '<input type="checkbox" id="' +
            option.textContent +
            '" value="' +
            option.value +
            '" />' +
            '<span class="checkmark"></span>' +
            '<label for="' +
            option.textContent +
            '">' +
            option.textContent +
            '</label>' +
            '</li>';

        if ($(option).is(':selected')) {
            itemHtml =
                '<li>' +
                '<input type="checkbox" id="' +
                option.textContent +
                '" value="' +
                option.textContent +
                '" checked="true">' +
                '<span class="checkmark"></span>' +
                '<label for="' +
                option.textContent +
                '">' +
                option.textContent +
                '</label>' +
                '</li>';
        }

        $(dropdown).append(itemHtml);
    }

    function setSelectValue(item, select) {
        var prevSelectedValues = $(select).val();
        var newSelectedValues;
        var tagHTML =
            '<div class="filters" data-value="' +
            item.value +
            '">' +
            '<span>' +
            item.id +
            '</span>' +
            '<i class="close"></i>' +
            '</div>';

        if (item.checked) {
            newSelectedValues =
                prevSelectedValues.indexOf(item.value) === -1
                    ? prevSelectedValues.concat(item.value)
                    : prevSelectedValues;

            $(filtersContainer).append(tagHTML);
        } else {
            newSelectedValues = prevSelectedValues.filter((value) => {
                return value !== item.value;
            });

            $(filtersContainer)
                .contents()
                .filter(function () {
                    return this.outerHTML === tagHTML;
                })
                .remove();
        }

        $(select).val(newSelectedValues);
        $(formSubmitBtn).trigger('click');
    }
})(jQuery);
// const daterangepickerMin = require("../daterangepicker.min");

(function ($) {
    $(document).ready(function () {
        daterangeShow();
        daterangeScroll();
        function  daterangeShow() {

            $('.filter-box input[name="daterange"]').daterangepicker({
                eventName: 'mousehover',
                startDate: moment(),
                endDate: moment(),
                minDate: moment(),
                date: $('#inputDate').val(),
                current: $('#inputDate').val(),
                starts: 1,

                locale: {
                    format: 'MM/DD/YY'
                }
            }, function (start, end, label) {
                $('.filter-box .date-range-picker').addClass("hide-input-overlay");

            });
            $('.daterangepicker .drp-buttons').append("<p class='note'>Select a date range by clicking and dragging</p>");
        }
        if ($(".filter-box .first-filter .table-title").length > 0) {
            $(".filter-box .first-filter .table-title ").each(function () {
                if ($(this).find("input").length > 0) {
                    $(this).addClass("input-wrap");
                }
            });
        }

        if ($('.filter-box input[name="daterange"]').length) {
            $('.filter-box input[name="daterange"]').on('hide.daterangepicker', function () {
                $(this).parent().removeClass('rotate');
            });
        }
    });
    $(window).on("load", function () {
        $(".filter-block .filter-wrap ul li").on("click", function (e) {
            e.stopPropagation();
            const filterText = $(this).text();
            $(this).parents(".filter-wrap").find("span").text(filterText);
            $(this).parents(".filter-wrap").removeClass('active');
            $(this).parent().slideUp();
        });
    });

    function daterangeAlign() {

        var bladeCheck = $('.');
        if (bladeCheck.length) {
            $('body').addClass('daterange-align');
        }
    }

    function daterangeScroll () {
        var daterangeActive = $('. .filter-box .date-rang-picker');
        $(document).on("scroll", function() {
            var currentScrollPos = $(window).scrollTop();
            if ($('.daterangepicker').length) {
                var daterangePos = $('.daterangepicker').position().top;
            }
            if(currentScrollPos > 100) {
                if(daterangeActive.hasClass('rotate')) {
                    $('.daterangepicker').css({
                        "display" : "block"
                    });
                }

            }
        });

    }

})(jQuery);

