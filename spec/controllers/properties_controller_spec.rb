require 'spec_helper'

describe PropertiesController do
  
  let(:property)        { create(:property)       }
  let(:map)             { create(:map)            }
  let(:organization)    { create(:organization)   }
  let(:property_parmas) do
    { features: 
      [{ properties:
        { id: 'a', address: 'b' } 
      }]
    }
  end

  let!(:setup) do
    map.properties << property
    property.map = map
    property.save
  end

  describe "GET #index" do
    it "should return a list of properties for a given map if they exist" do
      expect{
        get :index, { map_id: map.id, token: organization.token }
      }.to change{ Property.count }.by 0
      
      expect(response.body).to eq [property].to_json
      expect(response.body).to eq map.properties.to_json
    end

    it "should fetch a list of properties for a given map if they do NOT exist" do
      map.properties = []

      allow(HTTParty).to receive(:get).and_return(response)
      allow(response).to receive(:body).and_return(property_parmas.to_json )

      # properties = JSON.parse(response.body)['features'].map{ |info| info['properties'] }


      expect{
        get :index, { map_id: map.id, token: organization.token }
      }.to change{ Property.count }.by 1
    end
  end

end
