class PropertiesController < ApplicationController

  def index
    properties = Map.fetch_properties params[:map_id]
    render json: properties
  end

end
