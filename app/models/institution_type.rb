# frozen_string_literal: true
class InstitutionType < ActiveRecord::Base
  has_many :institutions, inverse_of: :institution_type

  validates :name, presence: true
  validates :name, uniqueness: true

  TYPES = {
    'public' => 'Public', 'ojt' => 'On The Job Training',
    'for profit' => 'For Profit', 'private' => 'Private',
    'flight' => 'Flight', 'correspondence' => 'Correspondence',
    'foreign' => 'Foreign'
  }.freeze

  #############################################################################
  ## school_type_display
  #############################################################################
  def display
    InstitutionType::TYPES[name]
  end
end
