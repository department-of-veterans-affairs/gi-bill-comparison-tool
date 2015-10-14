FactoryGirl.define do
  factory :institution do
    institution_type

    sequence :facility_code do |n| "#{n}" end
    sequence :institution do |n| "Institution #{n}" end

    country "USA"
    city "anytown"
    state "NY"
    zip '10001'
    poe true
    yr true
    student_veteran true
    eight_keys true
    sec_702 true
    dodmou true
    online_all true
    accredited true
    hcm_status true
  end
end
