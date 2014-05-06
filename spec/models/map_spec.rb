require 'spec_helper'

describe Map do

  it { should belong_to :group }
  it { should have_many :properties }

  
  let(:group)          { create(:group)          }
  let(:organization)   { create(:organization)   }
  let(:map_params)     { { id: 'a', name: 'b' }  }


  # describe "::fetch_from_source_by_group" do
  #   it "should fetch a list of maps for a given group" do
  #     group.maps = []

  #     # need to make http party call here
  #     allow(HTTParty).to receive(:get).and_return(Map)
  #     allow(Map).to receive(:body).and_return([map_params].to_json)

  #     expect{
  #       Map.fetch_from_source_by_group organization.token, group.id
  #     }.to change{ Map.count }.by 1
  #   end

  # end
end

# it "should fetch a list of properties for a given map if they do NOT exist" do
#   map.properties = []

#   allow(HTTParty).to receive(:get).and_return(response)
#   allow(response).to receive(:body).and_return(property_parmas.to_json )

#   expect{
#     get :index, { map_id: map.id, token: organization.token }
#   }.to change{ Property.count }.by 1
# end
