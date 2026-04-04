pipeline {
    agent any

    stages {
        stage('Test SSH Credential') {
            steps {
                echo 'Testing SSH connection to Podman VM...'
                // Use file credential instead of ssh-agent
                withCredentials([file(credentialsId: 'podman-vm-key', variable: 'SSH_KEY')]) {
                    echo 'Deploying to Podman VM via SSH...'

                    bat """
                    ssh -o StrictHostKeyChecking=no -i "%SSH_KEY%" -p 50943 core@localhost ^
                        "podman stop myapp || true && podman rm myapp || true && podman run -d --name myapp -p 8080:3000 my-app:latest"
                    """
                    
                }
            }
        }
    }

    post {
        success {
            echo 'SSH credential works! ✅'
        }
        failure {
            echo 'SSH test failed. Check credential username/key. ❌'
        }
    }
}
