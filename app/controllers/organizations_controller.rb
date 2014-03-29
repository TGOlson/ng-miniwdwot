class OrganizationsController < ApplicationController

  def index
    @organizations = Organization.all
    render json: @organizations
  end

  def show
    @organization = find_org_with_groups_by_id params[:id]
    render_organization_as_json
  end

  def sign_in
    @organization = Organization.find_or_create params[:organization]
    render_organization_as_json          
  end

  def update

    p '*' * 80
    p params

    @organization = find_org_with_groups_by_id params[:id]

    if current_token?
      @organization.update_attributes organization_params
      render_organization_as_json      
    else
      render_error
    end
  end

  def destroy
    p '*' * 80
    p params
    @organization = find_org_with_groups_by_id params[:id]


    if current_token?
      @organization.destroy
      render_organization_as_json      
    else
      render_error
    end
  end


  private

  def organization_params
    params
      .permit(
        :organization
        )
      .permit(
        :name,
        :contact_email,
        :about,
        :display_group_id,
        :display_map_id,
        :logo_url
      )
  end
end
