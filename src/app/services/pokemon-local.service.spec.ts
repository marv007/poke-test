import { TestBed } from '@angular/core/testing';

import { PokemonLocalService } from './pokemon-local.service';

describe('PokemonLocalService', () => {
  let service: PokemonLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
