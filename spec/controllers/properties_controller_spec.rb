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
    it "should return a list of for a given map if they exist" do
      expect{
        get :index, { map_id: map.id, token: organization.token }
      }.to change{ Property.count }.by 0
      
      expect(response.body).to eq [property].to_json
      expect(response.body).to eq map.properties.to_json
    end
  end

end
