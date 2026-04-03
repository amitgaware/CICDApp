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
                    
                    // 1. Build the Docker image (tagging it as 'my-app')
                    bat 'docker build -t my-app:latest .'

                    // 2. Stop and remove existing container if it's already running
                    // The '|| ver > nul' prevents the pipeline from failing if the container doesn't exist
                    bat 'docker stop myapp || ver > nul'
                    bat 'docker rm myapp || ver > nul'

                    // 3. Run the container in detached mode
                    bat 'docker run -d --name myapp -p 8080:8080 my-app:latest'
                }
            }
        }
    }
}
