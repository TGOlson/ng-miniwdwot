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

end
