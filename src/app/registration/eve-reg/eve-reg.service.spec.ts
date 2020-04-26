import { TestBed } from '@angular/core/testing';

import { EveRegService } from './eve-reg.service';

describe('EveRegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EveRegService = TestBed.get(EveRegService);
    expect(service).toBeTruthy();
  });
});
