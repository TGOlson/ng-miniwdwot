class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.belongs_to :organization
      t.string     :name
      t.string     :token

      t.timestamps
    end
  end
end
