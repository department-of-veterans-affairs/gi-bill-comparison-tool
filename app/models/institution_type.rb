class InstitutionType < ActiveRecord::Base
  has_many :institutions, inverse_of: :institution_type

  validates_presence_of :name
  validates_uniqueness_of :name
end
