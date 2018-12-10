// https://pokeapi.co/api/v2/pokemon/
// https://pokeapi.co/api/v2/pokemon/ditto/
// https://pokeapi.co/api/v2/pokemon/1/
// https://pokeapi.co/api/v2/ability/4/
// https://pokeapi.co/api/v2/type/4/

import axios from "axios";

// types describing result from pokeapi (note: not exported)
interface IPokemonListResult {
    results: IPokemonListItem[];
}

interface IPokemonResult {
    name: string;
    weight: number;
    abilities: IAbility[];
    sprites: { front_default: string };
}

export interface IPokemonList {
    list: IPokemonListItem[];
}

export interface IPokemonListItem {
    name: string;
    url: string;
}

export interface IPokemon {
    name: string;
    weight: number;
    image: string;
    abilities: IAbility[];
}

export interface IAbility {
    abilities: {
        name: string;
        description: string;
    };
    is_hidden: boolean;
    slot: number;
}

export class PokemonAPI {
    readonly url: string = 'https://pokeapi.co/api/v2/pokemon';

    public async getPokemonList(): Promise<IPokemonList> {
        // tip RS: Use typed version of axios.get to get type safety
        const response = await axios.get<IPokemonListResult>(`${this.url}/`);
        return new Promise<IPokemonList>((resolve) =>
            resolve({
                list: response.data.results
            })
        );
    }

    public async getPokemonById(index: number): Promise<IPokemon> {
        // tip RS: Like above, use typed API
        const response = await axios.get<IPokemonResult>(`${this.url}/${index}/`);
        const result = response.data;

        let pokemon: IPokemon = {
            name: result.name,
            weight: result.weight,
            image: result.sprites.front_default,
            abilities: result.abilities
        };

        // tip RS: Do not create a new Promise here. Because you already have "await" in
        //         the function, you can just return the Pokemon
        return pokemon;
    }

    public async getPokemonByName(name: string): Promise<IPokemon> {
        // Same as above
        const response = await axios.get<IPokemonResult>(`${this.url}/${name}/`);
        const result = response.data;

        let pokemon = {
            name: result.name,
            weight: result.weight,
            image: result.sprites.front_default,
            abilities: result.abilities
        };

        // Same as above
        return pokemon;
    }
}
