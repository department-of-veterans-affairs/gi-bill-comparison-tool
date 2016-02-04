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

    trait :in_new_rochelle do
      city "new rochelle"
      state "ny"
      country "usa"    
    end

    trait :in_chicago do
      city "chicago"
      state "il"
      country "usa"    
    end

    trait :uchicago do
      institution "university of chicago - not in chicago"
      city "some other city"
      state "il"
      country "usa"       
    end

    trait :start_like_harv do
      sequence :institution do |n| ["harv#{n}", "harv #{n}"].sample end
      city "boston"
      state "ma"
      country "usa"
    end

    trait :contains_harv do
      sequence :institution do |n| ["hasharv#{n}", "has harv #{n}"].sample end
      city "boston"
      state "ma"
      country "usa"    
    end
  end
end
