import { Routes } from '@angular/router';
import { TrainerComponent } from './pages/trainer/trainer.component';
import { PokemonSelectionComponent } from './pages/pokemon-selection/pokemon-selection.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ErrorComponent } from './pages/error/error.component';
import { trainerGuard } from './guards/trainer.guard';

export const routes: Routes = [
  { path: '', component: TrainerComponent },
  {
    path: 'pokemon-selection',
    component: PokemonSelectionComponent,
    canActivate: [trainerGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [trainerGuard],
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: '/error',
  },
];
