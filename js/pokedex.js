var pokeApp = angular.module('pokedex', ['ngResource']);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/"

pokeApp.controller('PokemonList', function($scope, $log, $http, $resource) {

    $scope.names = [];

    var get_pokemons = $resource(pokeApiUrl + "api/v2/pokedex/1")
    get_pokemons.get(function(response) {
        for(var i=0; i < response.pokemon.length; i++) {
            $scope.names.push(response.pokemon[i].name)
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
