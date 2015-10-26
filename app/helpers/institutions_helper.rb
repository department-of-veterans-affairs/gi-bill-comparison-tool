module InstitutionsHelper
  def to_caps(string)
    string.blank? ? '' : string.split(' ').map{|w| w.capitalize}.join(' ')
  end

  def to_bool(val)
    %w(yes true t 1).include?(val.to_s)
  end

  def is_number?(v)
    v =~ /\A[-+]?[0-9]*\.?[0-9]+\Z/
  end

  def format_number_or_null(v, what) 
    if is_number?(v)
      what = v == 1 ? what : what.pluralize
      number_with_delimiter(v) + " " + what
    elsif v.blank?
      pluralize(0, what)
    else
      what + " #{v}"
    end
  end
end
