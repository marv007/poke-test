import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trainer } from '../../models/trainer.model';
import { images } from '../../utils/images';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-trainer-photo',
  imports: [CommonModule, MatIconModule],
  templateUrl: './trainer-photo.component.html',
  styleUrl: './trainer-photo.component.scss'
})

export class TrainerPhotoComponent implements OnInit {
  @Input() isEditing = false;
  @Input() trainer!: Trainer;
  @Output() photoSrc = new EventEmitter<string | null>();
  imgSrc: string = this.trainer ? this.trainer.photo : '';
  imgName = '';
  avatarPlaceholder = images.user;
  medal = images.medal;

  ngOnInit(): void {
    this.imgSrc = this.trainer ? this.trainer.photo : '';
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imgSrc = reader.result as string;
        this.imgName = file.name;
        this.photoSrc.emit(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto() {
    this.imgSrc = '';
    this.imgName = '';
    this.photoSrc.emit(null);
  }
}
