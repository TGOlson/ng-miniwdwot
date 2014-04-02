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
    if property = self.find_by_id(property_info['fid'])
      property
    else
      self.create id: property_info['fid'], address: property_info['address']
    end
  end

  def self.empty_set
    self.create address: :empty_set
  end

end
