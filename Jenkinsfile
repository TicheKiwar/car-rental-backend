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

        stage('Stop and Remove Previous Containers') {
            steps {
                // Detener y eliminar contenedores existentes
                sh '''
                    docker-compose -f docker-compose-b.yml down || true
                '''
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
