class OrganizationsController < ApplicationController

  def index
    @organizations = Organization.all

    respond_to do |format|
      format.html
      format.json { render json: @organizations }
    end
  end

  def show
    @organization = Organization.find_by_id params[:id]

    respond_to do |format|
      format.html
      format.json { render json: @organization }
    end
  end

  def update
    @organization = Organization.find_by_id params[:id]

    @organization.update_attributes organization_params

    if current_token?
      render json: { success: true, organization: @organization }
    else
      render json: { success: false }
    end
  end

  def destroy
    @organization = Organization.find_by_id params[:id]

    if current_token?
      @organization.destroy
      render json: { success: true, organization: @organization }
    else
      render json: { success: false }
    end
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
