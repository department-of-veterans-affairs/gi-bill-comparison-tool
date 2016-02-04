FactoryGirl.define do
  factory :institution do
    association :institution_type

    sequence :facility_code do |n| "facility code #{n}" end
    sequence :institution do |n| "institution #{n}" end
    sequence :country do |n| "country #{n}" end

    trait :in_nyc do
      city "new york"
      state "ny"
      country "usa"
    end

    trait :in_chicago do
      city "chicago"
      state "il"
      country "usa"    
    end

    trait :like_harv do
      sequence :institution do |n| ["harv#{n}", "harv #{n}"].sample end
      city "boston"
      state "ma"
      country "usa"
    end
  end
end
