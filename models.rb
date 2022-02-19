# frozen_string_literal: true

require 'bundler/setup'
require 'sqlite3'
require_relative 'settings'

db = SQLite3::Database.new(DB_NAME)

db.execute <<-SQL
  create table messages (
    id integer primary key,
    content text,
    user char(60),
    icon text
  );
SQL
