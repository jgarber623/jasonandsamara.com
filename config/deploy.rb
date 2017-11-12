# config valid only for current version of Capistrano
lock '3.10.0'

set :application, 'jasonandsamara.com'
set :repo_url, 'git@github.com:jgarber623/jasonandsamara.com.git'
set :chruby_ruby, 'ruby-2.4.2'

before 'deploy:publishing', :build
