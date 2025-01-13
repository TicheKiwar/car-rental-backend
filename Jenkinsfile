pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Backend') {
            steps {
                
                    sh 'docker-compose -f docker-compose-b.yml build backend'

            }
        }
        
        stage('Deploy') {
            steps {
                sh '''
                    docker-compose -f docker-compose-b.yml down || true
                    docker-compose -f docker-compose-b.yml up -d
                '''
            }
        }
        
    }
}