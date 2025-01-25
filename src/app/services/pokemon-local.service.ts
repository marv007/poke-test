import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonLocalService {

  constructor() { }
  private localPokemon = new BehaviorSubject<Pokemon[]>([]);

  localPokemon$ = this.localPokemon.asObservable();

  createLocalPokemonList(pokemonList: Pokemon[]): void {
    this.localPokemon.next(pokemonList);
  }

  cleanLocalPokemonList(): void {
    this.localPokemon.next([]);
  }
}
