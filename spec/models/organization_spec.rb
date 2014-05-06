require 'spec_helper'

describe Organization do

  let!(:organization) { create(:organization) }
  let!(:group) { create(:group) }

  let(:org_params) do 
      { 
        id: 'a',
        token: 'b',
        email: 'c',
        groups: []
      }
  end

  it { should validate_presence_of :token }
  it { should validate_presence_of :email }

  it { should have_many :groups }

  describe "name" do
    it "should default to 'My Organization'" do
      expect(organization.name).to eq 'My Organization'
    end
  end

  describe "::create_with_groups" do
    it "should create a new organization" do
      expect{
        Organization.create_with_groups(org_params)
      }.to change{ Organization.count }.by 1
    end    
  end

  describe "::find_or_create_groups" do
    it "should return a set of groups" do
      method_call = Group.find_or_create_by_batch [group]
      expect(method_call).to eq [group]
    end
  end

end
