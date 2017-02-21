# frozen_string_literal: true
# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'GiBillComparisonToolNew'
set :repo_url, 'git@github.com:department-of-veterans-affairs/gi-bill-comparison-tool-new.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp
set :branch, 'master'

set :rails_env, 'production'

set :tmp_dir, '/home/ec2-user/tmp'

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

set :default_env, 'RAILS_RELATIVE_URL_ROOT' => '/gi-bill-comparison-tool'

# Default value for keep_releases is 5
# set :keep_releases, 5

set :assets_roles, [:app]

# Copy database.yml to shared
task :mv_yml do
  on roles(:all) do
    %w(config/database.yml config/secrets.yml).each do |f|
      upload!(f, "#{shared_path}/#{f}")
      set :linked_files, fetch(:linked_files, []).push(f)
    end
  end
end

namespace :deploy do
  before :starting, :mv_yml

  before :finished, :set_permissions do
    on roles(:app) do
      execute "chmod -R 755 #{release_path}"
      execute "chmod -R 755 #{release_path}/public/assets/*"
    end
  end

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end
end
