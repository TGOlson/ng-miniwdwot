require 'spec_helper'

describe OrganizationsController do

  let!(:organization) { create(:organization) }
  
  let(:org_params) do
    { id: organization.id, 
      organization: { 
        id: organization.id, 
        token: organization.token, 
        name: 'Cool', 
      } 
    }
  end

  let(:org_as_json) do 
    { success: true, organization: organization }.to_json
  end

  let(:error_response) do
    { success: false, message: 'Could be a bad token.' }.to_json
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
      expect(response.body).to eq organization.to_json(include: :groups)
    end
  end

  describe "POST #sign_in" do
    it "should return an organization if the org is already registered" do
      post :sign_in, organization: { id: organization.id }
      expect(response.body).to eq org_as_json     
    end

    it "should return a new organization if the org is not already registered" do
      post :sign_in, organization: { id: 1, groups: [] }
      expect(response.body).to_not eq org_as_json     
      expect(JSON.parse(response.body)['organization']['id']).to eq 1     
    end    
  end

  describe "PUT #update" do
    it "should update an organization with valid token" do
      put :update, org_params
      expect(response.body).to eq org_as_json
    end

    it "should not update an organization without a valid token" do
      org_params[:organization].delete(:token)
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
      org_params[:organization].delete(:token)

      expect{
        delete :destroy, org_params
      }.to change{ Organization.count }.by 0
    end
  end

end
