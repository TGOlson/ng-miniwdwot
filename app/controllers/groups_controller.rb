class GroupsController < ApplicationController
  
  def index
    @groups = Organization.find_by_id(params[:organization_id]).groups
    render json: @groups
  end

end