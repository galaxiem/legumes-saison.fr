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
		if (!objet.techname){
			objet.techname = currentFileName.substring(currentFileName.lastIndexOf('/') + 1,currentFileName.indexOf('.'));
		}
		return objet.techname;
	},
	currentFileName = "";
module.exports = {
	insertDe : function(nomMois) {
		if ("ao".indexOf(nomMois.toLowerCase().charAt(0)) >= 0){
			return "d'";
		} else {
			return "de ";
		}
	},
	storeLegume : function(legume) {
		legume.type = "legumes";
		return store(legume);
	},
	storeFruit : function(fruit) {
		fruit.type = "fruits";
		return store(fruit);
	},
	getLegumes : function(index){
		return {
			"legumes": blocs.legumes.saisons[index],
			"fruits": blocs.fruits.saisons[index]
		};
	},
	computeImage : function(objet,deep){
		var prefix = deep ? "../images/" : "images/";
		return prefix + getNom(objet) + '.png';
	},
	computeLink : function(objet){
		return objet.type + '/' + getNom(objet) + '.html';
	},
	changeFileName : function(fileName){
		currentFileName = fileName;
	}
};