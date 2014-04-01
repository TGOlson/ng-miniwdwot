class PropertiesController < ApplicationController

  def index
    map = Map.find params[:map_id]

    # properties = map.properties

    if @map.properties.empty?
      @map.properties = @map.fetch_properties_from_source
    end

    render json: @map.properties
  end

end
