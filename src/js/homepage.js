

async function getOnePokemon(pokemonName){

    dataDownload(url)
    let card = document.createElement('div')
    let pokemonName = 
    let pokemonType = 
    let pokemonHp =
    let pokemonWeight = 
    let pokemonHeight = 
    let pokemonImage = 

    }

async function getAllPokemon(){
    let card = document.createElement('div')
    dataDownload(url)
    let pokemonName = 
    let pokemonType = 

}



function dataDownload(url) {
    fetch(url).then(response => response.json()).then(pokemon => {output(pokemon)});
}
