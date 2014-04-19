class PropertiesController < ApplicationController

  def index
    properties = Map.fetch_properties params[:map_id]
    render json: properties
  end

  def show
    property = Property.find_by_fid params[:id]
    render json: property
  end

  def update
    property = Property.find_by_fid params[:property_id]
    p '*' * 80
    p property_params
    property.update_attributes property_params
    render json: property
  end

  private

  def property_params
    params.require(:property).permit!
  end
end
