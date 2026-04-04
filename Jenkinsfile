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
                //withCredentials([file(credentialsId: 'podman-vm-key2', variable: 'SSH_KEY')]) {
                  //  bat """
                    //ssh -o StrictHostKeyChecking=no -i %SSH_KEY% -p 50943 root@localhost ^
                    //"podman stop myapp || true && podman rm myapp || true && podman run -d --name myapp -p 8080:3000 my-app:latest"
                    //"""       }

                withCredentials([sshUserPrivateKey(credentialsId: 'podman-vm-key', keyFileVariable: 'SSH_KEY')]) {
    bat """
    echo Fixing key permissions...

    icacls "%SSH_KEY%" /inheritance:r
    icacls "%SSH_KEY%" /remove "BUILTIN\\Users"
    icacls "%SSH_KEY%" /remove "Everyone"
    icacls "%SSH_KEY%" /remove "Authenticated Users"
    icacls "%SSH_KEY%" /grant:r "SYSTEM:R"

    echo Running SSH...

    ssh -o StrictHostKeyChecking=no -o BatchMode=yes -o PreferredAuthentications=publickey ^
    -i "%SSH_KEY%" -p 50943 core@localhost ^
    "podman stop myapp || true && podman rm myapp || true && podman run -d --name myapp -p 8080:3000 my-app:latest"
    """
}
            }
        }
    }
}
