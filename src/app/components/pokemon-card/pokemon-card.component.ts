import { Component, Input } from '@angular/core';
import { POKEMON_TYPES } from '../../constants/pokemon-types';
import { Pokemon } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../utils/capitalize.pipe';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-pokemon-card',
  imports: [CommonModule, ProgressBarComponent, CapitalizePipe],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;

  get pokemonTypeColor(): string {
    const type = this.pokemon.types?.[0] || 'normal';
    return `var(--${type})`;
  }

  get returnPokemonTypes(): string {
    const translatedTypes =
      this.pokemon?.types?.map((type) => POKEMON_TYPES[type] || type) || [];

    return translatedTypes.join('/');
  }
}
