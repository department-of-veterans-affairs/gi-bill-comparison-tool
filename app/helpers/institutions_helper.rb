# frozen_string_literal: true
module InstitutionsHelper
  def compare_downcase(v1, v2)
    v1 = v1.try(:downcase)
    v2 = v2.try(:downcase)

    v1 == v2
  end

  def to_caps(string)
    string.blank? ? '' : string.split(' ').map(&:capitalize).join(' ')
  end

  def number?(v)
    return false if v.blank?

    !(v.to_s =~ /\A[-+]?[0-9]*\.?[0-9]+\Z/).nil?
  end

  def format_number_or_null(v, what)
    if number?(v)
      what = v == 1 ? what : what.pluralize
      number_with_delimiter(v) + ' ' + what
    elsif v.blank?
      pluralize(0, what)
    else
      what + " #{v}"
    end
  end

  def format_pct_or_null(v)
    if number?(v)
      number_with_precision(v, precision: 2)
    elsif v.blank?
      0
    else
      v
    end
  end

  def to_school_size(size)
    return 'Unknown' if size.blank?

    if size <= 2000
      'Small'
    elsif size <= 15_000
      'Medium'
    else
      'Large'
    end
  end
end
