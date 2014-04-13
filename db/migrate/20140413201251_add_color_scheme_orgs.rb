class AddColorSchemeOrgs < ActiveRecord::Migration
  def change
    add_column :organizations, :color_scheme, :string, default: 'default'
  end
end
