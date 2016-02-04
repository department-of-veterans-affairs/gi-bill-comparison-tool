require 'rails_helper'

RSpec.describe Institution, type: :model do
  subject { build :institution }

  describe 'Subject is valid' do
    specify { expect(subject).to be_valid }
  end

  describe 'Institution Types' do
    it 'cannot be blank' do
      expect(build(:institution, institution_type_id: nil)).not_to be_valid
    end
  end

  describe 'Facility codes' do
    it 'are unique' do
      subject.save!
      
      duplicate_fc = build(:institution, facility_code: subject.facility_code)
      expect(duplicate_fc).not_to be_valid
    end

    it 'cannot be blank' do
      expect(build(:institution, facility_code: nil)).not_to be_valid
    end
  end

  describe 'Institution names' do
    it 'cannot be blank' do
      expect(build(:institution, institution: nil)).not_to be_valid
    end
  end

  describe 'Countries' do
    it 'cannot be blank' do
      expect(build(:institution, country: nil)).not_to be_valid
    end
  end

  describe 'For certain booleans, nil is not false' do
    let(:credit_for_mil_training) { build(:institution, credit_for_mil_training: nil) }

    specify { expect(credit_for_mil_training.credit_for_mil_training == false).not_to be_truthy }
  end

  #   it "#yr: nil not valid" do expect(build(:institution, yr: nil)).not_to be_valid end
  #   it "#student_veteran: nil not valid" do expect(build(:institution, student_veteran: nil)).not_to be_valid end
  #   it "#eight_keys: nil not valid" do expect(build(:institution, eight_keys: nil)).not_to be_valid end
  #   it "#dodmou: nil not valid" do expect(build(:institution, dodmou: nil)).not_to be_valid end
  #   it "#online_all: nil not valid" do expect(build(:institution, online_all: nil)).not_to be_valid end
  #   it "#sec_702: nil not valid" do expect(build(:institution, sec_702: nil)).not_to be_valid end
  #   it "#accredited: nil not valid" do expect(build(:institution, accredited: nil)).not_to be_valid end
  #   it "#hcm_status: nil not valid" do expect(build(:institution, hcm_status: nil)).not_to be_valid end
  # end

  # describe 'institution should reflect school type' do
  #   let(:flight_type) { create :institution_type, name: 'flight' }
  #   let(:correspondence) { create :institution_type, name: 'correspondence' }
  #   let(:flight_school) { create(:institution, institution_type_id: flight_type.id) }
  #   let(:correspondence_school) { create(:institution, institution_type_id: correspondence.id) }

  #   it '#flight?' do 
  #     expect(flight_school).to be_flight 
  #     expect(flight_school).not_to be_correspondence 
  #   end 

  #   it '#correspondence?' do 
  #     expect(correspondence_school).to be_correspondence 
  #     expect(correspondence_school).not_to be_flight 
  #   end 
  # end 

  # describe '.autocomplete' do 
  #   let!(:ny1) { create :institution }
  #   let!(:ny2) { create :institution }
  #   let!(:ny3) { create :institution, institution: 'Institution 3 New York' }
  #   let!(:nj1) { create :institution, institution: 'New Jersey Institution 1' }
  #   let(:search_term) { 'new york' }

  #   before(:each) do 
  #     @institutions = Institution.autocomplete(search_term).map { |i| i.value }
  #   end

  #   it 'gets institutions starting with the search term' do
  #     expect(@institutions.size).to eql(2)
  #     expect(@institutions).to include(ny1.facility_code, ny2.facility_code)
  #   end

  #   it 'does not get institutions not starting with the search term' do
  #     expect(@institutions).not_to include(nj1.facility_code, ny3.facility_code)
  #   end
  # end
end