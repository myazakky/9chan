require 'bundler/setup'
require 'rack'
require_relative 'main'

use Rack::CommonLogger
run Server.new
