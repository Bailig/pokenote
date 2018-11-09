const { database, initializeApp } = require('firebase');
const pokemon = require('../data/output/pokemon.json');
const pokemonType = require('../data/output/pokemonType.json');
const pokemonMove = require('../data/output/pokemonMove.json');

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
  database().ref('pokemon').set(pokemon);
  database().ref('pokemonType').set(pokemonType);
  database().ref('pokemonMove').set(pokemonMove);
};
populateData();
