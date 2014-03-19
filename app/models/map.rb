class Map < ActiveRecord::Base

  belongs_to :group
  has_many   :properties

end
