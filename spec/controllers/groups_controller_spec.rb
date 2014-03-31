require 'spec_helper'

describe GroupsController do

  let!(:organization) { create(:organization) }
  let!(:group) { create(:group) }
  let!(:org_group) { organization.groups << group }


  describe "GET #index" do
    it "should return an array of groups for an organization with existing groups" do
      expect{
        get :index, organization_id: organization.id
      }.to change{ Group.count }.by 0
      
      expect(response.body).to eq [group].to_json
      expect(response.body).to eq organization.groups.to_json
    end
  end
end
