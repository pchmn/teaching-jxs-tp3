
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

pokeApp.factory('Pokedex', function($resource){
	var factory = {};
	
	factory.getAll = function(callback){
		var get_all_pokemon = $resource(pokeApiUrl + "api/v2/pokedex/1");
		get_all_pokemon.get(function(response) {
			var pokedex = {};
			for(var i=0; i < response.pokemon_entries.length; i++) {
				pokedex[response.pokemon_entries[i].entry_number] = response.pokemon_entries[i].pokemon_species.name;
			};
			callback(pokedex);
		});
	};
	
	return factory;
});

// controller pour la liste des pokemons
pokeApp.controller('PokemonList', function($scope, Pokedex) {

    $scope.names = [];

	Pokedex.getAll(function(element){
		$scope.names = element;
	});
});

pokeApp.controller('PokemonInfos', function($scope, DetailFact) {

	$scope.go = function (id) {
		DetailFact.getBase(id, function(element){
			$scope.info = {
				"id": element.id,
				"nom": element.name,
				"expérience": element.base_experience,
				"hauteur": element.height,
				"poids": element.weight
			};
		});
	}
});