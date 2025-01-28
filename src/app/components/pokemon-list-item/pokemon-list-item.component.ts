import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';
import { FormatIndexPipe } from '../../utils/format-index.pipe';
import { FormatNamePipe } from '../../utils/format-name.pipe';

@Component({
  selector: 'app-pokemon-list-item',
  imports: [CommonModule, FormatIndexPipe, FormatNamePipe],
  templateUrl: './pokemon-list-item.component.html',
  styleUrl: './pokemon-list-item.component.scss'
})
export class PokemonListItemComponent {
  @Input()
  pokemon!: Pokemon;
  @Input() selected = false;
  @Input() disabled = false;
}
