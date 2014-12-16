module.exports = function (grunt) {
    'use strict';
	String.prototype.endsWith = function(suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
	var blocs = {
			"fruits": {
				"saisons": {}
			},
			"legumes": {
				"saisons": {}
			}
		},
		store = function (o) {
			var s = blocs[o.type],
				st = s.saisons;
			s[o.nom] = o;
			o.mois.forEach(function(numMois){
				if (! st[numMois]){
					st[numMois] = [];
				}
				st[numMois].push(o);
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
				files: [{ cwd: "content/main", src: "**/*.jade", dest: "www/", expand: true, ext: ".html"},
						{ cwd: "content/fruits", src: "**/*.jade", dest: "www/fruits", expand: true, ext: ".html" },
						{ cwd: "content/legumes", src: "**/*.jade", dest: "www/legumes", expand: true, ext: ".html" },
						{ cwd: "content/mois", src: "**/*.jade", dest: "www/", expand: true, ext: ".html" }],
				options: {
					data: {
						"insertDe" : function(nomMois) {
							if ("ao".indexOf(nomMois.toLowerCase().charAt(0)) >= 0){
								return "d'";
							} else {
								return "de ";
							}
						},
						"storeLegume" : function(legume) {
							legume.type = "legumes";
							return store(legume);
						},
						"storeFruit" : function(fruit) {
							fruit.type = "fruits";
							return store(fruit);
						},
						"getLegumes" : function(index){
							return {
								"legumes": blocs.legumes.saisons[index],
								"fruits": blocs.fruits.saisons[index]
							};
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
