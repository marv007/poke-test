import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TrainerFormComponent } from "../../components/trainer-form/trainer-form.component";
import { Trainer } from '../../models/trainer.model';
import { TrainerPhotoComponent } from '../../components/trainer-photo/trainer-photo.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrainerService } from '../../services/trainer.service';

@Component({
  selector: 'app-trainer',
  imports: [MatIcon, TrainerFormComponent, TrainerPhotoComponent],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.scss'
})
export class TrainerComponent {
  trainerPhoto: string | null = null;
  constructor(
    private trainerService: TrainerService,
    private toastr: ToastrService,
    private router: Router
  ){}

  saveTrainerData(formData: Trainer): void {
    if (!this.trainerPhoto) {
      this.toastr.error('Por favor, seleccione una foto');
      return;
    }

    const fullTrainerData = {
      ...formData,
      isLogged: false,
      photo: this.trainerPhoto,
    };

    this.trainerService.createTrainer(fullTrainerData);

    //this.router.navigate(['/pokemon-selection']);
  }

  handlePhotoUpload(photo: string | null): void {
    this.trainerPhoto = photo;
  }

}


