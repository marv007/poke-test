import { Pokemon } from './pokemon.model';

export interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
