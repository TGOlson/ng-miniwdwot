# id: 1,

# -sign in necessary
# token: "3j9a51qrtfvfHiVsthXt",
# email: "tydotg@gmail.com",


# - editable project fields
# name: nil,
# logo_file_name: "1016372_10151672011962733_144331186_n.jpg",
# logo_content_type: "image/jpeg",
# logo_file_size: 99569,
# logo_updated_at: "2014-03-13
# contact_email: nil,
# settings: nil,

# - settings for display
# group_id: 1,
# map_id: 9,


# created_at: "2014-03-13 03:46:30",
# updated_at: "2014-03-13 04:08:23",

class Organization < ActiveRecord::Base

  validates_presence_of :token, :email

  has_many :groups

  def self.create_with_groups(params)

    organization = Organization.new

    # prefer explicit callouts due to cockatil of params
    organization.email         = params[:email]
    organization.token         = params[:token]
    organization.contact_email = params[:email]
    organization.id            = params[:id]
    organization.groups        = find_or_create_groups params[:groups]

    organization.save
  end

  def self.find_or_create_groups(groups)
    Group.find_or_create_by_batch groups
  end

end
