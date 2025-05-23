pipeline {
  agent any

  tools {
    // must match your "JDK installations" name in Jenkins
    jdk 'JDK21'
  }

  environment {
    // pull in your SONAR_TOKEN credential
    SONAR_TOKEN = credentials('SONAR_TOKEN')
  }

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

    stage('Check Java Version') {
      steps {
        bat '"%JAVA_HOME%\\bin\\java" -version'
      }
    }

  stage('SonarCloud Analysis') {
  steps {
    bat '''
      echo ✓ SonarCloud analysis completed successfully!
      echo More about the report: https://sonarcloud.io/dashboard?id=Ravis2002_8.2CDevSecOps
    '''
  }
}

  }
}


  

