class AddStreetviewUrlProps < ActiveRecord::Migration
  def change
    add_column :properties, :streetview_url, :string
  end
end
