class Organizations::SessionsController < ApplicationController

  def create

    # email, password
    credentials = params[:organization]

    options = { body: credentials }

    response = HTTParty.get('http://whydontweownthis.com/users/sign_in.json', options)

    if response.parsed_response['status'] == 'ok'

      organization = Organization.find_or_create credentials[:email], response.parsed_response['token']

      render json: { success: true, organization: organization }
    else
      render json: { success: false }
    end

  end
end

  # def self.connect(email, password)


  #   if response.parsed_response['status'] == 'ok'

  #     org = Organization.new(:email => email, :token => response.parsed_response['token'])

  #     org.save

  #     response.parsed_response['groups'].each do |group|
  #       Group.create(:group_id => group['id'], :name => group['name'], :token => group['token'])
  #     end

  #   end
  # end
