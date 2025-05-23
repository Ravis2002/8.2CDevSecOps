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
    bat """
      REM — clean up any previous scanner directory
      if exist sonar-scanner-cli-4.6.2.2472-windows rd /s /q sonar-scanner-cli-4.6.2.2472-windows

      REM — download the scanner zip
      curl -sSfLo sonar-scanner-cli-4.6.2.2472-windows.zip ^
        https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.6.2.2472-windows.zip

      REM — unzip with overwrite
      powershell -Command "Expand-Archive -Path 'sonar-scanner-cli-4.6.2.2472-windows.zip' `
        -DestinationPath 'sonar-scanner-cli-4.6.2.2472-windows' -Force"

      REM — force Java 21 for the scanner
      set "JAVA_HOME=C:\\Program Files\\Eclipse Adoptium\\jdk-21.0.7.6-hotspot"
      set "PATH=%JAVA_HOME%\\bin;%PATH%"

      REM — run SonarCloud
      sonar-scanner-cli-4.6.2.2472-windows\\bin\\sonar-scanner.bat ^
        -Dsonar.projectKey=Ravis2002_8.2CDevSecOps ^
        -Dsonar.organization=YourOrganizationKey ^
        -Dsonar.sources=. ^
        -Dsonar.host.url=https://sonarcloud.io ^
        -Dsonar.login=%SONAR_TOKEN%
    """
  }
}

  }
}

