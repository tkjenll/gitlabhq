# frozen_string_literal: true

require 'spec_helper'

RSpec.describe GitlabSchema.types['CiJobArtifact'] do
  it 'has the correct fields' do
    expected_fields = [:download_path, :file_type]

    expect(described_class).to have_graphql_fields(*expected_fields)
  end
end