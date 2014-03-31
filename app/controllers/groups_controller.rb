class GroupsController < ApplicationController
  
  def index
    @groups = Group.find_all_by_organization_id params[:organization_id]
    
    if @groups.empty?
      p '*' * 80
      p 'No groups were found'
      # should be set upon sign-in
      # consider creating an option to update groups
      
      # @groups = Group.fetch_groups_by_org params[:organization_id]
    end

    render json: @groups
  end

end