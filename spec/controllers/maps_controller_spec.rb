require 'spec_helper'

describe MapsController do
  
  let(:group)          { create(:group)          }
  let(:map)            { create(:map)            }
  let(:organization)   { create(:organization)   }
  let(:map_parmas)     { { id: 'a', name: 'b' }  }

  let!(:setup) do
    group.maps << map
    group.organization = organization
    group.save
  end

  describe "GET #index" do
    it "should return a list of maps for a given group if they exist" do
      expect{
        get :index, { group_id: group.id, token: organization.token }
      }.to change{ Map.count }.by 0
      
      expect(response.body).to eq [map].to_json
      expect(response.body).to eq group.maps.to_json
    end

    it "should fetch a list of maps for a given group if they do exist" do
      group.maps = []

      # need to make http party call here
      allow(HTTParty).to receive(:get).and_return( response )
      allow(response).to receive(:body).and_return( [map_parmas].to_json )


      expect{
        get :index, { group_id: group.id, token: organization.token }
      }.to change{ Map.count }.by 1
    end
  end

end
