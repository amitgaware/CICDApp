pipeline {
    agent any

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
                    echo 'Deploying with Podman...'
                    // Assuming 'myapp' is the name of the container
                    bat 'podman run -d --name myapp -p 8080:8080 my-app:latest'
                }
            }
        }
    }
}
