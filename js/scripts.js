// define pokemonRepository with api list
var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


   function getAll() {
     return repository;
   }

   function add(pokemon) {
     if (typeof(pokemon) === 'object') {
       repository.push(pokemon);
     } else {
       console.log ('Please input an object')
     }
   }

//create new list and list item,
//create button, and assign pokemon's name to the button,
//append button to the list,
   function addListItem(pokemon) {

     var $pokemonList = $('.pokemon_list');
     var $listItem = $('<li class ="pokemon_listItem"></li>');
     var pokemonInfoButton = $('<button type="button" class="name_button" ></button>');

     var $pokemonInfoButton = $(pokemonInfoButton);

     pokemonInfoButton.text(pokemon.name);
     //create event function
     pokemonInfoButton.click(function(){
       showDetails(pokemon)
     });

     //Append child
     $listItem.append($pokemonInfoButton);
     $pokemonList.append($listItem);
   }


//Load or fetch the pokemon list from the API
  function loadList() {
    return $.ajax(apiUrl,{dataType:'json'})
      .then(function(item){

      item.results.forEach(function(item){

        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        }
        add(pokemon);
      })

    }).catch(function (e) {
      console.error(e);
    });
  }

//Load detailed data for a given Pokemon from the API
  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajex(url)
      .then(function(details){
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);

      }).catch(function (e) {
      console.error(e);
    });
  }

  //show details when clicking the button
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  //return functions
   return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };

})(); // end of pokemonRepository

//Call function in repository
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
  });
});
