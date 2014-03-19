class AddColumnAboutToOrgs < ActiveRecord::Migration
  def change
    add_column :organizations, :about, :string, default: 'This is my organization.'
  end
end
