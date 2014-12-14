module.exports = function (grunt) {
    'use strict';
	var blocs = {
			"fruits": {},
			"legumes": {},
			"saisons": {}
		},
		store = function (o) {
			var s = blocs[o.type];
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
			//-> lower case
			var nom = objet.nom.toLowerCase();
			//spaces -> -
			nom = nom.replace(/\s/g, "-");
			//accents e
			nom = nom.replace(/[éèêë]/g, "e");
			return nom;
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
							legume.type = "legumes";
							return store(legume);
						},
						"storeFruit" : function(fruit) {
							fruit.type = "fruits";
							return store(fruit);
						},
						"getLegumes" : function(index){
							return blocs.saisons[index];
						},
						"computeImage" : function(objet,deep){
							var prefix = deep ? "../images/" : "images/";
							return prefix + getNom(objet) + '.png';
						},
						"computeLink" : function(objet){
							return objet.type + '/' + getNom(objet) + '.html';
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
