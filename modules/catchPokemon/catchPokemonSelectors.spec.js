import { Selector } from 'redux-testkit';

import * as uut from './catchPokemonSelectors';
import * as testData from '../../data/testDataV2';

describe('search pokemon selectors', () => {
  const pokemons = testData.getPokemons();
  const bulbasaur = testData.getBulbasaur();
  const allData = testData.getAll();
  const pokemonTypes = testData.getPokemonTypes();
  const fastMoves = testData.getFastMoves();
  const chargeMoves = testData.getChargeMoves();

  describe('selectCatchPokemons()', () => {
    it('should select all catch pokemons', () => {
      const state = {
        pokemon: allData,
        catchPokemon: {
          searchText: undefined,
          catchPokemons: [{
            pokemonId: bulbasaur.id,
            fastMoveId: 'VINE_WHIP_FAST',
            chargeMoveId: 'POWER_WHIP',
          }],
        },
      };
      const result = [{
        ...pokemons.BULBASAUR,
        pokemonType1: pokemonTypes.POKEMON_TYPE_GRASS,
        pokemonType2: pokemonTypes.POKEMON_TYPE_POISON,
        selectedFastMove: { ...fastMoves.VINE_WHIP_FAST, typeImageKey: 'grass' },
        selectedChargeMove: { ...chargeMoves.POWER_WHIP, typeImageKey: 'grass' },
      }];
      Selector(uut.selectCatchPokemons).expect(state).toReturn(result);
    });
  });

  describe('selectDefaultFastMoveIdForPokemon()', () => {
    it('should select default (best) fast move id', () => {
      const state = { pokemon: allData };
      Selector(uut.selectDefaultFastMoveIdForPokemon).expect(state, bulbasaur.id).toReturn('VINE_WHIP_FAST');
    });
  });

  describe('selectDefaultChargeMoveIdForPokemon()', () => {
    it('should select default (best) charge move id', () => {
      const state = { pokemon: allData };
      Selector(uut.selectDefaultChargeMoveIdForPokemon).expect(state, bulbasaur.id).toReturn('POWER_WHIP');
    });
  });

  describe('selectAddPokemon()', () => {
    it('should select default (best) charge move id', () => {
      const state = {
        pokemon: allData,
        catchPokemon: {
          addPokemon: {
            pokemonId: bulbasaur.id,
            fastMoveId: 'TACKLE_FAST',
            chargeMoveId: 'SEED_BOMB',
          },
        },
      };
      const result = {
        ...bulbasaur,
        selectedFastMove: { ...fastMoves.TACKLE_FAST, typeImageKey: 'normal' },
        selectedChargeMove: { ...chargeMoves.SEED_BOMB, typeImageKey: 'grass' },
        fastMoves: [
          { ...fastMoves.TACKLE_FAST, selected: true, typeImageKey: 'normal' },
          { ...fastMoves.VINE_WHIP_FAST, selected: false, typeImageKey: 'grass' },
        ],
        chargeMoves: [
          { ...chargeMoves.POWER_WHIP, selected: false, typeImageKey: 'grass' },
          { ...chargeMoves.SEED_BOMB, selected: true, typeImageKey: 'grass' },
          { ...chargeMoves.SLUDGE_BOMB, selected: false, typeImageKey: 'poison' },
        ],
      };
      Selector(uut.selectAddPokemon).expect(state).toReturn(result);
    });
  });
});
