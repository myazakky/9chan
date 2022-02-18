# frozen_string_literal: true

require 'bundler/setup'
require 'sinatra'
require 'sqlite3'
require_relative 'settings'

set :public_folder, __dir__ + '/frontend/9chan/build/'

db = SQLite3::Database.new(DB_NAME)

get '/' do
  content_type 'html'
  send_file 'frontend/9chan/build/index.html'
end

post '/api/messages' do
  content_type :json

  request.body.rewind
  data = JSON.parse request.body.read

  db.execute "insert into messages values (?, ?)", [data['content'], 0]

  return data.to_json
end

get '/api/messages' do
  content_type :json

  result = db.execute "select * from messages"

  result = result.map do |pair|
    {"content" => pair[0], "id" => pair[1]}
  end

  return result.to_json
end
