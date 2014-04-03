class AddColumnsProps < ActiveRecord::Migration
  def change
    change_table :properties do |t|
      t.column :fid, :integer
      t.column :zip, :string
      t.column :ownercity, :string
      t.column :ownerstate, :string
      t.column :tags, :string, array: true, default: '{}'
    end
  end
end
