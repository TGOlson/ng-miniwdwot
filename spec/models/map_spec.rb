require 'spec_helper'

describe Map do

  it { should belong_to :group }
  it { should have_many :properties }

  
  let(:map)            { create(:map)            }
  let(:property)       { create(:property)       }
  let(:group)          { create(:group)          }
  let(:organization)   { create(:organization)   }
  let(:map_params)     { { id: 'a', name: 'b' }  }


  describe "::fetch_properties" do
    it "should return a property set for a map" do
      map.properties << property
      properties = Map.fetch_properties map.id
      expect(properties.first).to eq property
    end
  end

  describe "::fetch_properties_from_source" do
    it "should fetch a list of properties with an http call" do
      group.organization = organization
      map.group = group

      response = {}

      # need to make http party call here
      allow(HTTParty).to receive(:get).and_return(response)
      allow(response).to receive(:body).and_return({features: [property]}.to_json)
      allow(Property).to receive(:find_or_create).and_return(property)

      properties = map.fetch_properties_from_source
      
      expect(properties).to eq [property]
    end
  end

  describe "::find_or_create" do
    it "should return a map if ones exists" do
      found_map = Map.find_or_create 'id' => map.id
      expect(found_map).to eq map
    end

    it "should make a new map if one does not exist" do
      expect{
        Map.find_or_create 'id' => 'abc'
      }.to change{Map.count}.by 1
    end
  end
end
