class Map < ActiveRecord::Base
  
  belongs_to :group
  has_many   :properties

  def self.fetch_from_source_by_group(group_id, token)
    options = { body: { token: token } }

    response = HTTParty.get("http://sitecontrol.us/groups/#{group_id}/maps.json", options)
    maps = JSON.parse(response.body)

    maps.map do |map_info|
      find_or_create map_info, group_id
    end
  
  end

  def self.find_or_create(map_info, group_id)
    if map = self.find_by_id(map_info['id'])
      map
    else
      self.create id: map_info['id'], name: map_info['name'], group_id: group_id
    end
  end

end
