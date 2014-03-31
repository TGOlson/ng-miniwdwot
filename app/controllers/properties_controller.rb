class PropertiesController < ApplicationController

  def index
    # @map = Map.find_by_id params[:id]
    @map = Map.includes(:properties).find_by_id(params[:map_id])

    if @map = Map.includes(:properties).find_by_id(params[:map_id])
      @properties = @map.properties

      if @properties
        render json: @properties
      end

    else
      render json: {status: 'No props'}
    end



  end

end