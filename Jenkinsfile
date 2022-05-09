pipeline{
    agent any
    tools {
        nodejs "nodejs"
    }  
    environment { 
        SECRET_KEY = "${env.SECRET_KEY}"
        BASE_URL = "${env.BASE_URL}"
    }
    stages{
        stage('install'){
            steps{
                echo 'Installing npm packages...'
                sh 'npm install'
                echo 'install step is done...'
            }
        }
        stage('build'){ 
            steps{
                echo 'Building stage...'
                sh 'npm audit fix --force'
                echo 'build step is done...'
            }
        }
        stage('test'){
            steps{
                echo 'Testing stage...'
                sh 'npm run test'
                echo 'test step is done...'
            }
        }
    }
}
