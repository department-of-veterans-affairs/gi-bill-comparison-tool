var searchFilters;
var refineParams = ['type_name',
    'state',
    'country',
    'student_veteran_group',
    'yellow_ribbon_scholarship',
    'principles_of_excellence',
    'f8_keys_to_veteran_success',
    'types'];


function buildSearchUrl() {
    var baseUrl = window.location.href.split("?")[0];
    var queryParams = window.location.search.replace(/^\?/, '').split('&');

    var queryStr = "?";

    // Remove refinement parameters
    queryParams.forEach(function (query) {
        var splitQuery = query.split('=');
        var param = splitQuery[0];
        var value = splitQuery[1];

        if (refineParams.indexOf(param) == -1) {
          // Have to override source to prevent search from jumping to profile page when
          // one result after applying filter.
          if (param === "source") {
            queryStr += '&' + 'source=search';
          }
          else {
            queryStr += '&' + query;
          }
        }
    });

    // Add refinement parameters
    if (searchFilters.filter('#school:checked').val()) {
        queryStr += '&type_name=school';
    } else if (searchFilters.filter('#employer:checked').val()) {
        queryStr += '&type_name=employer';
    }

    var stateVal = searchFilters.filter('#states').val();
    if (stateVal && stateVal !== 'all') {
        queryStr += '&state=' + stateVal;
    }

    var countryVal = searchFilters.filter('#countries').val();
    if (countryVal && countryVal !== 'all') {
        queryStr += '&country=' + countryVal;
    }

    if (searchFilters.filter('#student-veteran:checked').val()) {
        queryStr += '&student_veteran_group=true';
    }

    if (searchFilters.filter('#yr:checked').val()) {
        queryStr += '&yellow_ribbon_scholarship=true';
    }

    if (searchFilters.filter('#poe:checked').val()) {
        queryStr += '&principles_of_excellence=true';
    }

    if (searchFilters.filter('#eight-keys:checked').val()) {
        queryStr += '&f8_keys_to_veteran_success=true';
    }

    var typeVal = searchFilters.filter('#types').val();
    if (typeVal && typeVal !== 'all') {
        queryStr += '&types=' + typeVal;
    }

    // queryStr += '&page=1&num_results=9';

    return baseUrl + queryStr.replace(/^\?&/, '?');
}


// LOAD ON DOCUMENT READY
$(document).ready(function () {
    searchFilters = $('#search-filters .filter');

    // --- Search page ---
    searchFilters.change(function () {
        window.location.href = buildSearchUrl();
    });
})
