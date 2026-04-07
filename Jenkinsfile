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

            bat 'docker stop myapp || exit 0'
            bat 'docker rm myapp || exit 0'

            bat 'set DOCKER_BUILDKIT=0&& docker build -t my-app:latest .'

            bat 'docker run -d --name myapp1 -p 8090:8090 my-app:latest'
        }
    }
}
    }
}
