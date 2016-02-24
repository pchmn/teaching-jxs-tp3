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

// controller pour la liste des pokemons
pokeApp.controller('PokemonList', function($scope, $log, $http, $resource) {

    $scope.names = [];

    var get_pokemons = $resource(pokeApiUrl + "api/v2/pokedex/1")
    get_pokemons.get(function(response) {
        for(var i=0; i < response.pokemon_entries.length; i++) {
            $scope.names.push(response.pokemon_entries[i].pokemon_species.name)
        }
    });
    
    $scope.go = function (id) {

        var abilities = {};

        var get_pokemon = $resource(pokeApiUrl + "api/v2/pokemon/:pokemonId", {pokemonId: "@pokemonId"});
        get_pokemon.get({pokemonId: id}, function(response) {
            $scope.info = {
                "id": response.id,
                "nom": response.name,
                "expérience": response.base_experience,
                "hauteur": response.height,
                "poids": response.weight
            };

        });

        var get_abilities = $resource(pokeApiUrl + "api/v2/ability/:abilityId", {abilityId: "@abilityId"});
    }
});

pokeApp.controller('PokemonInfos', function($scope) {

    DetailFact.get(id, function(element){
        $scope.info = {
            "id": element.id,
            "nom": element.name,
            "expérience": element.base_experience,
            "hauteur": element.height,
            "poids": element.weight
        };
    });
});

