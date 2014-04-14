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
      property = self.create filtered_attrs(property_info)
      property.generate_streetview_url
      property
    end
  end

  def self.filtered_attrs(info)
    {
      fid:     info['fid'],
      address: info['address'],
      zip:     info['zip'],
      city:    info['ownercity'],
      state:   info['ownerstate'],
      tags:    info['tags']
    }
  end

  def self.empty_set
    self.create address: :empty_set
  end

  def generate_streetview_url

     options = {
       :size     => '700x400',
       :location => "#{self.address}, #{self.city}",
       :fov      => 90,
       :pitch    => 10,
       :sensor   => false,
       :key      => 'AIzaSyDJruY1kNOZhiw4dJFpVa-1UgyZ1pcS_MI'
     }

    url = "http://maps.googleapis.com/maps/api/streetview?#{options.to_query}"

    self.streetview_url = url
    self.save

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
