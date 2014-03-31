class GroupsController < ApplicationController
  
  def index
    @groups = Group.where organization_id: params[:organization_id]
    render json: @groups
  end

end
