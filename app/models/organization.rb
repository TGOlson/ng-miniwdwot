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

  def self.find_or_create(email, token)

    unless organization = Organization.find_by_email(email)

      organization = Organization.new email: email, token: token #, contact_email: email
      organization.contact_email = email
      organization.save
    end

    organization
  end
end
