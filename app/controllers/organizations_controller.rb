class OrganizationsController < ApplicationController

  def index
    @organizations = Organization.all
    render json: @organizations
  end

  def show
    @organization = Organization.find params[:id]
    render json: @organization
  end

  def verify

    if Organization.find_by_id params[:organization][:id]
      render json: { new_org: false }
    else
      Organization.create_with_groups params[:organization]
      render json: { new_org: true }
    end
  end

  def update
    @organization = Organization.find params[:id]

    # if current_token?
      @organization.update_attributes organization_params
      render json: @organization
    # else
      # render_error
    # end
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
        :logo_url,
        :color_scheme
      )
  end
end
