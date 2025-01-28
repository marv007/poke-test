import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TrainerService } from '../services/trainer.service';

export const trainerGuard: CanActivateFn = (route, state) => {
  const trainerService = inject(TrainerService);
  const router = inject(Router);

  if (!trainerService.checkIfTrainerExists()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
