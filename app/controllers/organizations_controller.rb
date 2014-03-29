class OrganizationsController < ApplicationController

  def index
    @organizations = Organization.all
    render json: @organizations
  end

  def show
    organization = Organization.includes(:groups).find_by_id(params[:id])
    render json: organization.to_json(include: :groups)
  end

  def sign_in
    @organization = Organization.find_or_create params[:organization]
    render_organization_as_json          
  end

  def update
    @organization = Organization.find_by_id params[:id]

    if current_token?
      @organization.update_attributes organization_params
      render_organization_as_json      
    else
      render_error
    end
  end

  def destroy
    @organization = Organization.find_by_id params[:id]

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
