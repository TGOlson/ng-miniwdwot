module OrganizationsHelper

  def current_token?
    @organization.token == params[:organization][:token]
  end

  def render_error
    render json: {
      success: false,
      message: 'Could be a bad token.'
    }
  end

  def render_organization_as_json
    render json: { 
      success: true, 
      organization: @organization 
    }
  end
end
