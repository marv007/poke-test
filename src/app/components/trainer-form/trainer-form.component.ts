import { HOBBIES } from './../../mocks/hobbies';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trainer } from '../../models/trainer.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchInputComponent } from '../search-input/search-input.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trainer-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SearchInputComponent,
  ],
  templateUrl: './trainer-form.component.html',
  styleUrl: './trainer-form.component.scss'
})
export class TrainerFormComponent implements OnInit{
  @Input() trainer!: Trainer;
  @Output() saveForm = new EventEmitter<Trainer>();
  hobbies = HOBBIES;
  trainerForm: FormGroup;
  age = 19;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.trainerForm = this.formBuilder.group({
      name: ['', Validators.required],
      hobby: [''],
      birthday: ['', Validators.required],
      document: [''],
    });
  }
  ngOnInit(): void {
    if (this.trainer) {
      this.trainerForm.patchValue(this.trainer);
    }
  }

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const maskedValue = this.applyMask(inputElement.value);
    this.trainerForm
      .get('document')
      ?.setValue(maskedValue, { emitEvent: false });
  }

  applyMask(text: string) {
    const numericValue = text.replace(/[^0-9]/g, '');

    let maskedValue = numericValue;
    if (numericValue.length > 8) {
      maskedValue = numericValue.slice(0, 8) + '-' + numericValue.slice(8, 9);
    }

    return maskedValue;
  }

  onBirthdayChange(): void {
    const birthdayControl = this.trainerForm.get('birthday');
    const documentControl = this.trainerForm.get('document');

    if (birthdayControl?.value) {
      const age = this.returnAge(new Date(birthdayControl.value));
      this.age = age;

      if (age >= 18) {
        documentControl?.setValidators([Validators.required, Validators.minLength(10)]);
      } else {
        documentControl?.clearValidators();
      }

      documentControl?.updateValueAndValidity();
    }
  }

  returnAge(birthday: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthday.getDate())
    ) {
      age--;
    }

    return age;
  }

  onSubmit(): void {
    if (this.trainerForm.valid) {
      const trainer = this.trainerForm.value;

      this.saveForm.emit({
        ...trainer,
        age: this.age,
      });

      this.trainerForm.reset();
    } else {
      this.toastr.error('Formulario inválido, por favor revise los campos');
    }
  }
}
