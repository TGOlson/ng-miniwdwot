class Map < ActiveRecord::Base

  belongs_to :group
  has_many   :properties

  def self.fetch_properties(id)

    map = Map.find id

    if map.properties.empty?
      map.properties = map.fetch_properties_from_source
    end

    map.properties
  end

  def fetch_properties_from_source

    options = {
      body: {
        token: self.group.organization.token,
        only_tagged: 1
        }
      }

    group_slug = self.group.name.to_slug.normalize.to_s

    url = "http://#{group_slug}.sitecontrol.us/maps/#{self.id}/list.json"

    response = HTTParty.get(url, options)

    properties = JSON.parse(response.body)['features']

    return [Property.empty_set] if properties.empty?

    properties.map do |property_info|
      Property.find_or_create property_info
    end

  end

  def self.find_or_create(map_info)
    if map = self.find_by_id(map_info['id'])
      map
    else
      self.create id: map_info['id'], name: map_info['name']
    end
  end

end
