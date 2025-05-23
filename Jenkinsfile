pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/Ravis2002/8.2CDevSecOps.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'npm install'
      }
    }

    stage('Run Tests') {
      steps {
        bat 'npm test || exit 0'
      }
    }

    stage('Generate Coverage Report') {
      steps {
        bat 'npm run coverage || exit 0'
      }
    }

    stage('NPM Audit (Security Scan)') {
      steps {
        bat 'npm audit || exit 0'
      }
    }

    stage('SonarCloud Analysis') {
  steps {
    withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
      bat '''
        cd %WORKSPACE% && ^
        curl -O https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.6.2.2472-windows.zip && ^
        powershell -Command "Expand-Archive sonar-scanner-cli-4.6.2.2472-windows.zip -DestinationPath ." && ^
        set SONAR_TOKEN=%SONAR_TOKEN% && ^
        sonar-scanner-4.6.2.2472-windows\\bin\\sonar-scanner.bat
      '''
        }
      }
    }
  } 
} 
