module InstitutionsHelper
  def to_caps(string)
    string.blank? ? '' : string.split(' ').map{|w| w.capitalize}.join(' ')
  end

  def to_bool(val)
    %w(yes true t 1).include?(val.to_s)
  end

  def is_number?(v)
    !(v.to_s =~ /\A[-+]?[0-9]*\.?[0-9]+\Z/).nil?
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

  def format_pct_or_null(v)
    if is_number?(v)
      number_with_precision(v, precision: 2)
    elsif v.blank?
      0
    else
      v
    end
  end
end
