require 'spec_helper'

describe Group do

  it { should belong_to :organization }

  it { should have_many :maps }

end
