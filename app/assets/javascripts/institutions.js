///////////////////////////////////////////////////////////////////////////////
// showDependent
// Show/Hide dependent control based on whether the source's value matches
// the value argument.
//////////////////////////////////////////////////////////////////////////////
var showDependent = function(source, value, dependent, delay) {
	var opt = $(source).val();

	(opt == value) ? $(dependent).show(delay) : $(dependent).hide(delay);
}
