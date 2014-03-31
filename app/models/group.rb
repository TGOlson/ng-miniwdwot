class Group < ActiveRecord::Base
 
  belongs_to :organization
  has_many :maps

  def self.find_or_create_by_batch(groups)
    groups.map { |group| find_or_create(group) }
  end


  def self.find_or_create(group_info)

    unless group = self.find_by_id(group_info[:id])
      group = self.create group_info
    end  

    group
  end


  def fetch_maps_from_source(token)
    options = { body: { token: token } }

    response = HTTParty.get("http://sitecontrol.us/groups/#{self.id}/maps.json", options)
    
    maps = JSON.parse(response.body)

    maps.map do |map_info|
      Map.find_or_create map_info
    end
  
  end

  # def self.find_or_create(map_info, group_id)
  #   if map = self.find_by_id(map_info['id'])
  #     map
  #   else
  #     self.create id: map_info['id'], name: map_info['name'], group_id: group_id
  #   end
  # end
  # def fetch_groups_from_org_id(org_id)
  #   organization = Organization.find_by_id org_id

  #     options = {
  #       body: {
  #         token: organization.token
  #       }
  #     }

  #   response = HTTParty.get("http://sitecontrol.us/groups/#{@group.id}/maps.json", options)

  #   #   return $resource('/organizations/:id', { id: '@id' },
  #   # { update: { method: "PUT" } });

  # end

end
