///////////////////////////////////////////////////////////////////////////////
// Calculator
///////////////////////////////////////////////////////////////////////////////
function Calculator(institution_type) {
	// Values from forms
	// this.military_status = null;
	// this.spouse_active_duty = null;
	// this.gi_bill_chap = null;
	// this.number_of_depend = null;
  // this.post_911_elig = null;
  // this.cumulative_service = null;
  // this.enlistment_service = null;
  // this.consecutive_service = null;
  // this.institution_type = null;
  // this.country = null;
  // this.online = null;
  // this.bah = null;

  // Dependent Values
  // this.old_gi_bill = null;
  // this.service_discharge = null;
  // this.tier = null;
  // this.vre_only = null;
  // this.monthly_rate = null;
  // this.only_tuition_fees = null;

  this.institution_type = institution_type;
  this.setValues();
}

///////////////////////////////////////////////////////////////////////////////
// Constants
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.IN_STATE = "#in-state";
Calculator.prototype.TUITION_FEES = "#tuition_fees_form";
Calculator.prototype.IN_STATE_TUITION_FEES = "#in-state-tuition-fees-form";
Calculator.prototype.BOOKS_INPUT = "#books-input-row";
Calculator.prototype.YELLOW_RIBBON_RECIPIENT = "#yellow-ribbon-recipient-form";
Calculator.prototype.YELLOW_RIBBON_AMOUNT = "#yellow-ribbon-amount-form";
Calculator.prototype.SCHOLARSHIP = "#scholarship-amount-form";
Calculator.prototype.TUITION_ASSIST_FORM = "#tuition-assist-form";
Calculator.prototype.ENROLLED_OLD = "#enrolled-form-old-gi-bill";
Calculator.prototype.CALENDAR = "#calendar-form";
Calculator.prototype.WORKING = "#working-form";
Calculator.prototype.NUMBER_NON_TRADITIONAL_TERMS = "#number-non-traditional-terms-form";
Calculator.prototype.LENGTH_NON_TRADITIONAL_TERMS = "#length-non-traditional-terms-form";
Calculator.prototype.KICKER_ELIGIBLE = "#kicker-elig-form";
Calculator.prototype.KICKER = "#kicker-form";
Calculator.prototype.BUY_UP = "#buy-up-form";
Calculator.prototype.BUY_UP_RATE = "#buy-up-rate-form";

Calculator.prototype.CALC_TERM_TOTAL_ROW = "#calc-term-total-row";
Calculator.prototype.CALC_PAID_TO_SCHOOL_TOTAL_ROW = "#calc-paid-to-school-total-row";
Calculator.prototype.CALC_PAID_TO_YOU_TOTAL_ROW = "#calc-paid-to-you-total-row";
Calculator.prototype.CALC_OUT_OF_POCKET_ROW = "#calc-out-of-pocket-row";
Calculator.prototype.CALC_TUITION_FEES_CHARGED_ROW = "#calc-tuition-fees-charged-row";
Calculator.prototype.CALC_TUITION_FEES_SCHOLARSHIP_ROW = "#calc-tuition-fees-scholarship-row";
Calculator.prototype.CALC_SCHOOL_RECEIVED_ROW = "#calc-school-received-row";
Calculator.prototype.CALC_TUITION_FEES_ROW = "#calc-tuition-fees-row";
Calculator.prototype.CALC_YELLOW_RIBBON_ROW = "#calc-yellow-ribbon-row";
Calculator.prototype.CALC_YELLOW_RIBBON_VA_ROW = "#calc-yellow-ribbon-va-row";


///////////////////////////////////////////////////////////////////////////////
// setValues
// Sets all calculator values.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setValues = function() {
  this.setInState(this.IN_STATE);
  this.setTuitionFeesInput(this.IN_STATE);
  this.setInStateTuitionFees(this.IN_STATE_TUITION_FEES);
  this.setBooksInput(this.BOOKS_INPUT);
  this.setYellowRibbonRecipient(this.YELLOW_RIBBON_RECIPIENT);
  this.setYellowRibbonAmount(this.YELLOW_RIBBON_AMOUNT);
  this.setScholarship(this.SCHOLARSHIP);
  this.setTuitionAssist(this.TUITION_ASSIST_FORM);
  this.setEnrolledOld(this.ENROLLED_OLD);
  this.setCalendar(this.CALENDAR);
  this.setWorking(this.WORKING);
  this.setNumberNonTraditionalTerms(this.NUMBER_NON_TRADITIONAL_TERMS);
  this.setLengthNonTraditionalTerms(this.LENGTH_NON_TRADITIONAL_TERMS);
  this.setKickerEligible(this.KICKER_ELIGIBLE);
  this.setKicker(this.KICKER);
  this.setBuyUp(this.BUY_UP);
  this.setBuyUpRate(this.BUY_UP_RATE);

  this.setCalcTermTotalRow(this.CALC_TERM_TOTAL_ROW);
  this.setCalcPaidToSchoolTotalRow(this.CALC_PAID_TO_SCHOOL_TOTAL_ROW);
  this.setCalcPaidToYouTotalRow(this.CALC_PAID_TO_YOU_TOTAL_ROW);
  this.setCalcOutOfPocketRow(this.CALC_OUT_OF_POCKET_ROW);
  this.setCalcTuitionFeesChargedRow(this.CALC_TUITION_FEES_CHARGED_ROW);
  this.setCalcTuitionFeesScholarshipRow(this.CALC_TUITION_FEES_SCHOLARSHIP_ROW);
  this.setCalcSchoolReceivedRow(this.CALC_SCHOOL_RECEIVED_ROW);
  this.setCalcTuitionFeesRow(this.CALC_TUITION_FEES_ROW);
  this.setCalcYellowRibbonRow(this.CALC_YELLOW_RIBBON_ROW);
  this.setCalcYellowRibbonVaRow(this.CALC_YELLOW_RIBBON_VA_ROW);
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setDependents = function() {
}

///////////////////////////////////////////////////////////////////////////////
// setInState
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setInState = function(id) {
  this.in_state = $(id + " :input:checked").val().toLowerCase() === "yes";
  this.institution_type.toLowerCase() === "public" ? $(id).show(0) : $(id).hide(0);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setTuitionFeesInput
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setTuitionFeesInput = function(id) {
  this.tuition_fees_input = $(id + " :input").val();

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setInStateTuitionFees
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setInStateTuitionFees = function(id) {
  this.in_state_tuition_fees = $(id + " :input").val();

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setBooksInput
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setBooksInput = function(id) {
  this.books_input = $(id + " :input").val();

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setYellowRibbonRecipient
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setYellowRibbonRecipient = function(id) {
  this.receiving_yellow_ribbon = $(id + " :input:checked").val();

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setYellowRibbonAmount
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setYellowRibbonAmount = function(id) {
  this.yellow_ribbon_amount = $(id + " :input").val();

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setScholarship
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setScholarship = function(id) {
  this.scholarship = $(id + " :input").val();

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setTuitionAssist
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setTuitionAssist = function(id) {
  this.tuition_assist = $(id + " :input").val();
  this.institution_type.toLowerCase() !== "ojt" ? $(id).show(0) : $(id).hide(0);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setEnrolledOld
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setEnrolledOld = function(id) {
  this.enrolled_old = $(id + " :input").val();
  this.institution_type.toLowerCase() !== "ojt" ? $(id).show(0) : $(id).hide(0);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalendar
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalendar = function(id) {
  this.calendar = $(id + " :input").val();
  this.institution_type.toLowerCase() !== "ojt" ? $(id).show(0) : $(id).hide(0);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setWorking
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setWorking = function(id) {
  this.working = $(id + " :input").val();
  this.institution_type.toLowerCase() !== "ojt" ? $(id).show(0) : $(id).hide(0);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setNumberNonTraditionalTerms
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setNumberNonTraditionalTerms = function(id) {
  this.number_non_traditional_terms = $(id + " :input").val();

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setLengthNonTraditionalTerms
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setLengthNonTraditionalTerms = function(id) {
  this.number_non_traditional_terms = $(id + " :input").val();

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setKickerEligible
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setKickerEligible = function(id) {
  this.kicker_eligible = $(id + " :input").val().toLowerCase() === "yes";

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setKicker
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setKicker = function(id) {
  this.kicker_eligible = $(id + " :input").val();

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setBuyUp
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setBuyUp = function(id) {
  this.buy_up = $(id + " :input:checked").val().toLowerCase() === "yes";

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setBuyUpRate
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setBuyUpRate = function(id) {
  this.buy_up_rate = $(id + " :input").val();

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcTermTotalRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcTermTotalRow = function(id) {
  this.institution_type.toLowerCase() !== "ojt" ? $(id).show(0) : $(id).hide(0);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcPaidToSchoolTotalRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcPaidToSchoolTotalRow = function(id) {
  this.institution_type.toLowerCase() !== "ojt" ? $(id).show(0) : $(id).hide(0);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcPaidToYouTotalRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcPaidToYouTotalRow = function(id) {
  this.institution_type.toLowerCase() !== "ojt" ? $(id).show(0) : $(id).hide(0);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcOutOfPocketRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcOutOfPocketRow = function(id) {
  this.institution_type.toLowerCase() !== "ojt" ? $(id).show(0) : $(id).hide(0);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcTuitionFeesChargedRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcTuitionFeesChargedRow = function(id) {
  this.institution_type.toLowerCase() !== "ojt" ? $(id).show(0) : $(id).hide(0);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcTuitionFeesScholarshipRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcTuitionFeesScholarshipRow = function(id) {
  this.institution_type.toLowerCase() !== "ojt" ? $(id).show(0) : $(id).hide(0);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcSchoolReceivedRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcSchoolReceivedRow = function(id) {
  this.institution_type.toLowerCase() !== "ojt" ? $(id).show(0) : $(id).hide(0);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcTuitionFeesRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcTuitionFeesRow = function(id) {
  this.institution_type.toLowerCase() !== "ojt" ? $(id).show(0) : $(id).hide(0);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcYellowRibbonRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcYellowRibbonRow = function(id) {
  this.institution_type.toLowerCase() !== "ojt" ? $(id).show(0) : $(id).hide(0);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcYellowRibbonVaRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcYellowRibbonVaRow = function(id) {
  this.institution_type.toLowerCase() !== "ojt" ? $(id).show(0) : $(id).hide(0);

  return this;
};


