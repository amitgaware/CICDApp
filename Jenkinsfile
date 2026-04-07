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
        stage('Test') {
            steps {
                script {
                    echo 'Running tests...'
                    bat 'mvn test'
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
            docker run -d -p 3001:3000 --name grafana grafana/grafana
            bat 'docker run -d --name myapp -p 8090:3000 my-app:latest'
           
        }
    }
}
    }
}
