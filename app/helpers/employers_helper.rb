module EmployersHelper

  def lucrative?(employer)
    total = 0
    employer.checks.each do |check|
      total += check.amount
    end
    if total > 600
      true
    else
      false
    end
  end
end
