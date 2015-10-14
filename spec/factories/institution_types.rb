FactoryGirl.define do
  factory :institution_type do
    sequence :name do |n| "Institution Type #{n}" end
  end
end
