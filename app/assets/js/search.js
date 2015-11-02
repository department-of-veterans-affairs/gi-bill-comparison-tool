var searchFilters;
var refineParams = ['schools',
    'employers',
    'state',
    'country',
    'student_veteran_group',
    'yellow_ribbon_scholarship',
    'principles_of_excellence',
    'f8_keys_to_veteran_success',
    'types'];


function buildSearchUrl() {
    var baseUrl = window.location.origin + window.location.pathname;
    var queryParams = window.location.search.replace(/^\?/, '').split('&');

    var queryStr = "?";

    // Remove refinement parameters
    queryParams.forEach(function (query) {
        var splitQuery = query.split('=');
        var param = splitQuery[0];
        var value = splitQuery[1];

        if (refineParams.indexOf(param) == -1) {
            queryStr += '&' + query;
        }
    });

    // Add refinement parameters
    if (searchFilters.filter('#school:checked').val()) {
        queryStr += '&schools=true';
    } else if (searchFilters.filter('#employer:checked').val()) {
        queryStr += '&employers=true';
    }

    var stateVal = searchFilters.filter('#states').val();
    if (stateVal && stateVal !== 'all') {
        queryStr += '&state=' + searchFilters.filter('#states').val()
    }

    var countryVal = searchFilters.filter('#countries').val();
    if (countryVal && countryVal !== 'all') {
        queryStr += '&country=' + searchFilters.filter('#countries').val()
    }

    if (searchFilters.filter('#student-veteran:checked').val()) {
        queryStr += '&student_veteran_group=true'
    }

    if (searchFilters.filter('#yr:checked').val()) {
        queryStr += '&yellow_ribbon_scholarship=true'
    }

    if (searchFilters.filter('#poe:checked').val()) {
        queryStr += '&principles_of_excellence=true'
    }

    if (searchFilters.filter('#eight-keys:checked').val()) {
        queryStr += '&f8_keys_to_veteran_success=true'
    }

    var typesToFilter = [];
    searchFilters.filter('input[name="type"]:checked').each(function(index, typeInput) {
        typesToFilter.push(typeInput.value);
    });
    if(typesToFilter.length > 0) {
        queryStr += '&types=' + typesToFilter.join(',');
    }

    queryStr += '&page=1&num_results=10';

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
