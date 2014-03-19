class Organizations::SessionsController < ApplicationController

  before_filter :authenticate_organization!, only: [:destroy]

  def new

    if current_organization
      redirect_to organization_path current_organization
    end

    @organization = Organization.new
  end

  def create
    credentials = params[:organization]

    options = { body: credentials }

    response = HTTParty.get('http://whydontweownthis.com/users/sign_in.json', options)

    if response.parsed_response['status'] == 'ok'

      organization = Organization.find_or_create credentials[:email], response.parsed_response['token']

      sign_in(organization)

      redirect_to organization_path(organization)
    else

      flash[:alert] = 'Invalid email or password.'
      redirect_to sign_in_path
    end

  end

  def destroy
    sign_out
    redirect_to root_path
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