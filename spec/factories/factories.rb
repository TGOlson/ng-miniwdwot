FactoryGirl.define do
  factory :organization do
    token 'abcd123'
    email 'ty@ty.co'
    # name
  end
end


FactoryGirl.define do
  factory :group do
    # name
  end
end


FactoryGirl.define do
  factory :map do
    name "A map"
  end
end


FactoryGirl.define do
  factory :property do
    address "123 Somewhere"
  end
end