///////////////////////////////////////////////////////////////////////////////
// Calculator
///////////////////////////////////////////////////////////////////////////////
function Calculator(institution_type) {
	// Estimator values
	// this.military_status = null;
	// this.spouse_active_duty = null;
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
  this.setDerivedValues();
  this.resetVisibility();
}

///////////////////////////////////////////////////////////////////////////////
// Constants
///////////////////////////////////////////////////////////////////////////////

// Estimator Ids
Calculator.prototype.GI_BILL_CHAPTER = "#gi-bill-chapter";
Calculator.prototype.ELIG_FOR_POST_GI_BILL = "#elig-for-post-gi-bill";
Calculator.prototype.CUMMULATIVE_SERVICE = "#cumulative-service";
Calculator.prototype.BSCAP = 1000;

// Calculator Tuition
Calculator.prototype.TUITION_FEES_SECTION = "#tuition-fees-section";
Calculator.prototype.IN_STATE = "#in-state";
Calculator.prototype.TUITION_FEES = "#tuition_fees_form";
Calculator.prototype.IN_STATE_TUITION_FEES = "#in-state-tuition-fees-form";
Calculator.prototype.BOOKS_INPUT = "#books-input-row";
Calculator.prototype.YELLOW_RIBBON_RECIPIENT = "#yellow-ribbon-recipient-form";
Calculator.prototype.YELLOW_RIBBON_AMOUNT = "#yellow-ribbon-amount-form";
Calculator.prototype.YELLOW_RIBBON_RATES_LINK = "#yellow-ribbon-rates-link"
Calculator.prototype.SCHOLARSHIP = "#scholarship-amount-form";
Calculator.prototype.TUITION_ASSIST_FORM = "#tuition-assist-form";

// Calculator Enrollment
Calculator.prototype.ENROLLMENT_SECTION = "#enrollment-section";
Calculator.prototype.ENROLLED = "#enrolled-form";
Calculator.prototype.ENROLLED_OLD = "#enrolled-form-old-gi-bill";
Calculator.prototype.CALENDAR = "#calendar-form";
Calculator.prototype.WORKING = "#working-form";
Calculator.prototype.NUMBER_NON_TRADITIONAL_TERMS = "#number-non-traditional-terms-form";
Calculator.prototype.LENGTH_NON_TRADITIONAL_TERMS = "#length-non-traditional-terms-form";
Calculator.prototype.KICKER_ELIGIBLE = "#kicker-elig-form";
Calculator.prototype.KICKER = "#kicker-form";
Calculator.prototype.BUY_UP = "#buy-up-form";
Calculator.prototype.BUY_UP_RATE = "#buy-up-rate-form";

// Calculator Outputs
Calculator.prototype.CALC_HOUSING_ALLOW_RATE_ROW = "#calc-housing-allow-rate-row";
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

// Class and control selectors
Calculator.prototype.TERM2 = ".term2";
Calculator.prototype.TERM3 = ".term3";
Calculator.prototype.TUITION_FEES_TERM_2 = "#tuition-fees-term-2";
Calculator.prototype.TUITION_FEES_TERM_3 = "#tuition-fees-term-3";
Calculator.prototype.YR_BEN_TERM_2 = "#yr-ben-term-2";
Calculator.prototype.YR_BEN_TERM_3 = "#yr-ben-term-3";
Calculator.prototype.YR_BEN_TERM_VA_2 = "#yr-ben-term-va-2";
Calculator.prototype.YR_BEN_TERM_VA_3 = "#yr-ben-term-va-3";
Calculator.prototype.HOUSING_ALLOW_TERM_2 = "#housing-allow-term-2";
Calculator.prototype.HOUSING_ALLOW_TERM_3 = "#housing-allow-term-3";
Calculator.prototype.BOOK_STIPEND_TERM_2 = "#book-stipend-term-2";
Calculator.prototype.BOOK_STIPEND_TERM_3 = "#book-stipend-term-3";

///////////////////////////////////////////////////////////////////////////////
// setValues
// Sets all calculator values.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setValues = function() {
  this.setGiBillChapter(this.GI_BILL_CHAPTER);
  this.setEligForPostGiBill(this.ELIG_FOR_POST_GI_BILL);
  this.setCumulativeService(this.CUMMULATIVE_SERVICE);

  this.setInState(this.IN_STATE);
  this.setTuitionFeesInput(this.IN_STATE);
  this.setInStateTuitionFees(this.IN_STATE_TUITION_FEES);
  this.setBooksInput(this.BOOKS_INPUT);
  this.setYellowRibbonRecipient(this.YELLOW_RIBBON_RECIPIENT);
  this.setYellowRibbonAmount(this.YELLOW_RIBBON_AMOUNT);
  this.setScholarship(this.SCHOLARSHIP);
  this.setTuitionAssist(this.TUITION_ASSIST_FORM);
  this.setEnrolled(this.ENROLLED);
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
Calculator.prototype.setDerivedValues = function() {
  this.setVreOnly();
  this.setTier();
  this.setBookStipend();
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.resetVisibility = function() {
  // Tuition/Fees Input Results
  $(this.TUITION_FEES_SECTION).show();
  $(this.IN_STATE).hide();
  $(this.IN_STATE_TUITION_FEES).hide();
  $(this.BOOKS_INPUT).hide();
  $(this.YELLOW_RIBBON_RECIPIENT).hide();
  $(this.YELLOW_RIBBON_AMOUNT).hide();
  $(this.YELLOW_RIBBON_RATES_LINK).hide();
  $(this.SCHOLARSHIP).show();
  $(this.TUITION_ASSIST_FORM).hide();

  // Enrollment Inputs
  $(this.ENROLLMENT_SECTION).show();
  $(this.ENROLLED).show();
  $(this.ENROLLED_OLD).hide();
  $(this.WORKING).hide();
  $(this.CALENDAR).show();
  $(this.NUMBER_NON_TRADITIONAL_TERMS).hide();
  $(this.LENGTH_NON_TRADITIONAL_TERMS).hide();
  $(this.KICKER_ELIGIBLE).show();
  $(this.KICKER).hide();
  $(this.BUY_UP).hide();
  $(this.BUY_UP_RATE).hide();

  // Calculator Results
  $(this.CALC_HOUSING_ALLOW_RATE_ROW).show();
  $(this.CALC_TERM_TOTAL_ROW).show();
  $(this.CALC_PAID_TO_YOU_TOTAL_ROW).show();
  $(this.CALC_PAID_TO_SCHOOL_TOTAL_ROW).show();

  $(this.CALC_OUT_OF_POCKET_ROW).show();
  $(this.CALC_TUITION_FEES_CHARGED_ROW).show();
  $(this.CALC_SCHOOL_RECEIVED_ROW).show();
  $(this.CALC_TUITION_FEES_SCHOLARSHIP_ROW).show();


  $(this.CALC_TUITION_FEES_ROW).show();
  $(this.CALC_YELLOW_RIBBON_ROW).show();
  $(this.CALC_YELLOW_RIBBON_VA_ROW).show();

  // Calculator Results - Particular classes and ids
  $(this.TERM2).show();
  $(this.TERM3).show();

  $(this.TUITION_FEES_TERM_2).show();
  $(this.TUITION_FEES_TERM_3).show();
  $(this.YR_BEN_TERM_2).show();
  $(this.YR_BEN_TERM_3).show();
  $(this.YR_BEN_TERM_VA_2).show();
  $(this.YR_BEN_TERM_VA_3).show();
  $(this.HOUSING_ALLOW_TERM_2).show();
  $(this.HOUSING_ALLOW_TERM_3).show();
  $(this.BOOK_STIPEND_TERM_2).show();
  $(this.BOOK_STIPEND_TERM_3).show();

  // Dependent Visibilities
  if (!this.vre_only) {
    $(this.ENROLLED).show(100);
    $(this.ENROLLED_OLD).hide(100);
    $(this.YELLOW_RIBBON_RECIPIENT).hide(100);
    $(this.YELLOW_RIBBON_AMOUNT).hide(100);
    $(this.YELLOW_RIBBON_RATES_LINK).hide(100);
    $(this.SCHOLARSHIP).hide(100);
    $(this.TUITION_ASSIST_FORM).hide(100);
    $(this.CALC_YELLOW_RIBBON_ROW).hide(100);    
  }

  if (this.institution_type === 'ojt') {
    $(this.TUITION_FEES_SECTION).hide();
    $(this.ENROLLED).hide();
    $(this.ENROLLED_OLD).hide();
    $(this.WORKING).show();
    $(this.CALENDAR).hide();
    $(this.TUITION_ASSIST_FORM).hide();
    $(this.CALC_TUITION_FEES_ROW).hide();
    $(this.CALC_YELLOW_RIBBON_ROW).hide();
    $(this.CALC_YELLOW_RIBBON_VA_ROW).hide();
    $(this.CALC_SCHOOL_RECEIVED_ROW).hide();
    $(this.CALC_PAID_TO_SCHOOL_TOTAL_ROW).hide();
    $(this.CALC_TUITION_FEES_SCHOLARSHIP_ROW).hide();
    $(this.CALC_TUITION_FEES_CHARGED_ROW).hide();
    $(this.CALC_OUT_OF_POCKET_ROW).hide();
    $(this.CALC_PAID_TO_YOU_TOTAL_ROW).hide();
    $(this.CALC_TERM_TOTAL_ROW).hide();
  }

  if (this.gi_bill_chap == 35) {
    $(this.KICKER_ELIGIBLE).hide();
    $(this.KICKER).hide();
  }

  if (calculated.institution_type ==- 'flight' || calculated.institution_type === 'correspondence') {
      $('#online-classes').hide();
      $('#enrolled-form').hide();
      $('#enrolled-form-old-gi-bill').hide();
      $('#kicker-elig-form').hide();
      $('#buy-up-form').hide();
    }
};

///////////////////////////////////////////////////////////////////////////////
// formatCurrency
// Formats currency in USD
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.formatCurrency = function (num) {
  var str = Math.round(Number(num)).toString();
    
  // match a digit if it's followed by 3 other digits, appending a comma to each match
  return '<span class="estimator-dollar-sign">$</span>' + str.replace(/\d(?=(\d{3})+$)/g, '$&,');
};

///////////////////////////////////////////////////////////////////////////////
// setGiBillChapter
// Sets gi bill chapter value from the element with the id argument. Also sets
// the old_gi_bill boolean based on the value of the gi_bill_chap.
//
// Saves as number.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setGiBillChapter = function(id) {
  this.gi_bill_chapter = Number($(id).val());
  this.old_gi_bill = (this.gi_bill_chap == 30 || this.gi_bill_chap == 1607 
    || this.gi_bill_chap == 1606 || this.gi_bill_chap == 35);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setEligForPostGiBill
// Sets gi bill chapter value from the element with the id argument.
//
// Saves as bool.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setEligForPostGiBill = function(id) {
  this.elig_for_post_gi_bill = $(id).val().toLowerCase() === 'yes';
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCumulativeService
// Sets the cumulative service value from the element with the id argument.
//
// Saves as float.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCumulativeService = function(id) {
  var val = $(id).val();

  this.service_discharge = val === "service discharge";
  this.cumulative_service = this.service_discharge ? 1.0 : parseFloat(val);

  return this;
};

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
  this.tuition_fees_input = Number($(id + " :input").val());

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setInStateTuitionFees
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setInStateTuitionFees = function(id) {
  this.in_state_tuition_fees = Number($(id + " :input").val());

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setBooksInput
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setBooksInput = function(id) {
  this.books_input = Number($(id + " :input").val());

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
  this.yellow_ribbon_amount = Number($(id + " :input").val());

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setScholarship
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setScholarship = function(id) {
  this.scholarship = Number($(id + " :input").val());

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
// setEnrolled
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setEnrolled = function(id) {
  this.enrolled_old = Number($(id + " :input").val());
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

///////////////////////////////////////////////////////////////////////////////
// setVreOnly
// Calculate if eligible for VR&E and Post-9/11 Benefits.
//
// Saves as boolean.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setVreOnly = function () {
  this.vre_only = (this.gi_bill_chapter == 31 && !this.elig_for_post_gi_bill);
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getTier
// 
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setTier = function () {
  if (this.gi_bill_chap == 31 && this.post_911_elig == true)
    this.tier = 1;
  else
    this.tier = parseFloat(this.cumulative_service);
  
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setBookStipend
// Calculate if eligible for VR&E and Post-9/11 Benefits.
//
// Saves as boolean.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setBookStipend = function () {
    if (this.old_gi_bill) 
      this.est_book_stipend = '$0 / year';
    else if (this.institution_type === "flight" || this.institution_type === "correspondence")
      this.est_book_stipend = '$0 / year';
    else if (this.gi_bill_chapter == 31)
      this.est_book_stipend = 'Full Cost of Books/Supplies';
    else
      this.est_book_stipend = this.formatCurrency(this.tier * this.BSCAP) + ' / year';

  return this;
};