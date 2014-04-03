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


  def self.find_or_create(property_info)
    if property = self.find_by_fid(property_info['fid'])
      property
    else
      self.create filtered_attrs(property_info)
      # self.create fid: property_info['fid'], address: property_info['address'], city: D
    end
  end

  def self.filtered_attrs(info)
    {
      fid:        info['info'],
      address:    info['address'],
      zip:        info['zip'],
      ownercity:  info['ownercity'],
      ownerstate: info['ownerstate'],
      tags:       info['tags']
    }
  end

  def self.empty_set
    self.create address: :empty_set
  end

end


# {"OGR_FID"=>240268,
#  "parcelnumb"=>"08003146.",
#  "address"=>"1945 GLYNN CT",
#  "zip"=>"48206",
#  "ownername1"=>"CARTER,
#  DIANE",
#  "buildings"=>4,
#  "ownerstree"=>"1945 GLYNN CT",
#  "ownercity"=>"DETROIT",
#  "ownerstate"=>"MI",
#  "fid"=>240268,
#  "classes"=>"parcel",
#  "dataset"=>"sitecontrol",
#  "tags"=>["cookies"]}
