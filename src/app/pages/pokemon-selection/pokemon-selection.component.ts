import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, forkJoin, finalize } from 'rxjs';
import { Trainer } from '../../models/trainer.model';
import { TrainerService } from '../../services/trainer.service';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonLocalService } from '../../services/pokemon-local.service';
import { PokemonList } from '../../models/pokemon-list.model';
import { PokeApiSingleResponse, PokeStats, PokeTypes } from '../../models/pokeapi.model';
import { POKEMON_STATS } from '../../constants/pokemon-stats';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TrainerPhotoComponent } from '../../components/trainer-photo/trainer-photo.component';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-pokemon-selection',
  imports: [
    CommonModule,
    MatIcon,
    LoadingScreenComponent,
    TrainerPhotoComponent,
    PokemonListComponent,
  ],
  templateUrl: './pokemon-selection.component.html',
  styleUrl: './pokemon-selection.component.scss'
})

export class PokemonSelectionComponent implements OnInit, OnDestroy {
  isLoading = true;
  trainer!: Trainer;
  offset = 0;
  limit = 151;
  pokemonList: Pokemon[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private trainerService: TrainerService,
    private router: Router,
    private toastr: ToastrService,
    private pokemonService: PokemonService,
    private pokemonLocalService: PokemonLocalService
  ) {}

  ngOnInit(): void {
    this.loadPokemon();

    this.trainerService.trainer$.subscribe((trainer) => {
      this.trainer = trainer;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  loadPokemon() {
    this.pokemonService.getPokemonList(this.offset, this.limit).subscribe({
      next: (response: PokemonList) => {
        const pokemonUrls = response.results.map((p: Pokemon) => p.url);

        const detailRequests = pokemonUrls.map((url: string) =>
          this.pokemonService.getPokemonDetail(url)
        );

        forkJoin<PokeApiSingleResponse[]>(detailRequests)
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe({
            next: (details: PokeApiSingleResponse[]) => {
              const newPokemonList = details.map(
                (detail: PokeApiSingleResponse, index: number) => ({
                  name: detail.name,
                  url: pokemonUrls[index],
                  sprite: detail.sprites.other.home.front_default,
                  index: detail.id,
                  types: detail.types.map((t: PokeTypes) => t.type.name),
                  stats: detail.stats.map((s: PokeStats) => {
                    return {
                      key: s.stat.name,
                      name: POKEMON_STATS[s.stat.name].label,
                      value: s.base_stat,
                      defaultValue: POKEMON_STATS[s.stat.name].defaultValue,
                    };
                  }),
                })
              );

              this.pokemonList = [...this.pokemonList, ...newPokemonList];
              this.pokemonLocalService.createLocalPokemonList(this.pokemonList);
            },
            error: () => {
              this.toastr.error('Error al cargar los Pokémon');
            },
          });
      },
    });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
