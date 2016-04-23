
var pokeApp = angular.module('pokedex', ['ngResource']);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/";

// factory pour récupérer les infos d'un pokemon
pokeApp.factory('DetailFact', function($resource) {
	var factory = {};

	factory.getBase = function(id, callback){

		var get_pokemon = $resource(pokeApiUrl + "api/v2/pokemon/:pokemonId", {pokemonId: "@pokemonId"});
		get_pokemon.get({pokemonId: id}, function(response) {
			console.log(response);
			callback(response);
		});
	};

    factory.getMovesDetails = function(data, callback) {
        var get_moves = $resource(pokeApiUrl + "api/v2/move/:moveId", {moveId: "@moveId"});

        for(var i=0; data.moves.length; i++) {

        }
    }

	return factory;
});

// factory pour récupérer les infos d'un pokemon
pokeApp.factory('myService', function() {
    var infos = {};
    var image = {};

    return {
        getData: function () {
            //You could also return specific attribute of the form data instead
            //of the entire data
            return infos;
        },
        getImage: function() {
        	return image;
        },
        setData: function (newInfos) {
        	console.log(newInfos);
            //You could also set specific attribute of the form data instead
            infos.id = newInfos.id;
            infos.name = newInfos.name;
            infos.abilities = newInfos.abilities;
            image.url = newInfos.sprites.back_default;
        },
        resetData: function () {
            //To be called when the data stored needs to be discarded
            infos = {};
        }
    };
});

pokeApp.factory('Pokedex', function($resource){
	var factory = {};
	
	factory.getAll = function(callback){
		var get_all_pokemon = $resource(pokeApiUrl + "api/v2/pokedex/1");
		get_all_pokemon.get(function(response) {
			var pokedex = [];
			for(var i=0; i < response.pokemon_entries.length; i++) {
				var value = {entry_number:response.pokemon_entries[i].entry_number, name:response.pokemon_entries[i].pokemon_species.name}
				pokedex.push(value);
			};
			callback(pokedex);
		});
	};
	
	return factory;
});


// controller pour la liste des pokemons
pokeApp.controller('PokemonList', function($scope, Pokedex, DetailFact, myService) {

    $scope.names = [];

	Pokedex.getAll(function(element){
		$scope.pokemons = element;
		
		// Supprime l'option vide
		$scope.id = element[0].entry_number;
	});

	$scope.go = function (id) {
		console.log('Go !');
		DetailFact.getBase(id, function(element){
			myService.setData(element);
		});
	}
});

pokeApp.controller('PokemonInfos', function($scope, myService) {

	$scope.service = myService;

	$scope.display = function(results) {
		$scope.info = results;
	}


});

pokeApp.directive('pokedex', function(myService) {
	var directive = {};
	directive.restrict = 'E';
	directive.templateUrl = "directive/pokedex.html";


	directive.link = function($scope, $elem, attrs){
		$scope.$watch(
			function(){
				return myService.getData();
			}, function(newVal, oldVal){
				$scope.info = myService.getData();
				$scope.image = myService.getImage();
			}, true
		);
	}

	return directive;
});

pokeApp.directive('pokedexSearch', function() {
	var directive = {};
	directive.restrict = 'E';
	directive.templateUrl = "directive/pokedexSearch.html";
	directive.link = function($scope, $elem, attrs){

	}
	return directive;
});
