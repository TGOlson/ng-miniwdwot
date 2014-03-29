module OrganizationsHelper

  def current_token?
  
    if @organization.token == params[:token]
      return true
    else
      render_error
    end
  
  end

  def render_error
    render json: {
      success: false,
      message: 'Could be a bad token.'
    }
  end
end
