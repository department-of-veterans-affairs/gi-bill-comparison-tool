# require 'rspec/expectations'

#RSpec.describe 'load_csv' do
#  def get_column_type(type)
#    LoadCsvHelper.get_columns.select do |name| 
#      Institution.columns_hash[name].type == type 
#    end
#  end

#  before(:all) do 
#    GiBillComparisonToolNew::Application.load_tasks 
    
#    @csv_rows = CSV.read('rake_test_data.csv', headers: true, 
#        encoding: "iso-8859-1:utf-8", header_converters: :symbol).map { |row| row.to_hash }

#    silence_stream(STDOUT) do
#      Rake::Task['load_csv'].invoke('rake_test_data.csv')
#    end
#  end

#  describe 'transcribing Csv to DB' do
#    it 'both have the same row count' do 
#      expect(@csv_rows.length).to eql(Institution.count)
#    end
#  end

#  describe 'processing booleans' do
#  	let(:all_yesses) { 0 }
#  	let(:all_nos) { 1 }
#  	let(:all_nils) { 2 }

#    before(:all) do @bools = get_column_type(:boolean) end

#    it "sets fields to true when csv is 'Yes' or 'True'" do
#      row = Institution.find_by(facility_code: @csv_rows[all_yesses][:facility_code])
#      @bools.each { |bool| expect(row[bool]).to be_truthy }
#    end

#    it "sets fields to false when csv neither 'Yes' nor 'True'" do
#      row = Institution.find_by(facility_code: @csv_rows[all_nos][:facility_code])
#      @bools.each { |bool| expect(row[bool]).to be_falsy }
#    end

#    it "are false when csv is nil" do
#      row = Institution.find_by(facility_code: @csv_rows[all_nils][:facility_code])
#      @bools.each { |bool| expect(row[bool]).to be_falsy }
#    end
#  end

#  describe 'floats' do
#    before(:all) do @floats = get_column_type(:float) end

#    let(:all_valid_floats) { 3 }
#    let(:no_valid_floats) { 4 }
#    let(:valid_float_value) { 1234.5 }

#    it "valid strings are floats" do
#      row = Institution.find_by(facility_code: @csv_rows[all_valid_floats][:facility_code])
#      @floats.each { |float| puts "@@@@@@@@@@@@ #{float}"; expect(row[float]).to eq(valid_float_value) }
#      end

#    it "invalid strings are 0" do
      #row = Institution.find_by(facility_code: @csv_rows[no_valid_floats][:facility_code])
      #@floats.each { |float| expect(row[float]).to be_zero }
#    end
#  end
# end



#     describe 'Integers' do
#       before(:all) do @ints = get_column_type(:integer) end

#       let(:all_valid_ints) { 5 }
#       let(:no_valid_ints) { 6 }
#       let(:valid_int_value) { 12345 }

#       it "valid strings are ints" do
#        row = Institution.find_by(facility_code: @csv_rows[all_valid_ints][:facility_code])
#         @ints.each { |int| expect(row[int]).to eq(valid_int_value) }
#       end

#       it "invalid strings are 0" do
#         row = Institution.find_by(facility_code: @csv_rows[no_valid_ints][:facility_code])
#         @ints.each { |int| expect(row[int]).to be_zero }
#       end
#     end

#     describe 'Strings' do
#       let(:all_valid_strs) { 7 }
#       let(:no_valid_strs) { 8 }
#       let(:valid_str_value) { "A STRING" }
#       let(:strings) { ['ope', 'student_veteran_link', 'vetsuccess_name']}
 
#       it "valid strings are strings" do
#         row = Institution.find_by(facility_code: @csv_rows[all_valid_strs][:facility_code])
#         strings.each { |str| expect(row[str]).to eq(valid_str_value) }
#       end

#       it "invalid strings are blank" do
#         row = Institution.find_by(facility_code: @csv_rows[no_valid_strs][:facility_code])
#         strings.each { |int| expect(row[int]).to be_blank }
#       end
#     end

#     describe 'a zip code' do
#       it 'is 5 digits long' do
#         expect(Institution.first.zip.length).to eql(5)
#       end
#     end
#   end

#   context 'creation of institution types' do
#     it 'unique csv types matches db institution_types' do 
#       types = @csv_rows.map { |row| row[:type] }.uniq
#       expect(types).to match_array(InstitutionType.pluck(:name))
#     end
#   end
