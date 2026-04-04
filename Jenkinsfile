pipeline {
    agent any
    tools {
        maven 'Maven 3'
    }
    stages {
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
                // Use sshagent plugin instead of fixing ACLs manually
                sshagent(['podman-vm-key2']) {
                    bat """
                    ssh -o StrictHostKeyChecking=no -p 50943 core@localhost ^
                        "podman stop myapp || true && podman rm myapp || true && podman run -d --name myapp -p 8080:3000 my-app:latest"
                    """
                }
            }
        }
    }
}
                }
    }

