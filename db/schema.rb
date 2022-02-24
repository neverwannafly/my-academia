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

ActiveRecord::Schema.define(version: 2022_02_24_131222) do

  create_table "bookmarks", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "classroom_resource_id"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["classroom_resource_id"], name: "index_bookmarks_on_classroom_resource_id"
    t.index ["user_id"], name: "index_bookmarks_on_user_id"
  end

  create_table "classroom_resources", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "classroom_id"
    t.integer "resource_type"
    t.string "link"
    t.string "title"
    t.text "content"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["classroom_id"], name: "index_classroom_resources_on_classroom_id"
  end

  create_table "classroom_users", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "classroom_id"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["classroom_id"], name: "index_classroom_users_on_classroom_id"
    t.index ["user_id"], name: "index_classroom_users_on_user_id"
  end

  create_table "classrooms", charset: "utf8mb4", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "comments", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "users_id"
    t.string "association_type"
    t.integer "association_id"
    t.string "title"
    t.text "content"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["association_type", "association_id"], name: "index_comments_on_association_type_and_association_id"
    t.index ["users_id"], name: "index_comments_on_users_id"
  end

  create_table "likes", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "users_id"
    t.string "association_type"
    t.integer "association_id"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["association_type", "association_id"], name: "index_likes_on_association_type_and_association_id"
    t.index ["users_id"], name: "index_likes_on_users_id"
  end

  create_table "users", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.string "profile_pic"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
