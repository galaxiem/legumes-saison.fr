module.exports = function (grunt) {
    'use strict';
	var data = require('./lib/data.js');
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		jade: {
			html: {
				files: [{ cwd: "content/main", src: "**/*.jade", dest: "www/", expand: true, ext: ".html"},
						{ cwd: "content/fruits", src: "**/*.jade", dest: "www/fruits", expand: true, ext: ".html" },
						{ cwd: "content/legumes", src: "**/*.jade", dest: "www/legumes", expand: true, ext: ".html" },
						{ cwd: "content/mois", src: "**/*.jade", dest: "www/", expand: true, ext: ".html" }],
				options: {
					processName : function(filename){
						data.changeFileName(filename);
						return filename;
					},
					data: data
				}
		  	}
		},
		less: {
		  production: {
			options: {
			  paths: ["less"],
			  cleancss: true
			},
			files: {
			  "www/styles/legume.css": "less/legume.less"
			}
		  }
		},
		'ftp-deploy': {
		  build: {
			auth: {
			  host: 'ftp.cluster011.ovh.net',
			  port: 21,
			  authPath : process.env.GM_PATH,
			  authKey: 'legume'
			},
			src: './www',
			dest: './www',
			"exclusions":['./www/**/.DS_Store']
		  }
    	}
	});
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-ftp-deploy');
    // Default task(s).
    grunt.registerTask('default', ['jade','less']);
	grunt.registerTask('deploy', ['ftp-deploy']);
};
