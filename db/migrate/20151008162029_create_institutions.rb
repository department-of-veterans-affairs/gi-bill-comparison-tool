class CreateInstitutions < ActiveRecord::Migration
  def change
    create_table :institutions do |t|
      t.belongs_to :institution_type

      t.string :facility_code, null: false
      t.string :institution, null: false
      t.string :city
      t.string :state
      t.string :zip 
      t.string :country, null: false

      # cross is probably ipeds_id
      t.integer :cross 
      t.string :ope 
      t.float :bah 
      t.boolean :poe, null: false
      t.boolean :yr, null: false
      t.integer :gibill
      t.boolean :student_veteran, null: false 
      t.string :student_veteran_link  
      t.string :vetsuccess_name 
      t.string :vetsuccess_email  
      t.boolean :eight_keys, null: false  
      t.boolean :sec_702, null: false
      t.boolean :dodmou, null: false  
      t.float :grad_rate 
      t.integer :grad_rate_rank  
      t.float :default_rate  
      t.float :avg_stu_loan_debt 
      t.integer :avg_stu_loan_debt_rank  

      # Id to a type can be placed in own table
      t.integer :indicator_group 

      t.float :salary  
      t.string :calendar 
      t.float :tuition_in_state  
      t.float :tuition_out_of_state  
      t.float :books 
      t.boolean :online_all, null: false
      t.float :p911_tuition_fees 
      t.integer :p911_recipients 
      t.float :p911_yellow_ribbon  
      t.integer :p911_yr_recipients  
      t.boolean :accredited, null: false 

      # Enumeration can be placed in own table
      t.string :accreditation_type  

      # Enumeration can be placed in own table
      t.string :accreditation_status  

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
      t.boolean :hcm_status, null: false  

      # Enumeration can be placed in own table
      t.string :hcm_type  
      
      # Enumeration can be placed in own table
      t.string :hcm_reason

      t.timestamps null: false

      t.index :facility_code, unique: true
      t.index :institution_type_id
      t.index :institution
      t.index :city
      t.index :state
    end
  end
end
