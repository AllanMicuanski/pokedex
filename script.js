const form = document.getElementById('search-form');
const input = document.getElementById('pokemon-input');
const container = document.getElementById('pokemon-container');
const pokemonList = document.getElementById('pokemon-list');
const refreshBtn = document.getElementById('refresh-btn');

const typeColors = {
  fire: '#f08030',
  water: '#6890f0',
  grass: '#78c850',
  electric: '#f8d030',
  psychic: '#f85888',
  normal: '#a8a878',
  flying: '#a890f0',
  bug: '#a8b820',
  poison: '#a040a0',
  ground: '#e0c068',
  rock: '#b8a038',
  ghost: '#705898',
  dark: '#705848',
  steel: '#b8b8d0',
  fairy: '#ee99ac',
  ice: '#98d8d8',
  dragon: '#7038f8',
  fighting: '#c03028',
};

const typeTranslations = {
  fire: 'Fogo',
  water: 'Água',
  grass: 'Planta',
  electric: 'Elétrico',
  psychic: 'Psíquico',
  normal: 'Normal',
  flying: 'Voador',
  bug: 'Inseto',
  poison: 'Veneno',
  ground: 'Terra',
  rock: 'Pedra',
  ghost: 'Fantasma',
  dark: 'Noturno',
  steel: 'Metal',
  fairy: 'Fada',
  ice: 'Gelo',
  dragon: 'Dragão',
  fighting: 'Lutador',
};

// Buscar os 5 primeiros Pokémon para autocomplete
fetch('https://pokeapi.co/api/v2/pokemon?limit=5')
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach((pokemon) => {
      const option = document.createElement('option');
      option.value = pokemon.name;
      pokemonList.appendChild(option);
    });
  });

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = input.value.toLowerCase().trim();
  container.innerHTML = '';
  fetchAndDisplayPokemon(query);
});

function fetchAndDisplayPokemon(query) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    .then((response) => {
      if (!response.ok) throw new Error('Pokémon não encontrado');
      return response.json();
    })
    .then((data) => {
      const card = document.createElement('div');
      card.className = 'card';

      const translatedTypes = data.types.map(
        (t) => typeTranslations[t.type.name] || t.type.name,
      );
      const bgColor = typeColors[data.types[0].type.name] || '#444';

      card.style.backgroundColor = bgColor;

      card.innerHTML = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p><strong>Altura:</strong> ${(data.height / 10).toFixed(1)} m</p>
        <p><strong>Peso:</strong> ${(data.weight / 10).toFixed(1)} kg</p>
        <p><strong>Tipo:</strong> ${translatedTypes.join(', ')}</p>
      `;
      container.appendChild(card);
    })
    .catch((error) => {
      container.innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`;
    });
}

// Mostrar Pokémon populares ao carregar
window.addEventListener('load', () => {
  const starters = ['pikachu', 'charmander', 'bulbasaur'];
  starters.forEach(fetchAndDisplayPokemon);
});

// Botão de resetar
refreshBtn.addEventListener('click', () => {
  input.value = '';
  container.innerHTML = '';
  const starters = ['pikachu', 'charmander', 'bulbasaur'];
  starters.forEach(fetchAndDisplayPokemon);
});
