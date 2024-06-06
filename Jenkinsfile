pipeline {
  agent any

  environment {
    RELEASE_METADATA = '/var/lib/jenkins/workspace/inbuddy/release'

    SRC_RESOURCES = './server/src/main/resources'
  }

  tools {
      gradle 'default'
      nodejs 'default'
  }


  stages {
    stage('스크립트 로드') {
      steps {
        script {
          def branchName = env.BRANCH_NAME.replaceAll('/', '-')
          def scriptPath = ''
          
          switch(branchName) {
            case 'dev-be':
              scriptPath = 'server/Jenkinsfile'
              break

            case 'dev-fe':
              scriptPath = 'client/Jenkinsfile'
              break;

            case 'dev-scheduler':
              scriptPath = 'scheduler/Jenkinsfile'
              break;
          }

          if (scriptPath != '' && fileExists(scriptPath)) {
            echo "Load build script for branch ${branchName}."
            def script = load scriptPath
            script.build()
          } else {
            echo "No build script found for branch ${branchName}, using default build process."
          }
        }
      }
    }

    stage('파일 복사') {
      when {
        branch 'main'
      }
      steps {
        sh "rm -f ${env.SRC_RESOURCES}/application.properties && mkdir ${env.SRC_RESOURCES} || true"
        sh "cp ${env.RELEASE_METADATA}/be/application.properties ${env.SRC_RESOURCES}/application.properties"
        
        sh "rm -f ./scheduler/.env; cp ${env.RELEASE_METADATA}/scheduler/.env ./scheduler/.env"
        sh "rm -f ./scheduler/start.sh; cp ${env.RELEASE_METADATA}/scheduler/start.sh ./scheduler/start.sh"

        sh "rm -f ./scheduler/wait-for-it.sh; cp ${env.RELEASE_METADATA}/wait-for-it.sh ./scheduler/wait-for-it.sh"
        sh "rm -f ./server/wait-for-it.sh; cp ${env.RELEASE_METADATA}/wait-for-it.sh ./server/wait-for-it.sh"
      }
    }

    stage('빌드') {
      when {
        branch 'main'
      }
      parallel {
        stage("Spring Boot App 빌드") {
          steps {
            dir('server') {
              /** clean and slow build with info **/
              // sh "chmod +x gradlew && ./gradlew clean --info build"

              /** normal build **/
              // sh "chmod +x gradlew && ./gradlew build"

              /** fast build **/
              sh 'chmod +x gradlew && ./gradlew bootJar'
            }
          }
        }

        stage('React App 빌드') {
          steps {
            dir('client') {
              sh 'npm i && npm run build'
            }
          }
        }
      }
    }

    stage('Container 재시작') {
      when {
        branch 'main'
      }
      steps {
        sh "docker compose -f ${env.RELEASE_METADATA}/docker-compose-release.yml restart be fe scheduler"
      }
    }
  }

  post {
    success {
      script {
        def authorName = sh(script: 'git show -s --pretty=%an', returnStdout: true).trim()
        def commiterName = sh(script: 'git show -s --pretty=%cn', returnStdout: true).trim()

        // mattermostSend(
        //   color: 'good',
        //   message: "${env.BRANCH_NAME}: ${commiterName}님이 커밋하고 ${authorName}님이 요청한 ${env.BUILD_NUMBER}번째 Merge 나왔습니다~ (<${env.BUILD_URL}|상세정보>)",
        //   endpoint: '', // 'MM 주소',
        //   icon: 'https://www.notion.so/image/https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F2699%2FPNG%2F512%2Fjenkins_logo_icon_170552.png?table=block&id=575d933c-a155-4d41-987e-887b341928ba&spaceId=0f7cf07a-b632-46e9-b39b-7c12c129b0d0&userId=fcb99ecb-2346-4edb-9302-eea7d618e9d4&cache=v2',
        //   channel: 'b110-jenkins-notification'
        // )
      }
    }

    failure {
      script {
        def authorName = sh(script: 'git show -s --pretty=%an', returnStdout: true).trim()
        def commiterName = sh(script: 'git show -s --pretty=%cn', returnStdout: true).trim()

        // mattermostSend(
        //   color: 'danger',
        //   message: "${env.BRANCH_NAME}: ${commiterName}님이 커밋하고 ${authorName}님이 요청한 ${env.BUILD_NUMBER}번째 Merge 아직 안 나왔습니다. (<${env.BUILD_URL}|상세정보>)",
        //   endpoint: '', // 'MM 주소',
        //   icon: 'https://www.notion.so/image/https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F2699%2FPNG%2F512%2Fjenkins_logo_icon_170552.png?table=block&id=575d933c-a155-4d41-987e-887b341928ba&spaceId=0f7cf07a-b632-46e9-b39b-7c12c129b0d0&userId=fcb99ecb-2346-4edb-9302-eea7d618e9d4&cache=v2',
        //   channel: 'b110-jenkins-notification'
        // )
      }
    }
  }
 
}
