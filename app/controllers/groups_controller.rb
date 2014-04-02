class GroupsController < ApplicationController
  
  def index
    groups = Organization.find(params[:organization_id]).groups
    render json: groups
  end

end
