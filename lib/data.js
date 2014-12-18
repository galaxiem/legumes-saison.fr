String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
var data = {
		"fruits": {
			"saisons": {}
		},
		"legumes": {
			"saisons": {}
		},
		"mois": {
			1: { "titre" : "Janvier", "nom": "janvier", "legume": "navet", "fruit": "citron"},
			2: { "titre" : "Février", "nom": "fevrier", "legume": "mache", "fruit":"pamplemousse"},
			3: { "titre" : "Mars", "nom": "mars", "legume": "blettes", "fruit": "kiwi"},
			4: { "titre" : "Avril", "nom": "avril", "legume": "asperge", "fruit": "rhubarbe"},
			5: { "titre" : "Mai", "nom": "mai", "legume": "aubergine", fruit: "fraise"},
			6: { "titre" : "Juin", "nom": "juin", "legume": "artichaut", "fruit": "abricot"},
			7: { "titre" : "Juillet", "nom": "juillet", "legume": "tomate", "fruit": "melon"},
			8: { "titre" : "Août", "nom": "aout", "legume": "asperge", "fruit": "pasteque"},
			9: { "titre" : "Septembre", "nom": "septembre", "legume": "chou-de-bruxelles", "fruit": "raisin"},
			10: { "titre" : "Octobre", "nom": "octobre", "legume": "courge", "fruit": "coing"},
			11: { "titre" : "Novembre", "nom": "novembre", "legume": "potiron", "fruit": "mandarine"},
			12: { "titre" : "Décembre", "nom": "decembre", "legume": "poireau", "fruit": "orange"}
		},
		"saisons": {
			"printemps": {"mois":[3,4,5], "titre": "Printemps", "nom": "printemps"},
			"ete": {"mois":[6,7,8], "titre": "Été", "nom": "ete"},			
			"automne": {"mois":[9,10,11], "titre": "Automne", "nom": "automne"},
			"hiver": {"mois":[12,1,2], "titre": "Hiver", "nom": "hiver"}			
		}
	},
	store = function (o) {
		var s = data[o.type],
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
for (var keySaison in data.saisons) {		
	var saison = data.saisons[keySaison];
	for (var index in saison.mois) {		
		var indexMois = saison.mois[index];
		data.mois[indexMois].saison = saison;
	}
}
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
	getMois : function(index) {
		return data.mois[index];
	},
	getDataMois : function(index){
		return {
			"titre": data.mois[index].titre,
			"legumes": data.legumes.saisons[index],
			"fruits": data.fruits.saisons[index]
		};
	},
	getSaison : function(indexMois){
		return data.mois[indexMois].saison;
	},
	getSaisons : function() {
		return data.saisons;
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
