require 'spec_helper'

describe OrganizationsController do

  let!(:organization) { create(:organization) }
  
  let(:org_params) do
    { id: organization.id, 
      token: organization.token,   
      organization: { 
        id: organization.id, 
        token: organization.token, 
        name: 'Cool', 
      } 
    }
  end

  let(:error_response) do
    { failure: true, message: 'Could be a bad token.' }.to_json
  end

  describe "GET #index" do
    it "should return a json list of all organizations" do
      get :index
      expect(response.body).to eq [organization].to_json
    end
  end

  describe "GET #show" do
    it "should return a json organization with groups" do
      get :show, id: organization.id
      expect(response.body).to eq organization.to_json
    end
  end

  describe "POST #verify" do
    it "should return an a false flag if org is already registered" do
      get :verify, organization: { id: organization.id }
      new_org = JSON.parse(response.body)['new_org']
      expect(new_org).to be_false
    end

    it "should return an a true flag if org is not already registered" do
      get :verify, organization: { id: 'abc', groups: [] }
      new_org = JSON.parse(response.body)['new_org']
      expect(new_org).to be_true
    end    
  end

  describe "PUT #update" do
    it "should update an organization with valid token" do
      put :update, org_params
      org_name = JSON.parse(response.body)['name']
      expect(org_name).to eq 'Cool'
    end

    it "should not update an organization without a valid token" do
      org_params.delete(:token)
      put :update, org_params
      expect(response.body).to eq error_response
    end
  end

  describe "DELETE #destroy" do
    it "should delete an organization with valid token" do
      expect{
        delete :destroy, org_params
      }.to change{ Organization.count }.by -1
    end

    it "should not delete an organization without a valid token" do
      org_params.delete(:token)

      expect{
        delete :destroy, org_params
      }.to change{ Organization.count }.by 0
    end
  end

end
