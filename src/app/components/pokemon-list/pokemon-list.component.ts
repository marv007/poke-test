import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { TrainerService } from '../../services/trainer.service';
import { Router } from '@angular/router';
import { VirtualScrollComponent } from '../virtual-scroll/virtual-scroll.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, VirtualScrollComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent {
  @Input() isEditing = false;
  @Output() endEdit = new EventEmitter<boolean>();
  selectedPokemon: Pokemon[] = [];

  constructor(private trainerService: TrainerService, private router: Router) {}

  onSelectedPokemonChange(pokemon: Pokemon[]) {
    this.selectedPokemon = pokemon;
  }

  onAddToTeam() {
    const trainerData = this.trainerService.trainer$;

    const addData = {
      ...trainerData,
      poketeam: [...this.selectedPokemon],
      isLogged: true,
    };

    this.trainerService.updateTrainer(addData);
    this.selectedPokemon = [];

    if (!this.isEditing) this.router.navigate(['/profile']);
    if (this.isEditing) this.endEdit.emit(true);
  }
}
