require 'spec_helper'

describe Map do

  it { should belong_to :group }
  it { should have_many :properties }

end
