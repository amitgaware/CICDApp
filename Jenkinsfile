pipeline {
    agent any

    stages {
        stage('Test SSH Credential') {
            steps {
                echo 'Testing SSH connection to Podman VM...'

                // Use sshagent with your existing credential
                sshagent(['podman-vm-key2']) {
                    // Run a simple command to verify SSH works
                    bat """
                    ssh -o StrictHostKeyChecking=no -o BatchMode=yes -p 50943 core@localhost "whoami"
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
