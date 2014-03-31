module OrganizationsHelper
  def current_token?
    @organization.token == params[:token]
  end

  def render_error
    render json: {
      failure: true,
      message: 'Could be a bad token.'
    }
  end
end
