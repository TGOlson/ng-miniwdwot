class MapsController < ApplicationController

  def index
    @group = Group.find params[:group_id]

    p 'printing from index'
    p @group

    @maps = @group.maps

    if @maps.empty?

      p 'maps empty'

      p @group.organization

      options = {
        body: {
          token: @group.organization.token
        }
      }

      response = HTTParty.get("http://sitecontrol.us/groups/#{@group.id}/maps.json", options) #, { group_id: '@group_id' });

      @maps = JSON.parse(response.body)

      @maps.each do |map|
        @group.maps << Map.create(id: map['id'], name: map['name'])
      end

    end

    render json: @group.maps
  end

end
