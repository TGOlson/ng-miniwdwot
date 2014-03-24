class Organizations::SessionsController < ApplicationController

  def create

    email = params[:email]
    token = params[:token]

    organization = Organization.find_or_create email, token

    render json: { success: true, organization: organization }
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
