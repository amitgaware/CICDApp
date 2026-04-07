pipeline {
    agent any
    tools {
        maven 'Maven 3'
    }
    stages {
        stage('Build') {
            steps {
                script {
                    echo 'Building with Maven...'
                    bat 'mvn clean package'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying with Docker...'
                    
                    // Stop and remove existing container (if exists)
                    bat 'docker stop myapp || exit 0'
                    bat 'docker rm myapp || exit 0'
                    
                    // Build Docker image
                    bat 'docker build -t my-app:latest .'
                    
                    // Run container
                    bat 'docker run -d --name myapp -p 8080:8080 my-app:latest'
                }
            }
        }
    }
}
