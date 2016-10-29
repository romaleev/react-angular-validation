require('babel-core/register');

//var HtmlReporter = require('protractor-html-screenshot-reporter');
//var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

/*var reporter = new HtmlScreenshotReporter({
	dest: 'screenshots',
	filename: 'index.html',
	metadataBuilder: function(currentSpec, suites, browserCapabilities) {
		return { id: currentSpec.id, os: browserCapabilities.get('console') };
	}
});*/

exports.config = {
	directConnect: true,
	specs: [
		'./test/react-test.js',
		'./test/angular-test.js'
	],
	capabilities: {
		browserName: 'chrome',
		loggingPrefs: {
			"driver": "ALL",
			"browser": "ALL"
		},
		//"OFF", "SEVERE", "WARNING", "INFO", "CONFIG", "FINE", "FINER", "FINEST", "ALL".
		chromeOptions: {
			//binary: binary,
			args: [],
			extensions: []
		}
	},
	//seleniumAddress: ' http://127.0.0.1:4444/wd/hub',
	baseUrl: 'http://localhost:8080',
	framework: 'jasmine2',
	plugins: [
		/*{
			path: './node_modules/protractor/plugins/console'
			//failOnWarning: {Boolean}                (Default - false),
			//failOnError: {Boolean}                  (Default - true),
			//logWarnings: {Boolean}                  (Default - true),
			//exclude: {Array of strings and regex}   (Default - [])
		}*/
		/*{
			package: 'protractor-console',
			logLevels: ['severe']
		}*/
	],
	/*beforeLaunch: function() {
		return new Promise(function(resolve){
			reporter.beforeLaunch(resolve);
		});
	},*/
	onPrepare: function() {
		browser.ignoreSynchronization = true;
		var SpecReporter = require('jasmine-spec-reporter');
		jasmine.getEnv().addReporter(new SpecReporter({
			displayStacktrace: 'summary',    // display stacktrace for each failed assertion, values: (all|specs|summary|none)
			displayFailuresSummary: false, // display summary of all failures after execution
			displayPendingSummary: false,  // display summary of all pending specs after execution
			displaySuccessfulSpec: true,  // display each successful spec
			displayFailedSpec: true,      // display each failed spec
			displayPendingSpec: false,    // display each pending spec
			displaySpecDuration: true,   // display each spec duration
			displaySuiteNumber: true    // display each suite number (hierarchical)
		}));

		//jasmine.getEnv().addReporter(reporter);
		/*afterAll(function(done) {
			process.nextTick(done);
		});*/

		/*afterEach(function() {
			browser.manage().logs().get('browser').then(function(browserLog) {
				expect(browserLog.length).toEqual(0);
				// Uncomment to actually see the log.
				console.log('log: ' + require('util').inspect(browserLog));
			});
		});*/

		/*jasmine.getEnv().addReporter(new HtmlReporter({
			preserveDirectory: true,
			baseDirectory: '/home/roman/www/development/frontend/roma/tmp',
			docName: 'index.html',
			takeScreenShotsOnlyForFailedSpecs: true
		}));*/

		/*browser.manage().logs().get('browser').then(function(browserLogs) {
			expect(browserLogs.length).toEqual(0);
			// browserLogs is an array of objects with level and message fields
			browserLogs.forEach(function(log){
				console.log('log: ', log);
				if (log.level.value > 900) { // it's an error log
					console.log('Browser console error!');
					console.log(log.message);
				}
			});
		});*/
	},
	/*afterLaunch: function(exitCode) {
		return new Promise(function(resolve){
			reporter.afterLaunch(resolve.bind(this, exitCode));
		});
	},*/
	jasmineNodeOpts: {
		print: function() {},
		includeStackTrace: true,
		defaultTimeoutInterval: 220000
	}
};
