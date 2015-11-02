///////////////////////////////////////////////////////////////////////////////
// showDependent
// Show/Hide dependent control based on whether the source's value matches
// the value argument.
///////////////////////////////////////////////////////////////////////////////
var showDependent = function(source, value, dependent, delay) {
	var opt = $(source).val();

	(opt == value) ? $(dependent).show(delay) : $(dependent).hide(delay);
};

/////////////////////////////////////////////////////////////////////////////
// formProfileUrl
/////////////////////////////////////////////////////////////////////////////
var formProfileUrl = function(id) {
	url = "<%= profile_path %>?id=" + id;
	url += "&military_status=" + $("military-status").val();
}

/////////////////////////////////////////////////////////////////////////////
// runEstimator
/////////////////////////////////////////////////////////////////////////////
var runEstimator = function() {
	var estimator = new Estimator();

	// Get current values of the about yourself header
	estimator.setMilitaryStatus("#military-status");
	estimator.setSpouseActiveDuty("#spouse-active-duty");
	estimator.setGiBillChap("#gi-bill-chapter");
	estimator.setNumberOfDepend("#number-of-dependents");
	estimator.setPost911Elig("#elig-for-post-gi-bill");
	estimator.setCumulativeService("#cumulative-service");
	estimator.setEnlistmentService("#enlistment-service");
	estimator.setConsecutiveService("#consecutive-service");
	estimator.setOnline("#online-classes");

	// Set school summaries, if any
	$(".school_summary").each(function() {
		var facility_code = $(this).attr('id');
		var id = "#" + facility_code

		estimator.setInstitutionType(id);
		estimator.setCountry(id);
		estimator.setBah(id);

		$(id + "-est-tuition-fees").html(estimator.getTuitionFees());
		$(id + "-est-housing-allowance").html(estimator.getHousingAllowance());
		$(id + "-est-book-stipend").html(estimator.getBookStipend());
	});

	// Set the profile page if present
	$(".profile_overview").each(function() {
		var facility_code = $(this).attr('id');
		var id = "#" + facility_code

		estimator.setInstitutionType(id);
		estimator.setCountry(id);
		estimator.setBah(id);

		$("#est-tuition-fees").html(estimator.getTuitionFees());
		$("#est-housing-allowance").html(estimator.getHousingAllowance());
		$("#est-book-stipend").html(estimator.getBookStipend());
	});
};

