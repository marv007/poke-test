import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerPhotoComponent } from './trainer-photo.component';

describe('TrainerPhotoComponent', () => {
  let component: TrainerPhotoComponent;
  let fixture: ComponentFixture<TrainerPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerPhotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
