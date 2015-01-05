String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
var data = {
		"fruits": {
			"saisons": {},
			"index": {}
		},
		"legumes": {
			"saisons": {},
			"index": {}
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
			"printemps": {"mois":[3,4,5], "article": "de ", "titre": "Printemps", "nom": "printemps", "index":{}},
			"ete": {"mois":[6,7,8], "article": "d'", "titre": "Été", "nom": "ete", "index":{}},			
			"automne": {"mois":[9,10,11], "article": "d'", "titre": "Automne", "nom": "automne", "index":{}},
			"hiver": {"mois":[12,1,2], "article": "d'", "titre": "Hiver", "nom": "hiver", "index":{}}			
		}
	},
	//add an object o (legume ou fruit) to a first letter based	index
	addToIndex = function (i, o){
		var lettre = getNom(o).substring(0,1);
		if (!i[lettre]){
			i[lettre] = [];
		}
		for (var k in i[lettre]){
			if (i[lettre][k] === o){
				//avoid duplicates
				return false;
			}
		}
		i[lettre].push(o);
	},
	store = function (o) {
		var s = data[o.type],
			st = s.saisons;
		s[getNom(o)] = o;
		addToIndex(s.index, o);
		o.mois.forEach(function(numMois){
			var mois = data.mois[numMois];
			if (! st[numMois]){
				st[numMois] = [];
			}
			addToIndex(mois.saison.index, o);
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
	getFruitsDuMois : function(indexMois) {
		var mois = data.mois[indexMois];
		return [data.fruits[mois.fruit]];
	},
	getLegumesDuMois : function(indexMois) {
		var mois = data.mois[indexMois];
		return [data.legumes[mois.legume]];
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
	getIndexLegumes : function() {
		return data.legumes.index;
	},
	getIndexFruits : function() {
		return data.fruits.index;
	},
	computeImage : function(objet,deep){
		var prefix = deep ? "../images/" : "images/";
		return prefix + getNom(objet) + '.png';
	},
	computeLink : function(objet, absolute){
		var uri =  '/' + objet.type + '/' + getNom(objet) + '.html',
			url = absolute ? "http://legumes-saison.fr" + uri : uri;
		return url;
	},
	changeFileName : function(fileName){
		currentFileName = fileName;
		return currentFileName;
	}
};
