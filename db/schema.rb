# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_06_05_183950) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "doctors", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.string "specialty"
    t.string "street_one"
    t.string "street_two"
    t.string "city"
    t.string "state"
    t.string "zipcode"
    t.string "email"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "emergency_contacts", force: :cascade do |t|
    t.string "name"
    t.string "relationship"
    t.string "street_one"
    t.string "street_two"
    t.string "city"
    t.string "state"
    t.string "zipcode"
    t.string "phone"
    t.string "email"
    t.bigint "patient_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["patient_id"], name: "index_emergency_contacts_on_patient_id"
  end

  create_table "insurances", force: :cascade do |t|
    t.string "insurance_type"
    t.string "insurance_id"
    t.string "group"
    t.string "bin"
    t.string "pcn"
    t.string "phone"
    t.string "insurance_name"
    t.bigint "patient_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["patient_id"], name: "index_insurances_on_patient_id"
  end

  create_table "labs", force: :cascade do |t|
    t.decimal "glucose"
    t.integer "heart_rate"
    t.integer "systolic_bp"
    t.integer "diastolic_bp"
    t.integer "height_inches"
    t.decimal "weight_lbs"
    t.decimal "temperature_f"
    t.integer "resp_rate"
    t.bigint "patient_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["patient_id"], name: "index_labs_on_patient_id"
  end

  create_table "patients", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.date "dob"
    t.string "gender"
    t.string "street_one"
    t.string "street_two"
    t.string "city"
    t.string "state"
    t.string "zipcode"
    t.string "email"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pharmacies", force: :cascade do |t|
    t.string "name"
    t.string "street_one"
    t.string "street_two"
    t.string "city"
    t.string "state"
    t.string "zipcode"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "prescription_take_times", force: :cascade do |t|
    t.bigint "prescription_id"
    t.bigint "take_time_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["prescription_id"], name: "index_prescription_take_times_on_prescription_id"
    t.index ["take_time_id"], name: "index_prescription_take_times_on_take_time_id"
  end

  create_table "prescriptions", force: :cascade do |t|
    t.string "drug_name"
    t.integer "amount_per_dose"
    t.string "dosage"
    t.string "formulation"
    t.string "route"
    t.integer "daily_freq"
    t.string "weekly_freq"
    t.datetime "start_date"
    t.datetime "end_date"
    t.bigint "doctor_id"
    t.bigint "pharmacy_id"
    t.bigint "patient_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["doctor_id"], name: "index_prescriptions_on_doctor_id"
    t.index ["patient_id"], name: "index_prescriptions_on_patient_id"
    t.index ["pharmacy_id"], name: "index_prescriptions_on_pharmacy_id"
  end

  create_table "take_times", force: :cascade do |t|
    t.string "day"
    t.time "rx_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
