import Jasmine from 'jasmine';

//let mode = process.env.mode;

var jasmine = new Jasmine();
jasmine.loadConfig({
	spec_dir: 'test',
	spec_files: [
		'validation-test.js'
	],
	helpers: [
		'helpers.js'
	]
});

jasmine.execute();
