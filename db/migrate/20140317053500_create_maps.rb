class CreateMaps < ActiveRecord::Migration
  def change
    create_table :maps do |t|
      t.belongs_to :group
      t.string     :name

      t.timestamps
    end
  end
end
