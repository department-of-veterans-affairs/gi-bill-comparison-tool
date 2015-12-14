require "rails_helper"

RSpec.describe Filter do
  let(:data) { Institution.all }
  subject { Filter.new(data) }

  #############################################################################
  ## General Testing
  #############################################################################
  describe "general testing of the filter" do
    let!(:rsets_string) { [create(:institution, student_veteran_link: "string")] }
    let!(:rsets_string_neg_1) { [create(:institution, student_veteran_link: "another string")] }
    let!(:rsets_string_neg_2) { [create(:institution, student_veteran_link: "another other string")] }
    let!(:rsets_integer) { [create(:institution, p911_yr_recipients: 1)] }
    let!(:rsets_float) { [create(:institution, bah: 1.0)] }
    let!(:rsets_float_neg) { [create(:institution, bah: 2.0)] }
    let!(:rsets_bool) { [create(:institution, accredited: true)] }
    let!(:rsets_bool_neg) { [create(:institution, accredited: false)] }

    let(:nonsense_filter) {{ name: "blah-blah" }}
    let(:valid_filter) {{ name: "city" }}

    let(:string_filter) {{ name: "student_veteran_link", value: "string" }}
    let(:string_filter_neg) {{ name: "student_veteran_link", value: "string", negated: true }}
    let(:integer_filter) {{ name: "p911_yr_recipients", value: 1 }}
    let(:integer_filter_neg) {{ name: "p911_yr_recipients", value: 1, negated: true }}
    let(:float_filter) {{ name: "bah", value: 1.0 }}
    let(:float_filter_neg) {{ name: "bah", value: 1.0, negated: true }}
    let(:bool_filter) {{ name: "accredited", value: true }}
    let(:bool_filter_neg) {{ name: "accredited", value: true, negated: true }}

    describe "when adding filters" do
      it "rejects a filter with an invalid attribute of the data" do
        expect{ subject.add_filter(nonsense_filter) }.not_to change{ subject.filters.count }
      end

      it "accepts a filter with an invalid attribute of the data" do
        expect{ subject.add_filter(valid_filter) }.to change{ subject.filters.count }.from(0).to(1)
      end

      it "adding a nil filter does nothing" do 
        expect{ subject.add_filter(nil) }.not_to change { subject.filters.count }
      end      

      it "adding a filter with a nil name does nothing" do 
        expect{ subject.add_filter({ name: nil }) }.not_to change { subject.filters.count }
      end
    end

    describe "when filtering" do
      it "can filter by strings" do
        subject.add_filter(string_filter)
        expect(subject.apply_filters).to match_array(rsets_string)
      end

      it "can filter by negations of strings" do
        subject.add_filter(string_filter_neg)
        results = rsets_string_neg_1 + rsets_string_neg_2
        expect(subject.apply_filters).to match_array(results)
      end

      it "can filter by integers" do
        subject.add_filter(integer_filter)
        expect(subject.apply_filters).to match_array(rsets_integer)
      end

      it "can filter by negations of integers" do
        subject.add_filter(integer_filter_neg)

        # Institution integer fields default to 0 when intialized with nil
        results = rsets_string + rsets_string_neg_1 + rsets_string_neg_2 + 
          rsets_float + rsets_float_neg + rsets_bool + rsets_bool_neg

        expect(subject.apply_filters).to match_array(results)
      end

      it "can filter by floats" do
        subject.add_filter(float_filter)
        expect(subject.apply_filters).to match_array(rsets_float)
      end

      it "can filter by negations of floats" do
        subject.add_filter(float_filter_neg)
        expect(subject.apply_filters).to match_array(rsets_float_neg)
      end

      it "can filter by booleans" do
        subject.add_filter(bool_filter)
        expect(subject.apply_filters).to match_array(rsets_bool)
      end

      it "can filter by negations of booleans" do
        subject.add_filter(bool_filter_neg)
        
        # Institution boolean fields default to false when intialized with nil
        results = rsets_string + rsets_string_neg_1 + rsets_string_neg_2 + 
          rsets_integer + rsets_float + rsets_float_neg + rsets_bool_neg

        expect(subject.apply_filters).to match_array(results)
      end
    end
  end
end

  #####################################################################
  ## School Types Data
  #############################################################################
	# let!(:pub) { create :institution_type, name: "public" }
 #  let!(:pri) { create :institution_type, name: "private" }
 #  let!(:frp) { create :institution_type, name: "for profit" }
 #  let!(:flt) { create :institution_type, name: "flight" }
 #  let!(:cor) { create :institution_type, name: "correspondence" }
 #  let!(:fgn) { create :institution_type, name: "foreign" }
 #  let!(:ojt) { create :institution_type, name: "ojt" }


















  # let(:data) { Institution.all }
  # subject { Filter.new(data) } 

 #  let!(:rsets_pub) { create_list :institution, 5, institution_type_id: pub.id }
 #  let!(:rsets_pri) { create_list :institution, 5, institution_type_id: pri.id }
 #  let!(:rsets_frp) { create_list :institution, 5, institution_type_id: frp.id }
 #  let!(:rsets_flt) { create_list :institution, 5, institution_type_id: flt.id }
 #  let!(:rsets_cor) { create_list :institution, 5, institution_type_id: cor.id }
 #  let!(:rsets_fgn) { create_list :institution, 5, institution_type_id: fgn.id }
 #  let!(:rsets_ojt) { create_list :institution, 5, institution_type_id: ojt.id }

 #  let!(:rsets_us_ny) { create_list :institution, 5, :from_ny }
 #  let!(:rsets_us_ch) { create_list :institution, 5, :from_chicago }
 #  let!(:rsets_uk_ln) { create_list :institution, 5, :from_london }

 #  let!(:rsets_svg) { create_list :institution, 5, student_veteran: true }
 #  let!(:rsets_yrb) { create_list :institution, 5, yr: true }
 #  let!(:rsets_poe) { create_list :institution, 5, poe: true }
 #  let!(:rsets_8ky) { create_list :institution, 5, eight_keys: true }

 #  let!(:rsets_pub_ch_poe) { 
 #  	create_list :institution, 5, :from_chicago, 
 #  		institution_type_id: pub.id, poe: true
	# }

 #  let!(:rsets_pub_ch_poe_svg) { 
 #  	create_list :institution, 5, :from_chicago, 
 #  		institution_type_id: pub.id, poe: true, student_veteran: true
	# }

 #  #############################################################################
 #  ## Filters
 #  #############################################################################
 
 #  let(:uk) { { name: "country", value: "uk" } }

 #  let(:new_york_state) { { name: "state", value: "ny" } }

 #  let(:city_nonsense) { { name: "city", value: "blah-blah" } }  
 #  let(:new_york_city) { { name: "city", value: "new york" } }
 #  let(:not_new_york_city) { { name: "city", value: "new york", negated: true } }

 #  let(:yr) { { name: "yr", value: true } }

 #  let(:type_employer) { { name: "institution_type_id", value: ojt.id } }
 #  let(:type_school)   { { name: "institution_type_id", value: ojt.id, negated: true } }















 #  describe "General tests ... " do

 #    end



 #  	describe "when applying filters" do       


 #      it "can filter by fixnums" do
 #        subject.add_filter(type_employer)
 #        expect(subject.apply_filters).to match_array(rsets_ojt)
 #      end

 #      it "can filter by booleans" do
 #        subject.add_filter(yr)
 #        expect(subject.apply_filters).to match_array(rsets_yrb)
 #      end

 #      it "can filter by negations" do 
 #        subject.add_filter(type_school)
 #        schools = rsets_pub + rsets_pri + rsets_frp + rsets_fgn + rsets_cor +
 #          rsets_flt + rsets_us_ny + rsets_us_ch + rsets_uk_ln + rsets_svg +
 #          rsets_8ky + rsets_poe + rsets_yrb + rsets_pub_ch_poe + rsets_pub_ch_poe_svg

 #        expect(subject.apply_filters).to match_array(schools)
 #      end

 #      it "filtering with no filters returns the original data" do 
 #        expect(subject.apply_filters).to match_array(data)
 #      end

 #      it "filtering by a non-existant attribute returns nothing" do
 #        subject.add_filter(city_nonsense)
 #        expect(subject.apply_filters).to be_empty
 #      end
 #  	end
 #  end

 #  describe "GI tool specific tests ..." do
 #    it "filters schools by employer type" do
 #      subject.add_filter(type_employer)
 #      expect(subject)
 #    end

 #    it "filters schools by country" do
 #      subject.add_filter(uk)
 #      expect(subject.apply_filters).to match_array(rsets_uk_ln)
 #    end

 #    it "filters schools by state" do
 #      subject.add_filter(new_york_state)
 #      expect(subject.apply_filters).to match_array(rsets_us_ny)
 #    end    
 #  end
