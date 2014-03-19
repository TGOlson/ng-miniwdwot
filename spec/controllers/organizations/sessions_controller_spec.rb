require 'spec_helper'

describe Organizations::SessionsController do

  include ActionView::Helpers

  describe "GET #new" do
    it "should return a new instance of organization" do
      get :new
      expect(assigns(:organization)).to be_an_instance_of Organization
    end
  end

  describe "POST #create" do
    it "should validate password and email" do
      post :create, organization: { email: 'tydotg@gmail.com', password: 'password'}
      expect(OrganizationsHelper.current_organization).to be_nil
    end
  end

end