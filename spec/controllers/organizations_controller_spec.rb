require 'spec_helper'

describe OrganizationsController do

  let!(:organization){ create(:organization) }

  describe "GET #index" do
    it "should return a list of all organizations" do
      get :index
      expect(assigns(:organizations)).to eq [organization]
    end
  end

  describe "GET #show" do
    it "should return a list of all organizations" do
      get :show, id: organization.id
      expect(assigns(:organization)).to eq organization
    end
  end

end
