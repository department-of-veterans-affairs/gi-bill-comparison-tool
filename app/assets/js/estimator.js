///////////////////////////////////////////////////////////////////////////////
// Estimator
///////////////////////////////////////////////////////////////////////////////
function Estimator() {
	// Values from forms
	this.military_status = null;
	this.spouse_active_duty = null;
	this.gi_bill_chap = null;
	this.number_of_depend = null;
	this.post_911_elig = null;
  this.cumulative_service = null;
  this.enlistment_service = null;
  this.consecutive_service = null;
  this.institution_type = null;
  this.country = null;
  this.online = null;
  this.bah = null;

  // Dependent Values
  this.old_gi_bill = null;
  this.service_discharge = null;
  this.tier = null;
  this.vre_only = null;
  this.monthly_rate = null;
  this.only_tuition_fees = null;
}

///////////////////////////////////////////////////////////////////////////////
// Constants
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.TFCAP = 21970.46;
Estimator.prototype.AVGBAH = 1611;
Estimator.prototype.BSCAP  = 1000,
Estimator.prototype.FLTTFCAP = 12554.54;
Estimator.prototype.CORRESPONDTFCAP = 10671.35;

Estimator.prototype.MGIB3YRRATE = 1857;
Estimator.prototype.MGIB2YRRATE = 1509;
Estimator.prototype.SRRATE = 369;

Estimator.prototype.DEARATE = 1024;
Estimator.prototype.DEARATEOJT = 747;

Estimator.prototype.VRE0DEPRATE = 605.44;
Estimator.prototype.VRE1DEPRATE = 751.00;
Estimator.prototype.VRE2DEPRATE = 885.00;
Estimator.prototype.VREINCRATE = 64.50;
Estimator.prototype.VRE0DEPRATEOJT = 529.36;
Estimator.prototype.VRE1DEPRATEOJT = 640.15;
Estimator.prototype.VRE2DEPRATEOJT = 737.77;
Estimator.prototype.VREINCRATEOJT = 47.99;

///////////////////////////////////////////////////////////////////////////////
// formatCurrency
// Formats currency in USD
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.formatCurrency = function (num) {
	var str = Math.round(Number(num)).toString();
    
  // match a digit if it's followed by 3 other digits, appending a comma to each match
  return '<span class="estimator-dollar-sign">$</span>' + str.replace(/\d(?=(\d{3})+$)/g, '$&,');
};

///////////////////////////////////////////////////////////////////////////////
// setDependents
// Sets dependent values in order.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setDependents = function() {
  this.setTier();
  this.setVreOnly();
  this.setOnlyTuitionFees();
  this.setMonthlyRate();
}

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
	this.spouse_active_duty = $(id).val().toLowerCase() === "yes";
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
	this.post_911_elig = $(id).val() == 'yes';
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
// setOnline
// Sets online value from the element with the id argument.
//
// Saves as boolean.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setOnline = function(id) {
	this.online = $(id).val() === 'yes';
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

  // Hacky fix
  if (this.institution_type == "for profit")
    this.institution_type = "private";

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
// setBah
// Sets BAH from the element with the id argument. It expects the
// value in that element's data-bah.
//
// Saves as float.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setBah = function(id) {
	this.bah = parseFloat($(id).data('bah'));

	return this;	
};

///////////////////////////////////////////////////////////////////////////////
// setTier
// Gets the tier for the benefits estimator. 
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
// setVREOnly
// Calculate if eligible for VR&E and Post-9/11 Benefits.
//
// Saves as boolean.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setVreOnly = function () {
 	this.vre_only = (this.gi_bill_chap == 31 && !this.post_911_elig);
};

///////////////////////////////////////////////////////////////////////////////
// 
// Calculate if monthly benefit can only be spent on tuition/fees
//
// Saves as boolean.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setOnlyTuitionFees = function () {
  if (this.military_status == 'active duty' && (this.gi_bill_chap == 30 || this.gi_bill_chap == 1607))
    this.only_tuition_fees = true;
  else if ((this.isCorrespondence() || this.isFlight()) && this.old_gi_bill == true)
    this.only_tuition_fees = true;    
  else
    this.only_tuition_fees = false;
  };

///////////////////////////////////////////////////////////////////////////////
// setMonthlyRate
// Calculate the monthly benefit rate for non-chapter 33 benefits.
//
// Saves as float.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.setMonthlyRate = function () {      
  if (this.gi_bill_chap == 30 && this.enlistment_service == 3 && this.institution_type == 'ojt')
    this.monthly_rate = this.MGIB3YRRATE * 0.75;	
  else if (this.gi_bill_chap == 30 && this.enlistment_service == 3) 
    this.monthly_rate = this.MGIB3YRRATE;
  else if (this.gi_bill_chap == 30 && this.enlistment_service == 2 && this.institution_type == 'ojt')
    this.monthly_rate = this.MGIB2YRRATE * 0.75;
  else if (this.gi_bill_chap == 30 && this.enlistment_service == 2)
    this.monthly_rate = this.MGIB2YRRATE;
  else if (this.gi_bill_chap == 1607 && this.institution_type == 'ojt')
    this.monthly_rate = this.MGIB3YRRATE * this.consecutive_service * 0.75;
  else if (this.gi_bill_chap == 1607)
    this.monthly_rate = this.MGIB3YRRATE * this.consecutive_service;
  else if (this.gi_bill_chap == 1606 && this.institution_type == 'ojt') 
    this.monthly_rate = this.SRRATE * 0.75;
  else if (this.gi_bill_chap == 1606)
  	this.monthly_rate = this.SRRATE;
  else if (this.gi_bill_chap == 35 && this.institution_type == 'ojt')
    this.monthly_rate = this.DEARATEOJT;
  else if (this.gi_bill_chap == 35 && this.institution_type == 'flight') 
  	this.monthly_rate = 0;
  else if (this.gi_bill_chap == 35)
    this.monthly_rate = this.DEARATE;
  else if (this.gi_bill_chap == 31 && this.number_of_depend == 0 && this.institution_type == 'ojt') 
  	this.monthly_rate = this.VRE0DEPRATEOJT;
  else if (this.gi_bill_chap == 31 && this.number_of_depend == 0) 
    this.monthly_rate = this.VRE0DEPRATE;
  else if (this.gi_bill_chap == 31 && this.number_of_depend == 1 && this.institution_type == 'ojt')
    this.monthly_rate = this.VRE1DEPRATEOJT;
  else if (this.gi_bill_chap == 31 && this.number_of_depend == 1)
  	this.monthly_rate = this.VRE1DEPRATE;
  else if (this.gi_bill_chap == 31 && this.number_of_depend == 2 && this.institution_type == 'ojt')
		this.monthly_rate = this.VRE2DEPRATEOJT;
  else if (this.gi_bill_chap == 31 && this.number_of_depend == 2)
  	this.monthly_rate = this.VRE2DEPRATE;
  else if (this.gi_bill_chap == 31 && this.number_of_depend > 2 && this.institution_type == 'ojt')
    this.monthly_rate = this.VRE2DEPRATEOJT + ((this.number_of_depend - 2) * this.VREINCRATEOJT);
  else if (this.gi_bill_chap == 31 && this.number_of_depend > 2)
  	this.monthly_rate = this.VRE2DEPRATE + ((this.number_of_depend-2) * this.VREINCRATE) ;
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
	var estimated = null;

  this.setDependents();

  if (this.old_gi_bill == true)
    estimated = '<span class="estimator-dollar-sign">$</span><span class="value-in-js">0</span></br><span class="estimate-qualifier">per year</span>';
  else if (this.institution_type == 'ojt') 
  	estimated = 'N/A';
	else if (this.gi_bill_chap == 31)
		estimated = this.isFlightOrCorrespondence() ? '<span class="estimator-dollar-sign">$</span><span class="value-in-js">0</span></br><span class="estimate-qualifier">per year</span>' : '<span class="search-text-values">Full Cost of Attendance</span';
  else if (this.isFlight())
    estimated = this.formatCurrency(this.FLTTFCAP * this.tier) + '</br><span class="estimate-qualifier">per year</span>';
  else if (this.isCorrespondence())
  	estimated = this.formatCurrency(this.CORRESPONDTFCAP * this.tier) + '</br><span class="estimate-qualifier">per year</span>';
  else if (this.isPublic()) 
  	estimated = Math.round(this.tier * 100) + '<span class="estimator-dollar-sign">%</span></br><span class="estimate-qualifier">of instate tuition</span>';
  else
  	estimated = this.formatCurrency(this.TFCAP * this.tier) + '</br><span class="estimate-qualifier">per year</span>';

  return estimated;
};

///////////////////////////////////////////////////////////////////////////////
// getHousingAllowance
// Computes and returns the estimator's Housing Allowance. 
//
// Returns a float.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.getHousingAllowance = function () {
	var estimated = null;

  this.setDependents();

	if (this.gi_bill_chap == 31  && this.isFlightOrCorrespondence()) 
    estimated = '<span class="estimator-dollar-sign">$</span><span class="value-in-js">0</span></br><span class="estimate-qualifier">per month</span>';
  else if (this.old_gi_bill && this.only_tuition_fees)
    estimated = this.formatCurrency(this.monthly_rate) + '</br><span class="estimate-qualifier">per month</span>';
 	else if (this.old_gi_bill || this.vre_only) 
    estimated = this.formatCurrency(this.monthly_rate) + '</br><span class="estimate-qualifier">per month</span>';
  else if (this.military_status == 'active duty')
    estimated = '<span class="estimator-dollar-sign">$</span><span class="value-in-js">0</span></br><span class="estimate-qualifier">per month</span>';
  else if (this.military_status == 'spouse' && this.spouse_active_duty)
  	estimated = '<span class="estimator-dollar-sign">$</span><span class="value-in-js">0</span></br><span class="estimate-qualifier">per month</span>';
  else if (this.isFlight())
  	estimated = '<span class="estimator-dollar-sign">$</span><span class="value-in-js">0</span></br><span class="estimate-qualifier">per month</span>';
  else if (this.isCorrespondence())
  	estimated = '<span class="estimator-dollar-sign">$</span><span class="value-in-js">0</span></br><span class="estimate-qualifier">per month</span>';
  else if (this.isOjt())
  	estimated = this.formatCurrency(this.tier * this.bah) + '</br><span class="estimate-qualifier">per month</span>';
  else if (this.online)
    estimated = this.formatCurrency(this.tier * this.AVGBAH / 2) + '</br><span class="estimate-qualifier">per month</span>';
  else if (this.country != 'usa')
    estimated = this.formatCurrency(this.tier * this.AVGBAH) + '</br><span class="estimate-qualifier">per month</span>';
  else
    estimated = this.formatCurrency(this.tier * this.bah) + '</br><span class="estimate-qualifier">per month</span>';

  return estimated;
 };

///////////////////////////////////////////////////////////////////////////////
// getBookStipend
// Calculates the estimated book stipend.
///////////////////////////////////////////////////////////////////////////////
Estimator.prototype.getBookStipend = function () {
  var estimated = null;
  
  this.setDependents();

  if (this.old_gi_bill)
    estimated = '<span class="estimator-dollar-sign">$</span><span class="value-in-js">0</span></br><span class="estimate-qualifier">per year</span>';
  else if (this.isFlight())
    estimated = '<span class="estimator-dollar-sign">$</span><span class="value-in-js">0</span></br><span class="estimate-qualifier">per year</span>';
  else if (this.isCorrespondence())
    estimated = '<span class="estimator-dollar-sign">$</span><span class="value-in-js">0</span></br><span class="estimate-qualifier">per year</span>';
  else if (this.gi_bill_chap == 31)
    estimated = '<span class="search-text-values">Full Cost of Books & Supplies</span>';
  else
    estimated = this.formatCurrency(this.tier * this.BSCAP) + '</br><span class="estimate-qualifier">per year</span>';

  return estimated;
  };


