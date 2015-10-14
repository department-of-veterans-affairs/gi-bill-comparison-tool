# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20151008162029) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "institution_types", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "institution_types", ["name"], name: "index_institution_types_on_name", unique: true, using: :btree

  create_table "institutions", force: :cascade do |t|
    t.integer  "institution_type_id"
    t.string   "facility_code",                                       null: false
    t.string   "institution",                                         null: false
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.string   "country",                                             null: false
    t.integer  "cross"
    t.string   "ope"
    t.float    "bah"
    t.boolean  "poe",                                                 null: false
    t.boolean  "yr",                                                  null: false
    t.integer  "gibill"
    t.boolean  "student_veteran",                                     null: false
    t.string   "student_veteran_link"
    t.string   "vetsuccess_name"
    t.string   "vetsuccess_email"
    t.boolean  "eight_keys",                                          null: false
    t.boolean  "sec_702",                                             null: false
    t.boolean  "dodmou",                                              null: false
    t.float    "grad_rate"
    t.integer  "grad_rate_rank"
    t.float    "default_rate"
    t.float    "avg_stu_loan_debt"
    t.integer  "avg_stu_loan_debt_rank"
    t.integer  "indicator_group"
    t.float    "salary"
    t.string   "calendar"
    t.float    "tuition_in_state"
    t.float    "tuition_out_of_state"
    t.float    "books"
    t.boolean  "online_all",                                          null: false
    t.float    "p911_tuition_fees"
    t.integer  "p911_recipients"
    t.float    "p911_yellow_ribbon"
    t.integer  "p911_yr_recipients"
    t.boolean  "accredited",                                          null: false
    t.string   "accreditation_type"
    t.string   "accreditation_status"
    t.integer  "complaints_facility_code"
    t.integer  "complaints_financial_by_fac_code"
    t.integer  "complaints_quality_by_fac_code"
    t.integer  "complaints_refund_by_fac_code"
    t.integer  "complaints_marketing_by_fac_code"
    t.integer  "complaints_accreditation_by_fac_code"
    t.integer  "complaints_degree_requirements_by_fac_code"
    t.integer  "complaints_student_loans_by_fac_code"
    t.integer  "complaints_grades_by_fac_code"
    t.integer  "complaints_credit_transfer_by_fac_code"
    t.integer  "complaints_credit_job_by_fac_code"
    t.integer  "complaints_transcript_by_fac_code"
    t.integer  "complaints_other_by_fac_code"
    t.integer  "complaints_main_campus_roll_up"
    t.integer  "complaints_financial_by_ope_id_do_not_sum"
    t.integer  "complaints_quality_by_ope_id_do_not_sum"
    t.integer  "complaints_refund_by_ope_id_do_not_sum"
    t.integer  "complaints_marketing_by_ope_id_do_not_sum"
    t.integer  "complaints_accreditation_by_ope_id_do_not_sum"
    t.integer  "complaints_degree_requirements_by_ope_id_do_not_sum"
    t.integer  "complaints_student_loans_by_ope_id_do_not_sum"
    t.integer  "complaints_grades_by_ope_id_do_not_sum"
    t.integer  "complaints_credit_transfer_by_ope_id_do_not_sum"
    t.integer  "complaints_jobs_by_ope_id_do_not_sum"
    t.integer  "complaints_transcript_by_ope_id_do_not_sum"
    t.integer  "complaints_other_by_ope_id_do_not_sum"
    t.boolean  "hcm_status",                                          null: false
    t.string   "hcm_type"
    t.string   "hcm_reason"
    t.datetime "created_at",                                          null: false
    t.datetime "updated_at",                                          null: false
  end

  add_index "institutions", ["city"], name: "index_institutions_on_city", using: :btree
  add_index "institutions", ["facility_code"], name: "index_institutions_on_facility_code", unique: true, using: :btree
  add_index "institutions", ["institution"], name: "index_institutions_on_institution", using: :btree
  add_index "institutions", ["institution_type_id"], name: "index_institutions_on_institution_type_id", using: :btree
  add_index "institutions", ["state"], name: "index_institutions_on_state", using: :btree

end
