module OrganizationsHelper

  def render_error

    render json: {
      success: false,
      message: 'Could be a bad token.'
    }

  end

  def current_token?
    @organization.token == params[:token]
  end
end
