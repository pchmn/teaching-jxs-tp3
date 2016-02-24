var pokeApp = angular.module('pokedex', ['ngResource']);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/";

pokeApp.factory('DetailFact', function($resource) {
	var factory = {};

	factory.get = function(id){
		var get_pokemon = $resource(pokeApiUrl + "api/v2/pokemon/:pokemonId", {pokemonId: "@pokemonId"});
		get_pokemon.get({pokemonId: id}, function(response) {
		console.log(response);
			return response;
		});
	};
	
	return factory;
});

pokeApp.service('DetailServ', function(DetailFact){
	this.detail = function(id) {
		return DetailFact.get(id);
	}
});


pokeApp.controller('PokemonList', function($scope, $log, $http, $resource, DetailServ) {

    $scope.names = [];

    var get_pokemons = $resource(pokeApiUrl + "api/v1/pokedex/1")
    get_pokemons.get(function(response) {
        for(var i=0; i < response.pokemon.length; i++) {
            $scope.names.push(response.pokemon[i].name)
        }
    });
	
    
    $scope.go = function (id) {
        var abilities = {};

		var pokemon = DetailServ.detail(id);
		/*$scope.info = {
			"id": pokemon.id,
			"nom": pokemon.name,
			"expérience": pokemon.base_experience,
			"hauteur": pokemon.height,
			"poids": pokemon.weight
		};*/

        //var get_abilities = $resource(pokeApiUrl + "api/v2/ability/:abilityId", {abilityId: "@abilityId"});
    }
});

