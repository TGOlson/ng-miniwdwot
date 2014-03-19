class AddColumnsOrganizations < ActiveRecord::Migration
  def change
    change_table :organizations do |t|
      t.column :display_group_id, :integer
      t.column :display_map_id,   :integer
      t.column :logo_url,          :string
      t.column :contact_email,    :string
    end
  end
end
