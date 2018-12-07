import '../css/styles.css';
import '../css/fonts.css';

import axios from 'axios';
import jquery from 'jquery';
import 'bootstrap'


//
// Requests
//
axios.get('https://pokeapi.co/api/v2/pokemon/')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

//
//
//