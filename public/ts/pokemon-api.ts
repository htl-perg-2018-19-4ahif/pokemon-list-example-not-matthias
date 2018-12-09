// https://pokeapi.co/api/v2/pokemon/
// https://pokeapi.co/api/v2/pokemon/ditto/
// https://pokeapi.co/api/v2/pokemon/1/
// https://pokeapi.co/api/v2/ability/4/
// https://pokeapi.co/api/v2/type/4/

import axios from 'axios';

interface PokemonList {
    list: PokemonListItem[];
}

interface PokemonListItem {
    name: string;
    url: string;
}

interface Pokemon {
    name: string;
    weight: number;
    image: string;
    abilities: Ability[];
}

interface Ability {
    abilities: {
        name: string;
        description: string;
    };
    is_hidden: boolean;
    slot: number;
}

export default class PokemonAPI {
    readonly url: string = 'https://pokeapi.co/api/v2/pokemon';

    public async getPokemonList(): Promise<PokemonList> {
        const response = await axios.get(`${this.url}/`);
        return new Promise<PokemonList>((resolve) => resolve(response.data.results));
    }

    public async getPokemonById(index: number): Promise<Pokemon> {
        const response = await axios.get(`${this.url}/${index}/`);
        const result = response.data;

        let pokemon: Pokemon = {
            name: result.name,
            weight: result.weight,
            image: result.sprites.front_default,
            abilities: result.abilities
        };

        return new Promise<Pokemon>((resolve) => resolve(pokemon));
    }

    public async getPokemonByName(name: string): Promise<Pokemon> {
        const response = await axios.get(`${this.url}/${name}/`);
        const result = response.data;

        let pokemon = {
            name: result.name,
            weight: result.weight,
            image: result.sprites.front_default,
            abilities: result.abilities
        };

        return new Promise<Pokemon>((resolve) => resolve(pokemon));
    }
}
