import '../css/styles.css';
import '../css/fonts.css';

import jquery from 'jquery';
import 'bootstrap';
import PokemonAPI from './pokemon-api';

//
// Variables
//
const api = new PokemonAPI();

//
//
//
api.getPokemonById(1).then(console.log)
