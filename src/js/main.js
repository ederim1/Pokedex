// fetch("https://pokebattleapi.onrender.com/pokemon")
//   .then((response) => response.json())
//   .then((pokemonData) => {
//     const pokemonContainer = document.getElementById("pokemon-container");

//     pokemonData.forEach((pokemon) => {
//       const card = document.createElement("div");
//       card.classList.add("card");

//       const name = document.createElement("div");
//       name.classList.add("name");
//       name.textContent = pokemon.name;
//       card.appendChild(name);

//       const type = document.createElement("div");
//       type.classList.add("type");
//       type.textContent = "Type: " + pokemon.type.join(", ");
//       card.appendChild(type);

//       const hp = document.createElement("div");
//       hp.classList.add("attribute");
//       hp.textContent = "HP: " + pokemon.hp;
//       card.appendChild(hp);

//       const weight = document.createElement("div");
//       weight.classList.add("attribute");
//       weight.textContent = "Weight: " + pokemon.weight;
//       card.appendChild(weight);

//       const height = document.createElement("div");
//       height.classList.add("attribute");
//       height.textContent = "Height: " + pokemon.height;
//       card.appendChild(height);

//       const moves = document.createElement("div");
//       moves.classList.add("moves");
//       moves.textContent = "Moves:";
//       pokemon.moves.forEach((move) => {
//         const moveElement = document.createElement("div");
//         moveElement.classList.add("move");
//         moveElement.textContent =
//           move.name + " (Damage: " + move.damage + ") - " + move.text;
//         moves.appendChild(moveElement);
//       });
//       card.appendChild(moves);

//       const weaknesses = document.createElement("div");
//       weaknesses.classList.add("weaknesses");
//       weaknesses.textContent = "Weaknesses:";
//       pokemon.weaknesses.forEach((weakness) => {
//         const weaknessElement = document.createElement("div");
//         weaknessElement.textContent =
//           weakness.type + " (Value: " + weakness.value + ")";
//         weaknesses.appendChild(weaknessElement);
//       });
//       card.appendChild(weaknesses);

//       const resistances = document.createElement("div");
//       resistances.classList.add("resistances");
//       resistances.textContent = "Resistances:";
//       pokemon.resistances.forEach((resistance) => {
//         const resistanceElement = document.createElement("div");
//         resistanceElement.textContent =
//           resistance.type + " (Value: " + resistance.value + ")";
//         resistances.appendChild(resistanceElement);
//       });
//       card.appendChild(resistances);

//       pokemonContainer.appendChild(card);
//     });
//   });

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
      const pokemonNameElement = document.getElementById("pokemon_name");
      const pokemonName = pokemonNameElement.textContent;
      clickedPokemon.push(pokemonName);

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
