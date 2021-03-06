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

ActiveRecord::Schema.define(version: 2022_03_21_163437) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.string "key"
    t.string "trackable_type"
    t.integer "trackable_id"
    t.string "owner_type"
    t.integer "owner_id"
    t.json "params"
    t.bigint "classroom_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["classroom_id"], name: "index_activities_on_classroom_id"
    t.index ["key"], name: "index_activities_on_key"
    t.index ["owner_type", "owner_id"], name: "index_activities_on_owner_type_and_owner_id"
    t.index ["trackable_type", "trackable_id"], name: "index_activities_on_trackable_type_and_trackable_id"
  end

  create_table "bookmarks", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "bookmarkable_type"
    t.integer "bookmarkable_id"
    t.index ["bookmarkable_type", "bookmarkable_id"], name: "index_bookmarks_on_bookmarkable_type_and_bookmarkable_id"
    t.index ["user_id"], name: "index_bookmarks_on_user_id"
  end

  create_table "classroom_resources", force: :cascade do |t|
    t.bigint "classroom_id"
    t.integer "resource_type"
    t.string "link"
    t.string "title"
    t.text "content"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.index ["classroom_id"], name: "index_classroom_resources_on_classroom_id"
    t.index ["user_id"], name: "index_classroom_resources_on_user_id"
  end

  create_table "classroom_users", force: :cascade do |t|
    t.bigint "classroom_id"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["classroom_id"], name: "index_classroom_users_on_classroom_id"
    t.index ["user_id"], name: "index_classroom_users_on_user_id"
  end

  create_table "classrooms", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "user_id"
    t.string "commentable_type"
    t.integer "commentable_id"
    t.string "title"
    t.text "content"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "likes", force: :cascade do |t|
    t.bigint "user_id"
    t.string "likeable_type"
    t.integer "likeable_id"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["likeable_type", "likeable_id"], name: "index_likes_on_likeable_type_and_likeable_id"
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "tag_associations", force: :cascade do |t|
    t.bigint "tag_id"
    t.string "taggable_type"
    t.integer "taggable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tag_id"], name: "index_tag_associations_on_tag_id"
    t.index ["taggable_type", "taggable_id"], name: "index_tag_associations_on_taggable_type_and_taggable_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.integer "status"
    t.integer "tag_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "tasks", force: :cascade do |t|
    t.text "content"
    t.integer "status"
    t.datetime "deadline"
    t.bigint "classroom_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.index ["classroom_id"], name: "index_tasks_on_classroom_id"
  end

  create_table "user_classroom_progresses", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "classroom_resource_id"
    t.integer "score"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["classroom_resource_id"], name: "index_user_classroom_progresses_on_classroom_resource_id"
    t.index ["created_at"], name: "index_user_classroom_progresses_on_created_at"
    t.index ["user_id"], name: "index_user_classroom_progresses_on_user_id"
  end

  create_table "users", force: :cascade do |t|
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

  add_foreign_key "tag_associations", "tags"
  add_foreign_key "tasks", "classrooms"
end
