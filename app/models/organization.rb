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
