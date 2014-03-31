require 'spec_helper'

describe MapsController do
  
  let!(:group)          { create(:group)          }
  let!(:map)            { create(:map)            }
  let!(:organization)   { create(:organization)   }

  let!(:setup) do
    group.maps << map
    group.organization = organization
    group.save
  end

  describe "GET #index" do
    it "should return a list of maps for a given group if they exist" do
      expect{
        get :index, group_id: group.id
      }.to change{ Group.count }.by 0
      
      expect(response.body).to eq [map].to_json
      expect(response.body).to eq group.maps.to_json
    end

    xit "should fetch a list of maps for a given group if they do exist" do
      group.maps = []

      # need to make http party call here

      expect{
        get :index, group_id: group
      }.to change{ Group.count }.by 1
      
      # expect(response.body).to eq [map].to_json
      # expect(response.body).to eq group.maps.to_json
    end


  end


end
