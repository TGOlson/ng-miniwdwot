module OrganizationsHelper

  def find_org_with_groups_by_id(id)
    Organization.includes(:groups).find_by_id id
  end

  def current_token?
    @organization.token == params[:organization][:token]
  end

  def render_error
    render json: {
      failure: true,
      message: 'Could be a bad token.'
    }
  end

  def render_organization_as_json
    render json: @organization, include: :groups
  end
end
