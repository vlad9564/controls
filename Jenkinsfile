pipeline {
	agent { 
		node{
            // Label expression that defines which agents may execute builds of this project
			label 'Test' 
			customWorkspace "C:/jenkins/workspace/${env.JOB_NAME}"
        }
    }
	options{
        // This option enables timestamps for console output in the jenkins job
		timestamps()
    }
	environment{
        // This environment sets the name of the repository so it can be used in the build and deploy stages
		REPOSITORY_NAME = 'augero-controls'
    }
	stages{
       			
		stage('Publish library'){
			when { branch 'develop' }
				steps{
                			powershell 'git pull'
					powershell 'git checkout ' + env.BRANCH_NAME
               			        powershell 'git pull'
   					powershell 'rigm release prepare --non-interactive --release-from-any-branch'
              			        powershell 'rigm release artifact'
           			 }
        		}
   	 }
}
