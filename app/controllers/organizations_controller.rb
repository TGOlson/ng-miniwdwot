class OrganizationsController < ApplicationController

  def index
    @organizations = Organization.all

    respond_to do |format|
      format.html
      format.json { render json: @organizations }
    end
  end

  def show
    render json: Organization.find_by_id(params[:id])
  end

  def update
    @organization = Organization.find_by_id params[:id]

    @organization.update_attributes organization_params

    if current_token?
      render json: { success: true, organization: @organization }
    else
      render_error
    end
  end

  def destroy
    @organization = Organization.find_by_id params[:id]

    if current_token?
      @organization.destroy
      render json: { success: true, organization: @organization }
    else
      render_error
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
