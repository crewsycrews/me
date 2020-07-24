pipeline {
  agent none
  stages {
    stage('Deploy build') {
      steps {
        sh '''ssh -o StrictHostKeyChecking=no -l root 212.237.26.46 "cd /root/projects/madbroz.angular \\
&& git checkout -f && git pull \\
&& ng build --prod \\
&& cd /home/projects/ \\
&& ./deploy.sh"'''
      }
    }

  }
}