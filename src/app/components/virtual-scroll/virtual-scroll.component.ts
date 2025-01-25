import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { TrainerService } from '../../services/trainer.service';
import { PokemonLocalService } from '../../services/pokemon-local.service';
import { PokemonListItemComponent } from '../pokemon-list-item/pokemon-list-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-virtual-scroll',
  imports: [
    CommonModule,
    ScrollingModule,
    PokemonListItemComponent,
    MatProgressSpinnerModule,
    MatIcon,
  ],
  templateUrl: './virtual-scroll.component.html',
  styleUrl: './virtual-scroll.component.scss',
  providers: [PokemonService],
})
export class VirtualScrollComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  @Output() selectedPokemonChange = new EventEmitter<Pokemon[]>();
  pokemonList: Pokemon[] = [];
  private destroy$ = new Subject<void>();
  filteredPokemon: Pokemon[] = [];
  nextUrl: string | null = null;
  selectedPokemon: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
    private trainerService: TrainerService,
    private pokemonLocalService: PokemonLocalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.trainerService.trainer$
      .pipe(takeUntil(this.destroy$))
      .subscribe((trainer) => {
        if (trainer.poketeam) {
          this.selectedPokemon = trainer.poketeam;
        }
      });

    this.pokemonLocalService.localPokemon$
      .pipe(takeUntil(this.destroy$))
      .subscribe((localPokemon) => {
        this.pokemonList = localPokemon;
        this.filteredPokemon = this.pokemonList;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showIfSelected(pokemon: Pokemon): boolean {
    return (
      this.selectedPokemon.find((p) => p.index === pokemon.index) !== undefined
    );
  }

  onPokemonSelect(pokemon: Pokemon) {
    const exists = this.selectedPokemon.find((p) => p.index === pokemon.index);

    if (exists) {
      this.selectedPokemon = this.selectedPokemon.filter(
        (p) => p.index !== pokemon.index
      );
    } else {
      if (this.selectedPokemon.length === 3) return;
      this.selectedPokemon = [...this.selectedPokemon, pokemon];
    }

    this.selectedPokemonChange.emit(this.selectedPokemon);
  }

  onSearchPokemon(event: Event) {
    const text = (event.target as HTMLInputElement).value;

    if (text === '') {
      this.filteredPokemon = this.pokemonList;

      return;
    }

    this.filteredPokemon = this.pokemonList.filter(
      (p) =>
        p.name.includes(text.toLowerCase()) ||
        p.index?.toString().includes(text.toLowerCase())
    );
  }

  getIfDisabled (pokemon: Pokemon): boolean {
    return (
      this.selectedPokemon.find((p) => p.index === pokemon.index) === undefined
      && this.selectedPokemon.length === 3
    );
  }
}
