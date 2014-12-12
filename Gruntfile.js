module.exports = function (grunt) {
    'use strict';
	var blocs = {
			"fruits": {},
			"legumes": {},
			"saisons": {}
		},
		store = function (o, k) {
			var s = blocs[k];
			s[o.nom] = o;
			o.mois.forEach(function(numMois){
				if (! blocs.saisons[numMois]){
					blocs.saisons[numMois] = [];
				}
				blocs.saisons[numMois].push(o);
			});
			return o;
		},
		getNom = function(objet){
			return objet.nom.toLowerCase();
		};
	
	
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		jade: {
			html: {
				files: [{ cwd: "content/fruits", src: "**/*.jade", dest: "www/fruits", expand: true, ext: ".html" },
						{ cwd: "content/legumes", src: "**/*.jade", dest: "www/legumes", expand: true, ext: ".html" },
						{ cwd: "content/mois", src: "**/*.jade", dest: "www/", expand: true, ext: ".html" }],
				options: {
					data: {
						"storeLegume" : function(legume) {
							return store(legume, "legumes");
						},
						"storeFruit" : function(fruit) {
							return store(fruit, "fruits");
						},
						"getLegumes" : function(index){
							return blocs.saisons[index];
						},
						"computeImage" : function(objet){
							return 'images/' + getNom() + '.png';
						},
						"computeLink" : function(objet){
							return 'fruits/' + getNom() + '.html';
						}
					}
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
			  "www/styles/style.css": "less/style.less"
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
