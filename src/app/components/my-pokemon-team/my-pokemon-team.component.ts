import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-my-pokemon-team',
  imports: [CommonModule, PokemonCardComponent],
  templateUrl: './my-pokemon-team.component.html',
  styleUrl: './my-pokemon-team.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyPokemonTeamComponent {
  @Input() selectedPokemon: Pokemon[] = [];
}
