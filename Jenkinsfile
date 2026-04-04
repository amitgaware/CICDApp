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
                //withCredentials([file(credentialsId: 'podman-vm-key', variable: 'SSH_KEY')]) {
                  //  bat """
                    //ssh -o StrictHostKeyChecking=no -i %SSH_KEY% -p 50943 root@localhost ^
                    //"podman stop myapp || true && podman rm myapp || true && podman run -d --name myapp -p 8080:3000 my-app:latest"
                    //"""       }

                withCredentials([sshUserPrivateKey(credentialsId: 'podman-vm-key', keyFileVariable: 'SSH_KEY')]) {
    bat """
    REM Fix line endings for Windows (optional)
    powershell -Command "(Get-Content %SSH_KEY%) | Set-Content -NoNewline %SSH_KEY%"

    REM Fix permissions (ACL)
    icacls "%SSH_KEY%" /inheritance:r
    icacls "%SSH_KEY%" /remove "BUILTIN\\Users"
    icacls "%SSH_KEY%" /grant:r "SYSTEM:R"

    REM Run SSH
    ssh -o StrictHostKeyChecking=no -o BatchMode=yes -o PreferredAuthentications=publickey ^
        -i "%SSH_KEY%" -p 50943 root@localhost ^
        "podman stop myapp || true && podman rm myapp || true && podman run -d --name myapp -p 8080:3000 my-app:latest"
    """
}
            }
        }
    }
}
