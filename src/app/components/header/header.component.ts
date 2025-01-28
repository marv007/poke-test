import { Component, OnDestroy, OnInit } from '@angular/core';
import { images } from '../../utils/images';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Trainer } from '../../models/trainer.model';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TrainerService } from '../../services/trainer.service';
import { PokemonLocalService } from '../../services/pokemon-local.service';

@Component({
  selector: 'app-header',
  imports: [MatIcon, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit, OnDestroy {
  logo = images.logo;
  trainer: Trainer | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private trainerService: TrainerService,
    private pokemonLocalService: PokemonLocalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.trainerService.trainer$
      .pipe(takeUntil(this.destroy$))
      .subscribe((trainer) => {
        this.trainer = trainer;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  logout(): void {
    this.trainerService.logout();
    this.pokemonLocalService.cleanLocalPokemonList();

    this.router.navigate(['/']);
  }

  onSelect(event: Event): void {
    event.preventDefault();
    const { value } = event.target as HTMLSelectElement;

    if (value === 'close') {
      this.logout();
    }
  }
}

