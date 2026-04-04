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
                // Direct SSH using private key to avoid ssh-agent issues on Windows
                bat """
                ssh -i C:\\Users\\Admin\\.ssh\\id_rsa -p 54665 root@localhost "podman stop myapp || true && podman rm myapp || true && podman run -d --name myapp -p 8080:3000 my-app:latest"
                """
            }
        }
    }
}
