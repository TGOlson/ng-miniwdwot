    # t.string   "address"
    # t.string   "zip"
    # t.string   "city"
    # t.string   "parcelnumb"
    # t.integer  "fid"
    # t.string   "state"
    # t.datetime "created_at"
    # t.datetime "updated_at"
    # t.boolean  "featured",   default: false
    # t.string   "latitude"
    # t.string   "longitude"

class Property < ActiveRecord::Base
  belongs_to :map

  def self.fetch_from_source_by_map(map_id, token)

    group_slug = 'mike-evans-world'

    options = { body: 
        { 
            token: token,
            only_tagged: 1 
        } 
    }

    response = HTTParty.get("http://#{group_slug}.sitecontrol.us/maps/#{map_id}/list.json", options)

    properties = JSON.parse(response.body)['features'].map{ |info| info['properties'] }


    # return empty property to stop repeated queries
    return create_property_for_empty_set(map_id) if properties.empty?

    properties.map do |property|
        self.find_or_create property, map_id
    end

  end


  def self.find_or_create(property_info, map_id)
    if property = self.find_by_id(property_info['fid'])
      property
    else
      self.create id: property_info['fid'], address: property_info['address'], map_id: map_id
    end
  end

  def self.create_property_for_empty_set(map_id)
    self.create address: :empty_set, map_id: map_id
  end

end
