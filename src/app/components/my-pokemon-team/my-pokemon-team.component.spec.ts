import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPokemonTeamComponent } from './my-pokemon-team.component';

describe('MyPokemonTeamComponent', () => {
  let component: MyPokemonTeamComponent;
  let fixture: ComponentFixture<MyPokemonTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPokemonTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPokemonTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
