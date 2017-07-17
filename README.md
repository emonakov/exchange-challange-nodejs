# Exchange challenge application

This is using ExpressJs skeleton application to quickly setup and start working. 
 This application uses the latest ExpressJs with the Pug template engine.

Frontend uses latest VueJS https://vuejs.org/v2/guide
 Added to layout from CDN.

It also uses latest version of Chart.js http://www.chartjs.org library which renders a chart
 with a popular currency exchange rates.
 
There's also a simple date picker to handle exchange 
 history https://github.com/dbushell/Pikaday
 
Main exchange api connector and service are located in /src directory of the project.
Frontend static files (js/scc) are located in /public dir.

App configuration stored in the config.yml file in the /etc dir

And routes. They're in the /routes dir

## Install the Application

Run this command from the project root directory.

    npm install

Run this command to run the app

	npm start

Run this command to test api connection

	npm test
	
That's it!
