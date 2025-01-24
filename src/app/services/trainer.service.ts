import { Injectable } from '@angular/core';
import { Trainer } from '../models/trainer.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor() { }
  private trainerSubject = new BehaviorSubject<Trainer>({
    name: '',
    birthDate: new Date(),
    photo: '',
    isLogged: false,
    age: 0,
    document: '',
    hobby: '',
    poketeam: [],
  });

  trainer$ = this.trainerSubject.asObservable();

  createTrainer(trainer: Trainer): void {
    this.trainerSubject.next(trainer);
  }

  updateTrainer(trainer: Partial<Trainer>): void {
    const currentTrainer = this.trainerSubject.value;
    this.trainerSubject.next({ ...currentTrainer, ...trainer });
  }

  checkIfTrainerExists(): boolean {
    const trainer = this.trainerSubject.value;
    return !!trainer.name;
  }

  logout(): void {
    this.trainerSubject.next({
      name: '',
      birthDate: new Date(),
      photo: '',
      isLogged: false,
      age: 0,
      document: '',
      hobby: '',
      poketeam: [],
    });
  }
}
