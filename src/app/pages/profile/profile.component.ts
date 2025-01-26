import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { TrainerFormComponent } from '../../components/trainer-form/trainer-form.component';
import { TrainerPhotoComponent } from '../../components/trainer-photo/trainer-photo.component';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';
import { Trainer } from '../../models/trainer.model';
import { TrainerService } from '../../services/trainer.service';
import { MyPokemonTeamComponent } from '../../components/my-pokemon-team/my-pokemon-team.component';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    MatIcon,
    TrainerPhotoComponent,
    MyPokemonTeamComponent,
    PokemonListComponent,
    TrainerFormComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  trainer!: Trainer;
  isEditing = false;
  editingPokemon = false;
  trainerPhoto: string | null = null;
  pokemonList: Pokemon[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private trainerService: TrainerService,
    private toastr: ToastrService
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

  onEditProfile() {
    this.trainerPhoto = this.trainer.photo;
    this.isEditing = !this.isEditing;
  }

  onEditPokemon(value: boolean) {
    this.editingPokemon = value;
  }

  handlePhotoUpload(photo: string | null): void {
    this.trainerPhoto = photo;
  }

  updateTrainerData(formData?: Partial<Trainer>): void {
    if (!this.trainerPhoto) {
      this.toastr.error('Por favor, seleccione una foto');
      return;
    }

    const fullTrainerData = {
      ...formData,
      photo: this.trainerPhoto,
      isLogged: true,
    };

    this.trainerService.updateTrainer(fullTrainerData);
    this.isEditing = false;
  }
}
