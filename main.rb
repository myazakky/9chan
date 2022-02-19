# frozen_string_literal: true

require 'bundler/setup'
require 'sinatra/base'
require 'sinatra/cookies'
require 'sinatra/sse'
require 'sqlite3'
require_relative 'settings'
require 'ld-eventsource'

class Server < Sinatra::Base
  include Sinatra::SSE
  helpers Sinatra::Cookies

  set :public_folder, __dir__ + '/frontend/9chan/build/'

  db = SQLite3::Database.new(DB_NAME)

  get '/' do
    content_type 'html'

    cookies[:user] = '名無し' if  cookies[:user].nil?
    cookies[:icon] = 'http://10.1.1.1/files/img/2001_space_station.jpg' if cookies[:icon].nil?

    send_file 'frontend/9chan/build/index.html'
  end

  get '/set' do
    cookies[:user] = params['user'] || cookies[:user] || '名無し'
    cookies[:icon] = params['icon'] || cookies[:icon] || 'http://10.1.1.1/files/img/2001_space_station.jpg'
    redirect to('/')
  end

  get '/api/channel' do
    content_type :json

    {
      channelName: CHANNEL_NAME,
      host: HOST
    }.to_json
  end

  post '/api/messages' do
    content_type :json

    request.body.rewind
    data = JSON.parse request.body.read

    db.execute "insert into messages(content, user, icon) values (?, ?, ?)", [data['content'], cookies[:user], cookies[:icon]]

    return data.to_json
  end

  get '/api/messages' do
    content_type :json

    result = db.execute "select * from messages"

    result = result.map do |pair|
      {"id" => pair[0], "content" => pair[1], "user" => pair[2], "icon" => pair[3]}
    end

    return result.to_json
  end

  get '/api/messages/from/:n' do
    n = params['n'].to_i

    result = (db.execute "select * from messages")

    return [].to_json if result.size <= n

    result = result[n..].map do |pair|
      {"id" => pair[0], "content" => pair[1], "user" => pair[2], "icon" => pair[3]}
    end

    return result.to_json
  end

  get '/stream' do
    sse_stream do |out|
      pre_messages = db.execute "select * from messages"
      EM.add_periodic_timer(1) do
        messages = db.execute "select * from messages"
        out.push :data => {"date" => Time.now.to_s, "type" => "update", "display_name" => CHANNEL_NAME, "url" => "http://#{HOST}/"}.to_json if pre_messages != messages
        pre_messages = messages
      end
    end
  end

  def mkevent(url, out)
    SSE::Client.new(url) do |c|
      c.on_event do |e|
        out.push :data => e.data
      end
    end
  end

  get '/api/subscribes/stream' do
    sse_stream do |out|
      clients = SUBSCRIBES.map { mkevent(_1, out) }
    end
  end
end
