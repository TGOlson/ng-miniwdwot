class OrganizationMailer < ActionMailer::Base
  default from: "from@example.com"

  def property_inquiry(email)
    @email = email

    mail(to: @email[:to], from: @email[:from], subject: @email[:subject])    
  end
end
