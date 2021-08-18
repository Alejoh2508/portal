import { TestBed } from '@angular/core/testing';

import { ServicioNoticiasService } from './servicio-noticias.service';

describe('ServicioNoticiasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioNoticiasService = TestBed.get(ServicioNoticiasService);
    expect(service).toBeTruthy();
  });
});
