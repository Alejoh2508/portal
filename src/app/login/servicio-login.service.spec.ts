import { TestBed } from '@angular/core/testing';

import { ServicioLoginService } from './servicio-login.service';

describe('ServicioLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioLoginService = TestBed.get(ServicioLoginService);
    expect(service).toBeTruthy();
  });
});
