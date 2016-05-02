# teaching-jxs-tp3 - Pokemon

Deux directives ont été crées pour séparer les deux deux controlleurs de la page.

## pokedex-search
Cette directive permet de rechercher un pokémon dans une liste avec le nom ou l'id du pokemon.

Tout d'abord, la liste des pokémons a été chargé via l'API pokémon, c'est fait par le service 'Pokedex'.
On a utilisé le service $resource qui permet de faire des requêtes ajax.
```javascript
$resource(pokeApiUrl + "api/v2/pokedex/1");
```

On retourne ensuite ces résultats dans la vue et plus précisement dans le select.
Avec le paramètre ng-repeat, on peut itérer sur un tableau de donnée.
```html
<select ng-model="id" class="form-control" id="listePoke">
    <option ng-repeat="pokemon in pokemons | filter : search" value={{pokemon.entry_number}}>{{ pokemon.name }}</option>
</select>
```

Une recherche dans cette liste peut être faite simplement avec `filter : search`.
Ici search correspond au ng-model des inputs qui permettent de faire une recherche.


## pokedex
Cette directive permet d'afficher les informations du pokémon avec son image et ses compétences.

Pour afficher l'image du pokemon à partir de son url on utilise :
```html
<img ng-src="{{ image.url }}" />
```


## Services
Pour faire fonctionner cette application, on utilise différents services

### myService
Ce service permet de stocker les informations du pokémon. Il permet notamment de mettre à disposition ces données pour les différents contrrolleur grâce à ces méthodes d'accès.
Il possède des fonctions get, set et reset pour gérer ces données.

### DetailFact
Ce service permet de récupérer des informations d'un pokémon dans l'API. Il fait appel à un callback une fois qu'il à fini sa requête.

<br>
###### Clément Goachet - Paul Chemin
