// Get the URL parameters
var urlParams = new URLSearchParams(window.location.search);

// Retrieve the email and picture values
var email = urlParams.get("email");
var picture = urlParams.get("picture");

// Output the values
// console.log('Email:', email);
// console.log('Picture:', picture);

// Check if the picture parameter has a value
if (picture) {
  // Create an image element
  var image = document.createElement("img");

  // Set the src attribute to the picture value
  image.src = picture;

  // Apply CSS styles
  image.style.maxWidth = "100%";
  image.style.maxHeight = "100%";
  image.style.borderRadius = "50%";
  image.style.objectFit = "cover";

  // Find the buttonGlass div
  var buttonGlassDiv = document.getElementById("buttonGlass");

  // Apply CSS styles to the buttonGlass div
  buttonGlassDiv.style.display = "flex";
  buttonGlassDiv.style.justifyContent = "center";
  buttonGlassDiv.style.alignItems = "center";
  buttonGlassDiv.style.overflow = "hidden";
  // Append the image to the buttonGlass div
  if (buttonGlassDiv) {
    buttonGlassDiv.appendChild(image);
  }
}

// Fetch data from the API
fetch("https://pokebattleapi.onrender.com/pokemon")
  .then((response) => response.json())
  .then((data) => {
    const statsDiv = document.getElementById("stats");
    const topCrossDiv = document.getElementById("topcross");
    const botCrossDiv = document.getElementById("botcross");
    const fireButton = document.getElementById("fireButton");
    const waterButton = document.getElementById("waterButton");
    const electricButton = document.getElementById("electricButton");
    const grassButton = document.getElementById("grassButton");
    const barButton1 = document.getElementById("barbutton1");
    const barButton2 = document.getElementById("barbutton2");
    const yellowBox1 = document.getElementById("yellowBox1");
    const yellowBox2 = document.getElementById("yellowBox2");

    // Function to update the HTML with the data
    function updatePokemonData(pokemon) {
      // Update the stats div
      statsDiv.innerHTML = `
        <strong">Name:</strong> <span id='pokemon_name'>${
          pokemon.name
        } </span><br/>
        <strong>Type:</strong> ${pokemon.type.join(", ")} <br/>
        <strong>Height:</strong> ${pokemon.height} <br/>
        <strong>Weight:</strong> ${pokemon.weight} <br/><br/>
        <strong>Moves:</strong><br/>
        ${pokemon.moves
          .map((move) => `${move.name}: ${move.damage} - ${move.text}<br/>`)
          .join("")}
      `;
    }

    // Initialize the index to cycle through the Pokemon data
    let index = 0;
    let filteredData = data; // Initially set filteredData as the complete data

    // Check if there is data in local storage
    const storedClickedPokemon = localStorage.getItem("clickedPokemon");

    // Initialize the clickedPokemon array based on the local storage data
    let clickedPokemon = storedClickedPokemon
      ? JSON.parse(storedClickedPokemon)
      : [];

    // Function to update the displayed Pokemon data
    function updateDisplayedPokemon() {
      // Get the current Pokemon
      const currentPokemon = filteredData[index];

      // Update the HTML with the current Pokemon's data
      updatePokemonData(currentPokemon);

      // Increment the index and wrap around if necessary
      index = (index + 1) % filteredData.length;
    }

    // Call the updateDisplayedPokemon function initially
    updateDisplayedPokemon();

    // Function to update the displayed Pokemon data
    function updateDisplayedPokemonReverse() {
      if (index > 0) {
        // Get the current Pokemon
        const currentPokemon = data[index];

        // Update the HTML with the current Pokemon's data
        updatePokemonData(currentPokemon);

        // Increment the index and wrap around if necessary
        index = (index - 1) % data.length;
      }
    }

    // Call the updateDisplayedPokemon function initially
    updateDisplayedPokemon();
    displayAddedPokemon();

    // Add event listener to topcrossDiv
    topCrossDiv.addEventListener("click", updateDisplayedPokemon);
    botCrossDiv.addEventListener("click", updateDisplayedPokemonReverse);

    // Function to filter the data based on Pokemon type
    function filterDataByType(type) {
      filteredData = data.filter((pokemon) => pokemon.type.includes(type));
      index = 0; // Reset the index to the first Pokemon in the filtered data
      updateDisplayedPokemon();
    }

    // Add event listeners to the type buttons
    fireButton.addEventListener("click", () => filterDataByType("Fire"));
    waterButton.addEventListener("click", () => filterDataByType("Water"));
    electricButton.addEventListener("click", () =>
      filterDataByType("Electric")
    );
    grassButton.addEventListener("click", () => filterDataByType("Grass"));

    // Function to handle the click event on barButton1
    function handleBarButton1Click() {
      if (clickedPokemon.length < 4) {
        const pokemonNameElement = document.getElementById("pokemon_name");
        const pokemonName = pokemonNameElement.textContent;
        clickedPokemon.push(pokemonName);
      }
      // Store the clickedPokemon array in local storage
      localStorage.setItem("clickedPokemon", JSON.stringify(clickedPokemon));

      displayAddedPokemon();
    }
    // Function to handle the click event on barButton2
    function handleBarButton2Click() {
      if (clickedPokemon.length > 0) {
        clickedPokemon.pop();
        displayAddedPokemon();
        // Store the updated clickedPokemon array in local storage
        localStorage.setItem("clickedPokemon", JSON.stringify(clickedPokemon));
      }
      console.log(clickedPokemon);
      console.log(storedClickedPokemon);
    }

    function displayAddedPokemon() {
      // Update the HTML with the updated clickedPokemon list

      yellowBox1.innerHTML = clickedPokemon
        .slice(0, 2)
        .map((name) => `<p>${name}</p>`)
        .join("");
      yellowBox2.innerHTML = clickedPokemon
        .slice(2)
        .map((name) => `<p>${name}</p>`)
        .join("");
    }

    // Add event listeners to barButton1 and barButton2
    barButton1.addEventListener("click", handleBarButton1Click);
    barButton2.addEventListener("click", handleBarButton2Click);

    // Load the clickedPokemon array from local storage

    // if (storedClickedPokemon) {
    //   if (storedClickedPokemon.length < 2) {
    //     clickedPokemon = JSON.parse(storedClickedPokemon);
    //     yellowBox1.innerHTML = clickedPokemon
    //       .map((name) => `<p>${name}</p>`)
    //       .join("");
    //   } else {
    //     clickedPokemon = JSON.parse(storedClickedPokemon);
    //     yellowBox2.innerHTML = clickedPokemon
    //       .map((name) => `<p>${name}</p>`)
    //       .join("");
    //   }
    // }
  })

  .catch((error) => {
    console.log("Error:", error);
  });
