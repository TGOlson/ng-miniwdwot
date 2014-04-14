class AddFeaturedColProps < ActiveRecord::Migration
  def change
    add_column :properties, :featured, :boolean, default: false
  end
end
