class OrganizationsController < ApplicationController

  def index
    @organizations = Organization.all
    render json: @organizations
  end


  def show
    render json: Organization.find_by_id(params[:id])
  end


  def update
    @organization = Organization.find_by_id params[:id]

    if current_token?
      @organization.update_attributes organization_params
      render json: { success: true, organization: @organization }
    end
  end


  def destroy
    @organization = Organization.find_by_id params[:id]

    if current_token?
      @organization.destroy
      render json: { success: true, organization: @organization }
    end
  end


  def sign_in
    email = params[:email]
    token = params[:token]

    organization = Organization.find_or_create email, token
    render json: { success: true, organization: organization }
  end


  private

  def organization_params
    params.require(:organization)
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
