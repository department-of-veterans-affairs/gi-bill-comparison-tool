///////////////////////////////////////////////////////////////////////////////
// showDependent
// Show/Hide dependent control based on whether the source's value matches
// the value argument.
///////////////////////////////////////////////////////////////////////////////
var showDependent = function(source, value, dependent, delay) {
	var opt = $(source).val();

	(opt == value) ? $(dependent).show(delay) : $(dependent).hide(delay);
};

///////////////////////////////////////////////////////////////////////////////
// refreshFilters
// Refreshes all filters provided in argument.
///////////////////////////////////////////////////////////////////////////////
var refreshFilters = function(summaries, filterClass) {
	$(filterClass).each(function() {
		if ($(this).prop("tagName").toLowerCase() === "select")
			refreshSelect("#" + $(this).attr("id"), summaries);
		else if ($(this).prop('type').toLowerCase() === "checkbox")
			refreshCheckbox("#" + $(this).attr("id"), summaries);
	});
};

///////////////////////////////////////////////////////////////////////////////
// refreshCheckbox
// refreshes the counts of a checkbox filter based on the values present in the 
// visible school summaries.
///////////////////////////////////////////////////////////////////////////////
var refreshCheckbox = function(checkbox, summaries) {
	var visible = $(summaries + ":visible");
	var all = $(summaries);

	// Holds the data key used to search the school summaries
	var key = $(checkbox).attr('name').replace('_', '-');

	// Holds the value that the school summaries should have to be counted
	var value = $(checkbox).val();
	if (value === "true" || value === "false")
		value = value === "true";
	
	var text = $(checkbox).data('text');

	var count = 0
	// Get the we're looking for this visible schools having the checkbox value
	// usually true or false.
	$(visible).each(function() {
		if ($(this).data(key) == value) 
			count++;
	});

	$(checkbox + "-label").text(text + " (" + count + ")");
}

///////////////////////////////////////////////////////////////////////////////
// refreshSelect
// refreshes the counts of a select filter based on the values present in the 
// visible school summaries.
///////////////////////////////////////////////////////////////////////////////
var refreshSelect = function(select, summaries) {
	var visible = $(summaries + ":visible");
	var all = $(summaries);

	// Holds the count for each option in the select
	var options = {};

	// Holds the data key used to search the school summaries
	var key = $(select).attr('name').replace('_', '-');

	// Get the options and counts using each visible school
	// for (var i = 0; i < visible.length; i++) {
	$(visible).each(function() {
		value = $(this).data(key);

		if (options.hasOwnProperty(value))
			options[value]++;
		else
			options[value] = 1;
	});

	// Set the count for all
	options['all'] = all.length;

	// Go through each option in the select and add a new count and label
	$(select + ' option').each(function() {
		var value = $(this).val(); 
		var text = $(this).data('text');

		// If the value has no count, there are no schools visible with that value
		if (!options.hasOwnProperty(value))
			options[value] = 0;

		$(this).text(text + ' (' + options[value] + ')');
		options[value] === 0 ? $(this).hide(0) : $(this).show(0);
	});
};

/////////////////////////////////////////////////////////////////////////////
// testSummaries
// Tests each visible school's data-key value against a value argument. Hides
// each school that does not match the value argument.
//
// NOTE: Assume the list of schools are visible schools only. This speeds up
// testing multiple filters since we can ignore schools that have already
// failed.
/////////////////////////////////////////////////////////////////////////////
var test = function(summaries, key, value) {
	if (value === 'all') return;

	$(summaries).each(function() {
		if ($(this).data(key) != value)
			$(this).hide();
	});
};

/////////////////////////////////////////////////////////////////////////////
// runFilter
// Builds a list of filters, and runs each filter against the controls hide
// or keep the control visible.
/////////////////////////////////////////////////////////////////////////////
var runFilter = function(summaries, filterClass) {
	// Make all schools visible and start filtering
	$(summaries).show();
	
	// Run for each filter, only checking schools that have passed
	$(filterClass).each(function() {
		var key = $(this).attr('name').replace('_', '-');

		// Run the test for selects and inputs that are not checkboxes. If the
		// input is a checkbox, run only if checked.
		var type = $(this).prop('type').toLowerCase();

		if ( type !== "checkbox" || this.checked) {
			var value = $(this).val();

			if (value === "true" || value === "false")
				value = value === "true";

			// Only test visible schools (i.e., the ones that have passed so far)
			test($(summaries + ":visible"), key, value);
		}
	});
};