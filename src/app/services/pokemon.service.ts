import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PokemonList } from '../models/pokemon-list.model';
import { PokeApiSingleResponse } from '../models/pokeapi.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPokemonList(offset: number, limit: number) {
    return this.http.get<PokemonList>(
      `${this.apiUrl}/pokemon?offset=${offset}&limit=${limit}`
    );
  }

  getPokemonDetail(url: string) {
    return this.http.get<PokeApiSingleResponse>(url);
  }

  searchPokemon(query: string) {
    return this.http.get<PokeApiSingleResponse>(
      `${this.apiUrl}/pokemon/${query}`
    );
  }
}
