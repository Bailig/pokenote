import pokemons from '../../data/output/pokemon.json';
import pokemonMoves from '../../data/output/pokemonMove.json';
import pokemonTypes from '../../data/output/pokemonType.json';

export const LOAD_POKEMON = 'pokemon/LOAD_POKEMON';

export const loadPokemon = () => ({
  type: LOAD_POKEMON,
  payload: {
    pokemons,
    pokemonMoves,
    pokemonTypes,
  },
});
