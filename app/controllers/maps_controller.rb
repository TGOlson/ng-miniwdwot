class MapsController < ApplicationController

  def index

    @maps = Map.where group_id: params[:group_id]

    if @maps.empty?
      p '*' * 80
      p 'maps empty'
      Map.fetch_from_source_by_group params[:group_id], params[:token]
    end

    render json: @maps
  end

end
