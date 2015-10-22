module InstitutionsHelper
  def to_caps(string)
    string.blank? ? '' : string.split(' ').map{|w| w.capitalize}.join(' ')
  end

  def to_bool(val)
    %w(yes true t 1).include?(val.to_s)
  end
end
