module OrganizationsHelper
  def current_token?
    @organization.token == params[:token]
  end
end
