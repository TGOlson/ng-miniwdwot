class MapsController < ApplicationController

  def index
    maps = Group.fetch_maps params[:group_id]
    render json: maps
  end

end
