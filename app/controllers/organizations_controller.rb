class OrganizationsController < ApplicationController

  def index
    @organizations = Organization.all
    render json: @organizations
  end

  def show
    @organization = Organization.find params[:id]
    render json: @organization
  end

  def sign_in
    @organization = Organization.find_or_create params[:organization]
    render json: @organization          
  end

  def update
    @organization = Organization.find params[:id]

    if current_token?
      p 'updating'
      @organization.update_attributes organization_params
      p @organization
      render json: @organization      
    else
      render_error
    end
  end

  def destroy
    @organization = Organization.find params[:id]

    if current_token?
      @organization.destroy
      render json: @organization      
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
