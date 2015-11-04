///////////////////////////////////////////////////////////////////////////////
// Calculator
///////////////////////////////////////////////////////////////////////////////
function Calculator(institution_type, institution) {
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

  this.institution_type = institution_type.toLowerCase();
  this.institution = institution;

  this.setValues();
  this.setDerivedValues();
  this.resetVisibility();

  var othis = this;
  $(".filter-item").change(function() {
    othis.setValues();
    othis.setDerivedValues();
    othis.resetVisibility();
  });
}

///////////////////////////////////////////////////////////////////////////////
// Constants
///////////////////////////////////////////////////////////////////////////////

// Estimator Ids
Calculator.prototype.MILITARY_STATUS = "#military-staus"
Calculator.prototype.GI_BILL_CHAPTER = "#gi-bill-chapter";
Calculator.prototype.ELIG_FOR_POST_GI_BILL = "#elig-for-post-gi-bill";
Calculator.prototype.CUMMULATIVE_SERVICE = "#cumulative-service";
Calculator.prototype.BSCAP = 1000;

// Calculator Tuition
Calculator.prototype.TUITION_FEES_SECTION = "#tuition-fees-section";
Calculator.prototype.IN_STATE = "#in-state";
Calculator.prototype.TUITION_FEES_FORM = "#tuition-fees-form";
Calculator.prototype.IN_STATE_TUITION_FEES_FORM = "#in-state-tuition-fees-form";
Calculator.prototype.BOOKS_INPUT_ROW = "#books-input-row";
Calculator.prototype.YELLOW_RIBBON_RECIPIENT_FORM = "#yellow-ribbon-recipient-form";
Calculator.prototype.YELLOW_RIBBON_AMOUNT_FORM = "#yellow-ribbon-amount-form";
Calculator.prototype.YELLOW_RIBBON_RATES_LINK = "#yellow-ribbon-rates-link"
Calculator.prototype.SCHOLARSHIP_AMOUNT_FORM = "#scholarship-amount-form";
Calculator.prototype.TUITION_ASSIST_FORM = "#tuition-assist-form";

// Calculator Enrollment
Calculator.prototype.ENROLLMENT_SECTION = "#enrollment-section";
Calculator.prototype.ENROLLED_FORM = "#enrolled-form";
Calculator.prototype.ENROLLED_FORM_OLD_GI_BILL = "#enrolled-form-old-gi-bill";
Calculator.prototype.CALENDAR_FORM = "#calendar-form";
Calculator.prototype.WORKING_FORM = "#working-form";
Calculator.prototype.NUMBER_NON_TRADITIONAL_TERMS_FORM = "#number-non-traditional-terms-form";
Calculator.prototype.LENGTH_NON_TRADITIONAL_TERMS_FORM = "#length-non-traditional-terms-form";
Calculator.prototype.KICKER_ELIG_FORM = "#kicker-elig-form";
Calculator.prototype.KICKER_FORM = "#kicker-form";
Calculator.prototype.BUY_UP_FORM = "#buy-up-form";
Calculator.prototype.BUY_UP_RATE_FORM = "#buy-up-rate-form";

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
  this.setTuitionFees(this.TUITION_FEES_FORM);
  this.setInStateTuitionFees(this.IN_STATE_TUITION_FEES_FORM);
  this.setBooks(this.BOOKS_INPUT_ROW);
  this.setYellowRibbon(this.YELLOW_RIBBON_RECIPIENT_FORM);
  this.setYellowBen(this.YELLOW_RIBBON_AMOUNT_FORM);
  this.setScholar(this.SCHOLARSHIP_AMOUNT_FORM);
  this.setTuitionAssist(this.TUITION_ASSIST_FORM);
  this.setRop(this.ENROLLED_FORM);
  this.setRopOld(this.ENROLLED_FORM_OLD_GI_BILL);
  this.setCalendar(this.CALENDAR_FORM);
  this.setOjtWorking(this.WORKING_FORM);
  this.setNumberNontradTerms(this.NUMBER_NON_TRADITIONAL_TERMS_FORM);
  this.setLengthNontradTerms(this.LENGTH_NON_TRADITIONAL_TERMS_FORM);
  this.setKickerElig(this.KICKER_ELIG_FORM);
  this.setKicker(this.KICKER_FORM);
  this.setBuyUpElig(this.BUY_UP_FORM);
  this.setBuyUp(this.BUY_UP_RATE_FORM);

  // this.setCalcTermTotalRow(this.CALC_TERM_TOTAL_ROW);
  // this.setCalcPaidToSchoolTotalRow(this.CALC_PAID_TO_SCHOOL_TOTAL_ROW);
  // this.setCalcPaidToYouTotalRow(this.CALC_PAID_TO_YOU_TOTAL_ROW);
  // this.setCalcOutOfPocketRow(this.CALC_OUT_OF_POCKET_ROW);
  // this.setCalcTuitionFeesChargedRow(this.CALC_TUITION_FEES_CHARGED_ROW);
  // this.setCalcTuitionFeesScholarshipRow(this.CALC_TUITION_FEES_SCHOLARSHIP_ROW);
  // this.setCalcSchoolReceivedRow(this.CALC_SCHOOL_RECEIVED_ROW);
  // this.setCalcTuitionFeesRow(this.CALC_TUITION_FEES_ROW);
  // this.setCalcYellowRibbonRow(this.CALC_YELLOW_RIBBON_ROW);
  // this.setCalcYellowRibbonVaRow(this.CALC_YELLOW_RIBBON_VA_ROW);
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setDerivedValues = function() {
  this.setVreOnly();
  this.setTier();
  this.setBookStipend();
  this.setYellowRibbonEligibility();
  this.setNumberOfTerms();
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.resetVisibility = function() {
  // Tuition/Fees Input Results
  $(this.TUITION_FEES_SECTION).show();
  $(this.IN_STATE).hide();
  $(this.IN_STATE_TUITION_FEES_FORM).hide();
  $(this.BOOKS_INPUT_ROW).hide();
  $(this.YELLOW_RIBBON_RECIPIENT_FORM).hide();
  $(this.YELLOW_RIBBON_AMOUNT_FORM).hide();
  $(this.YELLOW_RIBBON_RATES_LINK).hide();
  $(this.SCHOLARSHIP_AMOUNT_FORM).show();
  $(this.TUITION_ASSIST_FORM).hide();

  // Enrollment Inputs
  $(this.ENROLLMENT_SECTION).show();
  $(this.ENROLLED_FORM).show();
  $(this.ENROLLED_FORM_OLD_GI_BILL).hide();
  $(this.WORKING_FORM).hide();
  $(this.CALENDAR_FORM).show();
  $(this.NUMBER_NON_TRADITIONAL_TERMS_FORM).hide();
  $(this.LENGTH_NON_TRADITIONAL_TERMS_FORM).hide();
  $(this.KICKER_ELIG_FORM).show();
  $(this.KICKER_FORM).hide();
  $(this.BUY_UP_FORM).hide();
  $(this.BUY_UP_RATE_FORM).hide();

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
    $(this.ENROLLED_FORM).show();
    $(this.ENROLLED_FORM_OLD_GI_BILL).hide();
    $(this.YELLOW_RIBBON_RECIPIENT_FORM).hide();
    $(this.YELLOW_RIBBON_AMOUNT_FORM).hide();
    $(this.YELLOW_RIBBON_RATES_LINK).hide();
    $(this.SCHOLARSHIP_AMOUNT_FORM).hide();
    $(this.TUITION_ASSIST_FORM).hide();
    $(this.CALC_YELLOW_RIBBON_ROW).hide();    
  }

  if (this.institution_type === 'ojt') {
    $(this.TUITION_FEES_SECTION).hide();
    $(this.ENROLLED_FORM).hide();
    $(this.ENROLLED_FORM_OLD_GI_BILL).hide();
    $(this.WORKING_FORM).show();
    $(this.CALENDAR_FORM).hide();
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

  if (this.gi_bill_chapter == 35) {
    $(this.KICKER_ELIG_FORM).hide();
    $(this.KICKER_FORM).hide();
  }

  if (this.institution_type ==- 'flight' || this.institution_type === 'correspondence') {
    $(this.ENROLLED_FORM).hide();
    $(this.ENROLLED_FORM_OLD_GI_BILL).hide();
    $(this.KICKER_ELIG_FORM).hide();
    $(this.BUY_UP_FORM).hide();
  }

  if (this.institution_type == 'public') {
    $(this.IN_STATE).show();
    if (!this.in_state) {
      $(this.IN_STATE_TUITION_FEES_FORM).show();
    }
  }

  if (this.institution.yr && this.tier == 1.0) {
    $(this.YELLOW_RIBBON_RECIPIENT_FORM).show();
    
    if (this.yellow_ribbon) {
      $(this.YELLOW_RIBBON_AMOUNT_FORM).show();
      $(this.YELLOW_RIBBON_RATES_LINK).show();
    }
  }

  if (this.institution_type !== 'ojt' && this.calendar === 'nontraditional') {
    $(this.NUMBER_NON_TRADITIONAL_TERMS_FORM).show();
    $(this.LENGTH_NON_TRADITIONAL_TERMS_FORM).show();
  }
    
  if (this.old_gi_bill == true || this.vre_only == true) {
    $(this.ENROLLED_FORM).hide();
    $(this.ENROLLED_FORM_OLD_GI_BILL).show();
    $(this.YELLOW_RIBBON_RECIPIENT_FORM).hide();
    $(this.YELLOW_RIBBON_AMOUNT_FORM).hide();
    $(this.YELLOW_RIBBON_RATES_LINK).hide();
    $(this.CALC_YELLOW_RIBBON_ROW).hide();
  }

  if (this.kicker_elig) {
    $(this.KICKER_FORM).show();
  }

  if (this.buy_up_elig) {
    $(this.BUY_UP_RATE_FORM).show();
  }

  if (this.gi_bill_chapter == 31) {
    $(this.BOOKS_INPUT_ROW).show();
  } else {
    $(this.BOOKS_INPUT_ROW).hide();
  }

  if (this.gi_bill_chapter == 30) {
    $(this.BUY_UP_FORM).show();
  } else {
    $(this.BUY_UP_FORM).hide();
    $(this.BUY_UP_RATE_FORM).hide();      
  }

  if ((this.military_status == 'active duty' ||
      this.military_status == 'national guard / reserves') &&
      this.gi_bill_chapter == 33) {
    $(this.TUITION_ASSIST_FORM).show();
  } else {
    $(this.TUITION_ASSIST_FORM).hide();
  }

  if (!this.yellow_ribbon_eligible) {
    $(this.CALC_YELLOW_RIBBON_ROW).hide();
    $(this.CALC_YELLOW_RIBBON_VA_ROW).hide();
  }

  if (this.number_of_terms == 1) {
    $(this.TERM2).hide();
    $(this.TERM3).hide();
    $(this.TUITION_FEES_TERM_2).hide();
    $(this.TUITION_FEES_TERM_3).hide();
    $(this.YR_BEN_TERM_2).hide();
    $(this.YR_BEN_TERM_3).hide();
    $(this.YR_BEN_TERM_VA_2).hide();
    $(this.YR_BEN_TERM_VA_3).hide();
    $(this.HOUSING_ALLOW_TERM_2).hide();
    $(this.HOUSING_ALLOW_TERM_3).hide();
    $(this.BOOK_STIPEND_TERM_2).hide();
    $(this.BOOK_STIPEND_TERM_3).hide();
  }

  if (this.number_of_terms < 3 && this.institution_type !== 'ojt') {
    $(this.TERM3).hide();
    $(this.TUITION_FEES_TERM_3).hide();
    $(this.YR_BEN_TERM_3).hide();
    $(this.YR_BEN_TERM_VA_3).hide();
    $(this.HOUSING_ALLOW_TERM_3).hide();
    $(this.BOOK_STIPEND_TERM_3).hide();
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
// getCurrency
// Converts a currency string to a number.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getCurrency = function (currency) {
  return Number(currency.replace(/[^0-9\.]+/g,''));
}

///////////////////////////////////////////////////////////////////////////////
// setMilitaryStatus
//
// Saves as number.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setMilitaryStatus = function(id) {
  this.military_status = $(id).val();

  return this;
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
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setTuitionFees
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setTuitionFees = function(id) {
  this.tuition_fees = this.getCurrency($(id + " :input").val());

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setInStateTuitionFees
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setInStateTuitionFees = function(id) {
  this.in_state_tuition_fees = this.getCurrency($(id + " :input").val());

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setBooks
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setBooks = function(id) {
  this.books = this.getCurrency($(id + " :input").val());

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setYellowRibbon
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setYellowRibbon = function(id) {
  this.yellow_ribbon = $(id + " :input:checked").val().toLowerCase() === "yes";

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setYellowBen
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setYellowBen = function(id) {
  this.yellow_ben = this.getCurrency($(id + " :input").val());
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setScholar
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setScholar = function(id) {
  this.scholar = Number($(id + " :input").val());
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
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setRop
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setRop = function(id) {
  this.rop = Number($(id + " :input").val());
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setRopOld
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setRopOld = function(id) {
  this.rop_old = $(id + " :input").val();
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
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setOjtWorking
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setOjtWorking = function(id) {
  this.ojt_working = $(id + " :input").val();
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setNumberNontradTerms
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setNumberNontradTerms = function(id) {
  this.number_nontrad_terms = Number($(id + " :input").val());
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setLengthNontradTerms
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setLengthNontradTerms = function(id) {
  this.number_nontrad_terms = $(id + " :input").val();
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setKickerElig
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setKickerElig = function(id) {
  this.kicker_elig = $(id + " :input:checked").val().toLowerCase() === "yes";
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setKicker
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setKicker = function(id) {
  this.kicker = this.getCurrency($(id + " :input").val());
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setBuyUpElig
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setBuyUpElig = function(id) {
  this.buy_up_elig = $(id + " :input:checked").val().toLowerCase() === "yes";
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setBuyUp
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setBuyUp = function(id) {
  this.buy_up = Number($(id + " :input").val());

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcTermTotalRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcTermTotalRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcPaidToSchoolTotalRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcPaidToSchoolTotalRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcPaidToYouTotalRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcPaidToYouTotalRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcOutOfPocketRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcOutOfPocketRow = function(id) {

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcTuitionFeesChargedRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcTuitionFeesChargedRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcTuitionFeesScholarshipRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcTuitionFeesScholarshipRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcSchoolReceivedRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcSchoolReceivedRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcTuitionFeesRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcTuitionFeesRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcYellowRibbonRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcYellowRibbonRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcYellowRibbonVaRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcYellowRibbonVaRow = function(id) {
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

///////////////////////////////////////////////////////////////////////////////
// setYellowRibbonEligibility
// Determine yellow ribbon eligibility
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setYellowRibbonEligibility = function () {
  if (this.tier < 1 || !this.yr || !this.yellow_ribbon 
      || this.military_status == 'active duty') {
    this.yellow_ribbon_eligible = false;
  }
  else if (this.institution_type == 'ojt' || this.institution_type == 'flight' || this.institution_type == 'correspondence') {
    this.yellow_ribbon_eligible = false;
  } else {
    this.yellow_ribbon_eligible = true;
  }

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setNumberOfTerms
// Calculate the total number of academic terms
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setNumberOfTerms = function () {
  if (this.institution_type === 'ojt')
    this.number_of_terms = 3;
  else if (this.calendar === 'semesters')
    this.number_of_terms = 2;
  else if (this.calendar == 'quarters')
    this.number_of_terms = 3;
  else if (this.calendar == 'nontraditional') {
    this.number_of_terms = this.number_non_traditional_terms;
  }
};