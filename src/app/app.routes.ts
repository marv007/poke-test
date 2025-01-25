import { Routes } from '@angular/router';
import { TrainerComponent } from './pages/trainer/trainer.component';
import { PokemonSelectionComponent } from './pages/pokemon-selection/pokemon-selection.component';

export const routes: Routes = [
  { path: '', component: TrainerComponent },
  {
    path: 'pokemon-selection', component: PokemonSelectionComponent
  }
];
