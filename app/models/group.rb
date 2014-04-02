class Group < ActiveRecord::Base
 
  belongs_to :organization
  has_many :maps

  def self.fetch_maps(id)

    group = Group.find id
    
    if group.maps.empty?
      group.maps = group.fetch_maps_from_source
    end

    group.maps
  end

  def fetch_maps_from_source
    
    options = { 
      body: { 
        token: self.organization.token 
        } 
      }

    response = HTTParty.get("http://sitecontrol.us/groups/#{self.id}/maps.json", options)
    
    maps = JSON.parse(response.body)

    maps.map do |map_info|
      Map.find_or_create map_info
    end
  
  end

  def self.find_or_create_by_batch(groups)
    groups.map { |group| find_or_create(group) }
  end

  def self.find_or_create(group_info)

    unless group = self.find_by_id(group_info[:id])
      group = self.create group_info
    end  

    group
  end

end
