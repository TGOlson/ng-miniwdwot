module OrganizationsHelper

  def current_organization
    Organization.find_by_id session[:organization_id]
  end

  def sign_in(organization)

    flash[:notice] = 'Sign in successful.'

    session[:organization_id] = organization.id
  end

  def sign_out
    flash[:notice] = 'Sign out successful.'

    session.delete(:organization_id)
  end

  def authenticate_organization!

    unless current_organization
      flash[:alert] = 'Please sign in before attempting that action.'

      redirect_to sign_in_path
    end

  end
end