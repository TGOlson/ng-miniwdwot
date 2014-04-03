class AddColumnsProps < ActiveRecord::Migration
  def change
    change_table :properties do |t|
      t.column :fid, :integer
      t.column :zip, :string
      t.column :city, :string
      t.column :state, :string
      t.column :tags, :string, array: true, default: '{}'
    end
  end
end
