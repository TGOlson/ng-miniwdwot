class AddDefaultLogoUrl < ActiveRecord::Migration
  def change
    change_column :organizations, :logo_url, :string, default: 'http://makeloveland.com/images/graphic-09.png'
  end
end
