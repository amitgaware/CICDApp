pipeline {
    agent any
    tools {
        maven 'Maven 3'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building with Maven...'
                bat 'mvn clean package'
            }
        }
        stage('Deploy') {
            steps {
                withCredentials([file(credentialsId: 'podman-key-file', variable: 'SSH_KEY')]) {
                    bat """
                    ssh -o StrictHostKeyChecking=no -i %SSH_KEY% -p 54665 root@localhost ^
                    "podman stop myapp || true && podman rm myapp || true && podman run -d --name myapp -p 8080:3000 my-app:latest"
                    """
            }
        }
    }
}
