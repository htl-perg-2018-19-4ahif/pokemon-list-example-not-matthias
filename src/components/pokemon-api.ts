// https://pokeapi.co/api/v2/pokemon/
// https://pokeapi.co/api/v2/pokemon/ditto/
// https://pokeapi.co/api/v2/pokemon/1/
// https://pokeapi.co/api/v2/ability/4/
// https://pokeapi.co/api/v2/type/4/

import axios from 'axios';

//
// Response Interfaces
//
interface IPokemonListResponse {
    count: number;
    next: any;
    previous: any;
    results: IPokemonListItem[];
}

interface IPokemonResponse {
    abilities: IAbility[];
    base_experience: number;
    forms: any[];
    game_indices: any[];
    height: number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: any[];
    name: string;
    order: number;
    species: { name: string; url: string };
    sprites: {
        back_default: string;
        back_female: string;
        back_shiny: string;
        back_shiny_female: string;
        front_default: string;
    };
    stats: any[];
    types: any[];
    weight: number;
}

//
// Custom Interfaces
//
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
        const response = await axios.get<IPokemonListResponse>(`${this.url}/`);

        return new Promise<IPokemonList>((resolve) =>
            resolve({
                list: response.data.results
            })
        );
    }

    public async getPokemonById(index: number): Promise<IPokemon> {
        const response = await axios.get<IPokemonResponse>(`${this.url}/${index}/`);
        const result = response.data;

        let pokemon: IPokemon = {
            name: result.name,
            weight: result.weight,
            image: result.sprites.front_default,
            abilities: result.abilities
        };

        return pokemon;
    }

    public async getPokemonByName(name: string): Promise<IPokemon> {
        const response = await axios.get<IPokemonResponse>(`${this.url}/${name}/`);
        const result = response.data;

        let pokemon = {
            name: result.name,
            weight: result.weight,
            image: result.sprites.front_default,
            abilities: result.abilities
        };
        
        return pokemon;
    }
}
