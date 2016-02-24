var pokeApp = angular.module('pokedex', ['ngResource']);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/";

pokeApp.factory('DetailFact', function($resource) {
	var factory = {};

	factory.get = function(id, callback){
		var get_pokemon = $resource(pokeApiUrl + "api/v2/pokemon/:pokemonId", {pokemonId: "@pokemonId"});
		get_pokemon.get({pokemonId: id}, function(response) {
			callback(response);
		});
	};
	
	return factory;
});


pokeApp.controller('PokemonList', function($scope, $log, $http, $resource, DetailFact) {

    $scope.names = [];

    var get_pokemons = $resource(pokeApiUrl + "api/v1/pokedex/1")
    get_pokemons.get(function(response) {
        for(var i=0; i < response.pokemon.length; i++) {
            $scope.names.push(response.pokemon[i].name)
        }
    });
	
    
    $scope.go = function (id) {
        var abilities = {};

		DetailFact.get(id, function(element){
			$scope.info = {
				"id": element.id,
				"nom": element.name,
				"expérience": element.base_experience,
				"hauteur": element.height,
				"poids": element.weight
			};
		});

        //var get_abilities = $resource(pokeApiUrl + "api/v2/ability/:abilityId", {abilityId: "@abilityId"});
    }
});

