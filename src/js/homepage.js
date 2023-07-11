// gets list of all filter cards
let cards = document.getElementsByClassName('card')
console.log(cards)


// changeActive function added
function changeActive(){

    // check to make sure function runs
    console.log('changeActive running')

    // finds the card which contains active and removes it
    let active = document.getElementsByClassName('active')
    active[0].classList.remove("active");

    // adds active to clicked element
    let clickedItem = this
    clickedItem.classList.add('active');

    let pokemonType = clickedItem.innerHTML
    console.log(pokemonType)
    if (pokemonType == "All"){
        
    }
    else{

    }
}


let array = Array.from(cards)
array.forEach(function(card){
    card.addEventListener('click', changeActive, false);
});


// let cards = document.querySelectorAll('.card')

// console.log(cards)
// cards.forEach(el => el.addEventListener('click', event => {
//     el.addEventListener('click', changeActive);
//     console.log('finished')
//   }));


// async function getOnePokemon(pokemonName){

//     dataDownload(url)
//     let card = document.createElement('div')
//     // let pokemonName = 
//     // let pokemonType = 
//     // let pokemonHp =
//     // let pokemonWeight = 
//     // let pokemonHeight = 
//     // let pokemonImage = 

//     }

async function getAllPokemon(){
    let info = await fetch('pokebatleapi.onrender.com/pokemon/').then(response => response.json()).then(pokemon => {output(pokemon)})
     // let pokemonName = 
     // let pokemonType = 

     for (var i = 0; i < 20; i++) {
        let pokemonCard = document.createElement('div')
        let pokemoninfo = pokemon.i
        pokemoninfo.
    }
}

function filter(pokemonType){

}



// function dataDownload(url) {
//     fetch(url).then(response => response.json()).then(pokemon => {output(pokemon)});
// }





