require 'rails_helper'

RSpec.describe Institution, type: :model do
  subject { build :institution }

  describe 'Sanity Check - Institution' do
    it 'factory is valid' do 
      expect(subject).to be_valid
    end
  end

  describe '#facility_code' do
    it 'is unique' do
      subject.save!
      expect(build(:institution, facility_code: subject.facility_code)).not_to be_valid
    end

    it 'cannot be blank' do
      subject.facility_code = nil
      expect(build(:institution, facility_code: nil)).not_to be_valid
    end
  end

  describe '#institution' do
    it 'cannot be blank' do
      expect(build(:institution, institution: nil)).not_to be_valid
    end
  end

  describe '#country' do
    it 'cannot be blank' do
      expect(build(:institution, country: nil)).not_to be_valid
    end
  end

  describe '#institution_type_id' do
    it 'cannot be blank' do
      expect(build(:institution, institution_type_id: nil)).not_to be_valid
    end
  end

  describe '#city' do
    it 'can be blank if country is not USA' do
      expect(build(:institution, country: 'lampshade', city: nil)).to be_valid
    end

    it 'cannot be blank if country is USA' do
      expect(build(:institution, country: 'usa', city: nil)).not_to be_valid
    end
  end

  describe '#state' do
    it 'can be blank if country is not USA' do
      expect(build(:institution, country: 'lampshade', state: nil)).to be_valid
    end

    it 'cannot be blank if country is USA' do
      expect(build(:institution, country: 'usa', state: nil)).not_to be_valid
    end
  end

  describe '#zip' do
    it 'can be blank if country is not USA' do
      expect(build(:institution, country: 'lampshade', zip: nil)).to be_valid
    end

    it 'cannot be blank if country is USA' do
      expect(build(:institution, country: 'usa', zip: nil)).not_to be_valid
    end
  end

  describe 'booleans cannot be nil' do
    it "#poe: nil not valid" do expect(build(:institution, poe: nil)).not_to be_valid end
    it "#yr: nil not valid" do expect(build(:institution, yr: nil)).not_to be_valid end
    it "#student_veteran: nil not valid" do expect(build(:institution, student_veteran: nil)).not_to be_valid end
    it "#eight_keys: nil not valid" do expect(build(:institution, eight_keys: nil)).not_to be_valid end
    it "#dodmou: nil not valid" do expect(build(:institution, dodmou: nil)).not_to be_valid end
    it "#online_all: nil not valid" do expect(build(:institution, online_all: nil)).not_to be_valid end
    it "#sec_702: nil not valid" do expect(build(:institution, sec_702: nil)).not_to be_valid end
    it "#accredited: nil not valid" do expect(build(:institution, accredited: nil)).not_to be_valid end
    it "#hcm_status: nil not valid" do expect(build(:institution, hcm_status: nil)).not_to be_valid end
  end

  describe 'institution should reflect school type' do
    let(:flight_type) { create :institution_type, name: 'flight' }
    let(:correspondence) { create :institution_type, name: 'correspondence' }
    let(:flight_school) { create(:institution, institution_type_id: flight_type.id) }
    let(:correspondence_school) { create(:institution, institution_type_id: correspondence.id) }

    it '#flight?' do 
      expect(flight_school).to be_flight 
      expect(flight_school).not_to be_correspondence 
    end 

    it '#correspondence?' do 
      expect(correspondence_school).to be_correspondence 
      expect(correspondence_school).not_to be_flight 
    end 
  end  
end