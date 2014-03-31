class MapsController < ApplicationController

  def index
    @group = Group.find params[:group_id]

    # @maps = @g÷roup.maps

    if @group.maps.empty?
      @group.maps = @group.fetch_maps_from_source params[:token]
    end

    render json: @group.maps
  end

end
