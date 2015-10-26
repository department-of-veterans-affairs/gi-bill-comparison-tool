class CreateInstitutions < ActiveRecord::Migration
  def change
    create_table :institutions do |t|
      t.belongs_to :institution_type

      # Phyiscal Info
      t.string :facility_code, null: false
      t.string :institution, null: false
      t.string :city
      t.string :state
      t.string :zip 
      t.string :country, null: false

      # School Metrics
      t.float :bah 
      t.integer :cross 
      t.string :ope 
      t.string :insturl
      t.string :vet_tuition_policy_url
      t.integer :pred_degree_awarded
      t.integer :locale
      t.integer :gibill
      t.string :undergrad_enrollment # Integer with "null" string values
      t.boolean :yr, null: false
      t.boolean :student_veteran, null: false 
      t.string :student_veteran_link  
      t.boolean :poe, null: false
      t.boolean :eight_keys, null: false  
      t.boolean :dodmou, null: false  
      t.boolean :sec_702, null: false
      t.string :vetsuccess_name 
      t.string :vetsuccess_email  
      t.boolean :credit_for_mil_training
      t.boolean :vet_poc
      t.boolean :student_vet_grp_ipeds 
      t.boolean :soc_member
      t.string :retention_rate_veteran #Float with "null" strings.
      t.string :retention_all_students #Float with "null" strings.
      t.string :persistance_rate_veteran #Float with "null" strings.
      t.string :graduation_rate_veteran #Float with "null" strings.
      t.string :graduation_rate_all_students #Float with "null" strings.
      t.string :transfer_out_rate_veteran #Float with "null" strings.
      t.string :transfer_out_rate_all_students #Float with "null" strings.
      t.string :salary_all_students #Float with "null" and other terms
      t.string :repayment_rate_all_students #Float with "null" and other terms
      t.string :avg_stu_loan_debt #Float with "null" and other terms
      t.string :calendar 
      t.string :tuition_in_state #Float with "null" and other terms
      t.string :tuition_out_of_state #Float with "null" and other terms
      t.string :books #Float with "null" and other terms
      t.boolean :online_all, null: false
      t.float :p911_tuition_fees 
      t.integer :p911_recipients 
      t.float :p911_yellow_ribbon  
      t.integer :p911_yr_recipients   
      t.boolean :accredited, null: false 
      t.string :accreditation_type  
      t.string :accreditation_status  
      t.boolean :caution_flag, null: false
      t.string :caution_flag_reason

      # Complaint Data
      t.integer :complaints_facility_code  
      t.integer :complaints_financial_by_fac_code  
      t.integer :complaints_quality_by_fac_code  
      t.integer :complaints_refund_by_fac_code 
      t.integer :complaints_marketing_by_fac_code  
      t.integer :complaints_accreditation_by_fac_code  
      t.integer :complaints_degree_requirements_by_fac_code  
      t.integer :complaints_student_loans_by_fac_code  
      t.integer :complaints_grades_by_fac_code 
      t.integer :complaints_credit_transfer_by_fac_code  
      t.integer :complaints_credit_job_by_fac_code 
      t.integer :complaints_job_by_fac_code
      t.integer :complaints_transcript_by_fac_code 
      t.integer :complaints_other_by_fac_code  
      t.integer :complaints_main_campus_roll_up  
      t.integer :complaints_financial_by_ope_id_do_not_sum 
      t.integer :complaints_quality_by_ope_id_do_not_sum 
      t.integer :complaints_refund_by_ope_id_do_not_sum  
      t.integer :complaints_marketing_by_ope_id_do_not_sum 
      t.integer :complaints_accreditation_by_ope_id_do_not_sum 
      t.integer :complaints_degree_requirements_by_ope_id_do_not_sum 
      t.integer :complaints_student_loans_by_ope_id_do_not_sum 
      t.integer :complaints_grades_by_ope_id_do_not_sum  
      t.integer :complaints_credit_transfer_by_ope_id_do_not_sum 
      t.integer :complaints_jobs_by_ope_id_do_not_sum  
      t.integer :complaints_transcript_by_ope_id_do_not_sum  
      t.integer :complaints_other_by_ope_id_do_not_sum 

      t.timestamps null: false

      t.index :facility_code, unique: true
      t.index :institution_type_id
      t.index :institution
      t.index :city
      t.index :state
      
      # t.float :grad_rate 
      # t.integer :grad_rate_rank  
      # t.float :default_rate  
      # t.float :avg_stu_loan_debt 
      # t.integer :avg_stu_loan_debt_rank  
      # t.integer :indicator_group 
      # t.float :salary  
      # t.boolean :hcm_status, null: false  
      # t.string :hcm_type  
      # t.string :hcm_reason
    end
  end
end
