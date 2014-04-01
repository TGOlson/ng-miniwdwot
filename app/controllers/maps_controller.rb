class MapsController < ApplicationController

  def index
    group = Group.find params[:group_id]

    if group.maps.empty?
      group.maps = group.fetch_maps_from_source
    end

    render json: group.maps
  end

end
