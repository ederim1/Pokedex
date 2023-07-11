// gets list of all filter cards
let cards = document.getElementsByClassName('card')


// changeActive function added
function changeActive(){

    // finds the card which contains active and removes it
    let active = document.getElementsByClassName('active')
    active[0].classList.remove("active");

    // adds active to clicked element
    let clickedItem = this
    clickedItem.classList.add('active');

    let pokemonType = clickedItem.innerHTML
    console.log(pokemonType)
    if (pokemonType === "All"){
        document.querySelectorAll('.pokecard').style.display = "none";
        console.log('runnning')
        
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
    let info = await fetch('https://pokebattleapi.onrender.com/pokemon/').then(response => response.json()).then(pokemon => {output(pokemon)})
    
}

function output(pokemon){
    for (var i = 0; i < 16; i++) {
        let pokemonCard = document.createElement('div')
        let pokemoninfo = pokemon[i]
        let pokemonName = document.createElement('h1')
        pokemonName.innerHTML = pokemoninfo.name
        pokemonCard.appendChild(pokemonName)
        pokemonCard.className = "pokecard"
        pokemonCard.classList.add(pokemoninfo.type[0])
        pokemonCard.classList.add("card")

        let pokemonImage = document.createElement('img')
        pokemonImage.src = pokemoninfo.image
        pokemonCard.appendChild(pokemonImage)

        let pokemonWeight = document.createElement('h4')
        pokemonWeight.innerHTML = "Weight: " + pokemoninfo.weight
        pokemonCard.appendChild(pokemonWeight)

        let pokemonHeight = document.createElement('h4')
        pokemonHeight.innerHTML = "Height: "  + pokemoninfo.height
        pokemonCard.appendChild(pokemonHeight)

        let pokemonMovesContainer = document.createElement('ul')
        pokemonMovesContainer.innerHTML = "Moves"
        if (pokemoninfo.moves[0]){
        let pokemonMove1 = document.createElement('li')
        pokemonMove1.innerHTML = "1. " + pokemoninfo.moves[0].name 
        pokemonMovesContainer.appendChild(pokemonMove1)
        }
        if (pokemoninfo.moves[1]){
        let pokemonMove2 = document.createElement('li')
        pokemonMove2.innerHTML = "2. " + pokemoninfo.moves[1].name
        pokemonMovesContainer.appendChild(pokemonMove2)
        }
        if (pokemoninfo.moves[2]){
        let pokemonMove3 = document.createElement('li')
        pokemonMove3.innerHTML = pokemoninfo.moves[2]
        pokemonMovesContainer.appendChild(pokemonMove3)
        }
        if (pokemoninfo.moves[3]){
        let pokemonMove4 = document.createElement('li')
        pokemonMove4.innerHTML = pokemoninfo.moves[3]
        pokemonMovesContainer.appendChild(pokemonMove4)
        }
        pokemonCard.appendChild(pokemonMovesContainer)




        
        document.getElementById('pokemonDisplay').appendChild(pokemonCard)
    }
}

function filter(pokemonType){

}

getAllPokemon()

// function dataDownload(url) {
//     fetch(url).then(response => response.json()).then(pokemon => {output(pokemon)});
// }





