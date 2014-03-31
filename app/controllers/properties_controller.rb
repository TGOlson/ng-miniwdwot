class PropertiesController < ApplicationController

  def index
    @properties = Property.where map_id: params[:map_id]

    if @properties.empty?
      properties = Property.fetch_from_source_by_map params[:map_id], params[:token]
    end

    render json: @properties
  end

end