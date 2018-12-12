import * as uut from './againstPokemon';
import * as testData from '../../data/testDataV2';


describe('pokemon', () => {
  const pokemonTypes = testData.getPokemonTypes();
  const typeEffectives = testData.getTypeEffectives();
  const bulbasaur = testData.getBulbasaur();
  const charmander = testData.getCharmander();
  const bulbasaurDefenceTypeEffective = testData.getBulbasaurDefenceTypeEffective();
  const charmanderDefenceTypeEffective = testData.getCharmanderDefenceTypeEffective();

  describe('assignDefenceTypeEffective()', () => {
    it('should return bulbasaur with defenceTypeEffective', () => {
      const result = {
        ...bulbasaur,
        defenceTypeEffective: bulbasaurDefenceTypeEffective,
      };
      expect(uut.assignDefenceTypeEffective(pokemonTypes, typeEffectives, bulbasaur)).toEqual(result);
    });

    it('should return pokemon with defenceTypeEffective', () => {
      const result = {
        ...charmander,
        defenceTypeEffective: charmanderDefenceTypeEffective,
      };
      expect(uut.assignDefenceTypeEffective(pokemonTypes, typeEffectives, charmander)).toEqual(result);
    });
  });
});
