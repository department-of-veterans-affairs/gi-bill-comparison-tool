# frozen_string_literal: true
desc 'Load database from CSV -- invoke with rake load_csv[file_name.csv]'
task :build_test_csv, [:csv_file] do |_t, _args|
  puts 'Gathering column definitions ... '
  _ = TestCsvBuilder.map
end

class TestCsvBuilder
  # self.def map
  # 	Institution.columns_hash.inject({}) do |m, c|
  # 		unless %W(id institution created_at updated_at).include?(c[1].name)
  # 			m[c[1].name.to_sym] = c[1].type
  # 		end

  # 		m
  # 	end
  # end

  # def initialize
  # 	@rows = []
  # end

  # def create_row(:institution, :bool, :str, :float, :int)

  # end
end
