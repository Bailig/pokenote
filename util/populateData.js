const { database, initializeApp } = require('firebase');

const firebaseConfig = {
  apiKey: 'AIzaSyDwf4qlYXy2QbYYgB0Wn5JSms_nAaVOROU',
  authDomain: 'pokenote-2b37c.firebaseapp.com',
  databaseURL: 'https://pokenote-2b37c.firebaseio.com',
  projectId: 'pokenote-2b37c',
  storageBucket: 'pokenote-2b37c.appspot.com',
  messagingSenderId: '626790370928',
};
initializeApp(firebaseConfig);

const populateData = () => {
  const pokemon = require('../data/output/pokemon.json');
  const pokemonType = require('../data/output/pokemonType.json');
  const pokemonMove = require('../data/output/pokemonMove.json');
  database().ref('pokemon').set(pokemon);
  database().ref('pokemonType').set(pokemonType);
  database().ref('pokemonMove').set(pokemonMove);
};

const populateV2Data = () => {
  const chargeMove = require('../data/output/v2/chargeMove.json');
  const fastMove = require('../data/output/v2/fastMove.json');
  const pokemon = require('../data/output/v2/pokemon.json');
  const pokemonChargeMove = require('../data/output/v2/pokemonChargeMove.json');
  const pokemonFastMove = require('../data/output/v2/pokemonFastMove.json');
  const pokemonType = require('../data/output/v2/pokemonType.json');
  const typeEffective = require('../data/output/v2/typeEffective.json');
  database().ref('chargeMove').set(chargeMove);
  database().ref('fastMove').set(fastMove);
  database().ref('pokemon').set(pokemon);
  database().ref('pokemonChargeMove').set(pokemonChargeMove);
  database().ref('pokemonFastMove').set(pokemonFastMove);
  database().ref('pokemonType').set(pokemonType);
  database().ref('typeEffective').set(typeEffective);
};

// populateData();
populateV2Data();
