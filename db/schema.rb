# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140423012759) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "groups", force: true do |t|
    t.integer  "organization_id"
    t.string   "name"
    t.string   "token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "maps", force: true do |t|
    t.integer  "group_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "organizations", force: true do |t|
    t.string   "token"
    t.string   "email"
    t.string   "name",             default: "My Organization"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "display_group_id"
    t.integer  "display_map_id"
    t.string   "logo_url",         default: "http://makeloveland.com/images/graphic-09.png"
    t.string   "contact_email"
    t.string   "about",            default: "This is my organization."
    t.string   "color_scheme",     default: "default"
  end

  create_table "properties", force: true do |t|
    t.integer  "map_id"
    t.string   "address"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "fid"
    t.string   "zip"
    t.string   "city"
    t.string   "state"
    t.string   "tags",           default: [],    array: true
    t.string   "streetview_url"
    t.boolean  "featured",       default: false
    t.string   "geometry",       default: [],    array: true
  end

end
