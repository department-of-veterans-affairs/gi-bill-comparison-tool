///////////////////////////////////////////////////////////////////////////////
// Estimator
///////////////////////////////////////////////////////////////////////////////
function Estimator() {
	// Values from forms
	this.military_status = null;
	this.spouse_active_duty = null;
	this.gi_bill_chap = null;
	this.old_gi_bill = null;
	this.number_of_depend = null;
	this.post_911_elig = null;
  this.cumulative_service = null;
  this.enlistment_service = null;
  this.consecutive_service = null;
  this.institution_type = null;
  this.country = null;

  // Dependent Values
  this.service_discharge = null;
  this.tier = null;
}

///////////////////////////////////////////////////////////////////////////////
// Constants
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.FLTTFCAP = 12048.50;
Estimator.prototype.CORRESPONDTFCAP = 10241.22;
Estimator.prototype.TFCAP = 21084.89;

///////////////////////////////////////////////////////////////////////////////
// Formats currency in USD
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.formatCurrency = function (num) {
	var str = Math.round(Number(num)).toString();
    
  // match a digit if it's followed by 3 other digits, appending a comma to each match
  return '$' + str.replace(/\d(?=(\d{3})+$)/g, '$&,');
};

///////////////////////////////////////////////////////////////////////////////
// setMilitaryStatus
// Sets military status value from the element with the id argument.
//
// Saves as string.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setMilitaryStatus = function(id) {
	this.military_status = $(id).val();
	return this;
};

///////////////////////////////////////////////////////////////////////////////
// setSpouseActiveDuty
// Sets the spouse active duty from the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setSpouseActiveDuty = function(id) {
	this.spouse_active_duty = $(id).prop('checked');
	return this;
};

///////////////////////////////////////////////////////////////////////////////
// setGiBillChap
// Sets gi bill chapter value from the element with the id argument. Also sets
// the old_gi_bill boolean based on the value of the gi_bill_chap.
//
// Saves as number.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setGiBillChap = function(id) {
	this.gi_bill_chap = Number($(id).val());

	this.old_gi_bill = (this.gi_bill_chap == 30 || this.gi_bill_chap == 1607 
		|| this.gi_bill_chap == 1606 || this.gi_bill_chap == 35)

	return this;
};

///////////////////////////////////////////////////////////////////////////////
// setNumberOfDepend
// Sets number of dependents value from the element with the id argument.
//
// Saves as number.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setNumberOfDepend = function(id) {
	this.number_of_depend = Number($(id).val());
	return this;
};

///////////////////////////////////////////////////////////////////////////////
// setPost911Elig
// Sets gi bill chapter value from the element with the id argument.
//
// Saves as bool.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setPost911Elig = function(id) {
	this.post_911_elig = $(id).prop('checked');
	return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCumulativeService
// Sets the cumulative service value from the element with the id argument.
//
// Saves as float.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setCumulativeService = function(id) {
	var val = $(id).val();

	this.service_discharge = val === "service discharge";
	this.cumulative_service = this.service_discharge ? 1.0 : parseFloat(val);

	return this;
};

///////////////////////////////////////////////////////////////////////////////
// setEnlistmentService
// Sets enlistment service value from the element with the id argument.
//
// Saves as number.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setEnlistmentService = function(id) {
	this.enlistment_service = Number($(id).val());
	return this;
};

///////////////////////////////////////////////////////////////////////////////
// setConsecutiveService
// Sets consecutive service value from the element with the id argument.
//
// Saves as number.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setConsecutiveService = function(id) {
	this.consecutive_service = Number($(id).val());
	return this;
};

///////////////////////////////////////////////////////////////////////////////
// setInstitutionType
// Sets Institution Type from the element with the id argument. It expects the
// value in that element's data-type.
//
// Saves as string.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setInstitutionType = function(id) {
	this.institution_type = $(id).data('type').toLowerCase();

	return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCountry
// Sets country from the element with the id argument. It expects the
// value in that element's data-country.
//
// Saves as string.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setCountry = function(id) {
	this.country = $(id).data('country').toLowerCase();

	return this;	
};

///////////////////////////////////////////////////////////////////////////////
// setTier
// Sets the tier for the benefits estimator. 
//
// Saves as a float [0, 1]
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setTier = function() {
	if (this.gi_bill_chap == 31 && this.post_911_elig == true)
    this.tier = 1;
  else if (this.service_discharge) 
    this.tier = 1;
  else
		this.tier = this.cumulative_service;

	return this;
};

///////////////////////////////////////////////////////////////////////////////
// isPublic
// Predicate returning true when school is public.
//
// Returns a boolean
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.isPublic = function() {
	return this.institution_type.toLowerCase() == 'public';
};

///////////////////////////////////////////////////////////////////////////////
// isInstate
// Predicate returning true when school is public and in the USA.
//
// Returns a boolean
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.isInstate = function() {
	return this.isPublic() && this.country.toLowerCase() == 'usa';
};

///////////////////////////////////////////////////////////////////////////////
// isOjt
// Predicate returning true when school is an Ojt school.
//
// Returns a boolean
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.isOjt = function() {
	return this.institution_type.toLowerCase() == 'ojt';
};

///////////////////////////////////////////////////////////////////////////////
// isFlight
// Predicate returning true when school is a flight school.
//
// Returns a boolean
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.isFlight = function() {
	return this.institution_type.toLowerCase() == 'flight';
};

///////////////////////////////////////////////////////////////////////////////
// isCorrespondence
// Predicate returning true when school is a correspondence school.
//
// Returns a boolean
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.isCorrespondence = function() {
	return this.institution_type.toLowerCase() == 'correspondence';
};

///////////////////////////////////////////////////////////////////////////////
// isFlightOrCorrespondence
// Predicate returning true when school is a flight or correspondence school.
//
// Returns a boolean
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.isFlightOrCorrespondence = function() {
	return this.isFlight() || this.isCorrespondence();
};

///////////////////////////////////////////////////////////////////////////////
// getTuitionFees
// Computes and returns the estimator's tuition fees. 
//
// Returns a float.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.getTuitionFees = function () {
	var est_tuition_fees = null;

  if (this.old_gi_bill == true)
    est_tuition_fees = '$0 / year ';
  else if (this.institution_type == 'ojt') 
  	est_tuition_fees = '';
	else if (this.gi_bill_chap == 31)
		est_tuition_fees = this.isFlightOrCorrespondence() ? '$0 year' : 'Full Cost of Attendance';
  else if (this.isFlight())
    est_tuition_fees = this.formatCurrency(this.FLTTFCAP * this.tier) + ' / year (up to)';
  else if (this.isCorrespondence())
  	est_tuition_fees = this.formatCurrency(this.CORRESPONDTFCAP * this.tier) + ' / year (up to)';
  else if (this.isPublic()) 
  	est_tuition_fees = Math.round(this.tier * 100) + '% of instate tuition';
  else
  	est_tuition_fees = this.formatCurrency(this.TFCAP * this.tier) + ' / year (up to)';

  return est_tuition_fees;
};