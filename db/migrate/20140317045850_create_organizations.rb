class CreateOrganizations < ActiveRecord::Migration
  def change
    create_table :organizations do |t|
      t.string :token
      t.string :email
      t.string :name, default: 'My Organization'

      t.timestamps
    end
  end
end
