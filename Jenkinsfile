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
                    ssh -i "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDd5UDZZW7Er36TQxowpkQq/wuchyE03x863JNPB7HjBVpVrWJf3OvtMdMQOP1p+BGsXhcbHD3G0RiLJ3kd0Cy+aQC975LUbef53zlSvHg9vfalsDZPQ+Iy4iCw4G/927Eoj08MYU89cjiGAYquhgvLOrpKL/Flv97e4Bwjy2Tg4le/wAkNZgP7Ef6nTcYwo4LEy9YGiQVw6BpDEFc/Ah27Ev2OHLB7ryfIC2+X/zZsFNns43hyPpeHNXd0nToTC4232r4ZaPuBxu5IvKgjUPzsVqv2/UHKwSvpXFKbtdJGqgSDZph2ZiUZZt8Hjx2/UJUmWpKaKnneOk6nBHoBZlxYVESoa/y+TdntyApTdmAuDv0AoA2GuNi9vlV3K/os6hLBmosylBiC6OOlViKkLRSSPvePO44un5+3J2R9QhMqppo8O4AS14VKRxh8NIPszOM2nYriXwJuF4J0jiQsuRTI/9fBn2f3eHsjGbM2sw28+SldlvZWV+Kxy0onpiOjrdWS0tiakVQtq++CrSOVylVttn7eimbjbSViHBHfX28/9R4ys4QajgP6Bj46gDnhMtudKbIzDi7iCaqh9oRfkkTqlKv4V9UMs55mgV2BePtzAP1VI6CYgkbIwBI6bZptHXXtzSlVfQp++baSS2R8vk75G9gOCtdQjgUECQvIpu5ApQ== admin@DESKTOP-006CATC" -o StrictHostKeyChecking=no -o BatchMode=yes -p 50943 root@localhost "whoami"
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
