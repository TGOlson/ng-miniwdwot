require 'spec_helper'

describe Organization do

  let!(:organization) { create(:organization) }

  it { should validate_presence_of :token }
  it { should validate_presence_of :email }

  it { should have_many :groups }

  describe "name attribute" do
    it "should default to 'My Organization'" do
      expect(organization.name).to eq 'My Organization'
    end
  end

end
