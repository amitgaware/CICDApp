pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    echo 'Building with Maven...'
                    sh 'mvn clean package'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying with Podman...'
                    // Assuming 'myapp' is the name of the container
                    sh 'podman run -d --name myapp -p 8080:8080 my-app:latest'
                }
            }
        }
    }
}