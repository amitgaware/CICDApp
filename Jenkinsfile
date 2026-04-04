pipeline {
    agent any
    tools {
        maven 'Maven 3'
    }

    environment {
        // Optional: define environment variables if needed
        APP_NAME = 'myapp'
        LOCAL_PORT = '8080'
        CONTAINER_PORT = '3000'
        PODMAN_IMAGE = 'my-app:latest'
        PODMAN_SSH_PORT = '50943'
        PODMAN_SSH_USER = 'core'
        PODMAN_VM_HOST = 'localhost'
        SSH_CREDENTIALS_ID = 'podman-vm-key2'
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
                echo "Deploying ${APP_NAME} to Podman VM..."

                // Use SSH Agent to handle the private key securely
                sshagent([env.SSH_CREDENTIALS_ID]) {
                    bat """
                    ssh -o StrictHostKeyChecking=no -o BatchMode=yes -p ${PODMAN_SSH_PORT} ${PODMAN_SSH_USER}@${PODMAN_VM_HOST} ^
                        "podman stop ${APP_NAME} || true && podman rm ${APP_NAME} || true && podman run -d --name ${APP_NAME} -p ${LOCAL_PORT}:${CONTAINER_PORT} ${PODMAN_IMAGE}"
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                echo "Verifying deployment..."
                sshagent([env.SSH_CREDENTIALS_ID]) {
                    bat """
                    ssh -o StrictHostKeyChecking=no -o BatchMode=yes -p ${PODMAN_SSH_PORT} ${PODMAN_SSH_USER}@${PODMAN_VM_HOST} ^
                        "podman ps | findstr ${APP_NAME}"
                    """
                }
            }
        }

    }

    post {
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed. Check SSH credentials and Podman VM.'
        }
    }
}
