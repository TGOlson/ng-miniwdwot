class AddGeometryProps < ActiveRecord::Migration
  def change
    add_column :properties, :geometry, :string, array: true, default: '{}'
  end
end
