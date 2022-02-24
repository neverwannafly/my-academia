# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_01_22_231901) do

  create_table "games", charset: "utf8mb4", force: :cascade do |t|
    t.string "slug"
    t.string "pgn"
    t.integer "result"
    t.integer "game_type"
    t.integer "rating_change"
    t.boolean "is_rated"
    t.bigint "white_player_id"
    t.bigint "black_player_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["black_player_id"], name: "index_games_on_black_player_id"
    t.index ["slug"], name: "index_games_on_slug", unique: true
    t.index ["white_player_id"], name: "index_games_on_white_player_id"
  end

  create_table "puzzles", charset: "utf8mb4", force: :cascade do |t|
    t.string "starting_position_fen"
    t.string "solution"
    t.string "slug", null: false
    t.integer "rating"
    t.integer "rating_deviation"
    t.integer "initial_popularity", default: 0
    t.integer "upvotes", default: 0
    t.integer "downvotes", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["rating"], name: "index_puzzles_on_rating"
    t.index ["slug"], name: "index_puzzles_on_slug", unique: true
  end

  create_table "ratings", charset: "utf8mb4", force: :cascade do |t|
    t.integer "rating_type"
    t.bigint "user_id", null: false
    t.integer "rating", default: 1200
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_ratings_on_user_id"
  end

  create_table "theme_associations", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "theme_id", null: false
    t.string "associate_type", null: false
    t.integer "associate_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["associate_type", "associate_id"], name: "index_theme_associations_on_associate_type_and_associate_id"
    t.index ["theme_id"], name: "index_theme_associations_on_theme_id"
  end

  create_table "themes", charset: "utf8mb4", force: :cascade do |t|
    t.string "title"
    t.string "slug"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_themes_on_slug", unique: true
  end

  create_table "users", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "games", "users", column: "black_player_id"
  add_foreign_key "games", "users", column: "white_player_id"
  add_foreign_key "ratings", "users"
  add_foreign_key "theme_associations", "themes"
end
