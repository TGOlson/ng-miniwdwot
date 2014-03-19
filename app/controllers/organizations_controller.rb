class OrganizationsController < ApplicationController
  respond_to :json

  before_filter :authenticate_organization!, only: [:edit, :update, :destroy]

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

  def properties
    @organization = Organization.find_by_id params[:organization_id]
  end

  def featured_properties
    @organization = Organization.find_by_id params[:organization_id]
  end

  def about
    @organization = Organization.find_by_id params[:organization_id]
  end

  def edit
    @organization = Organization.find_by_id params[:id]
  end

  def update
    @organization = Organization.find_by_id params[:id]

    @organization.update_attributes organization_params

    flash[:notice] = 'Organization successfully updated.'
    redirect_to organization_path @organization
  end

  def destroy
    @organization = Organization.find_by_id params[:id]
    @organization.destroy

    flash[:notice] = 'Organization successfully deleted.'
    redirect_to root_path
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
