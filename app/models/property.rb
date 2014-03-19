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

end
