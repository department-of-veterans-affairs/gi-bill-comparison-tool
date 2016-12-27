pipeline {
  agent label:'rails-testing'
  stages {
    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('Install bundle') {
      steps {
        sh 'bash --login -c "bundle install --path vendor/bundle --without development"'
      }
    }

    stage('Ensure database') {
      steps {
        sh 'bash --login -c "bundle exec rake db:create db:migrate load_csv[data.csv]"'
      }
    }

    stage('Run tests') {
      steps {
        sh 'bash --login -c "bundle exec rake ci"'
      }
    }
  }
}
