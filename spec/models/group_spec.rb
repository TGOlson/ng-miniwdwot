require 'spec_helper'

describe Group do

  let!(:group) { create(:group) }

  let(:group_params) do 
      { 
        id: 'a',
        name: 'Something'
      }
  end

  it { should belong_to :organization }

  it { should have_many :maps }

  describe "::find_or_create_by_batch" do
    it "should return a set of groups if they exist" do
      expect{
        method_call = Group.find_or_create_by_batch [group]
        expect(method_call).to eq [group]
      }.to change{ Group.count }.by 0   
    end

    it "should make new groups if they do not exist" do
      expect{
        Group.find_or_create_by_batch [group_params] 
      }.to change{ Group.count }.by 1      
    end
  end

  describe "::find_or_create" do
    it "should return a group if it exists" do
      expect{
        method_call = Group.find_or_create group
        expect(method_call).to eq group
      }.to change{ Group.count }.by 0  
    end

    it "should make new groups if they do not exist" do
      expect{
        Group.find_or_create group_params
      }.to change{ Group.count }.by 1      
    end
  end

end
