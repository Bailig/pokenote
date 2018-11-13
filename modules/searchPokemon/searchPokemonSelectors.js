import _ from 'lodash';

export const selectPokemons = state => _.orderBy(state.pokemon.pokemons, 'dex');
