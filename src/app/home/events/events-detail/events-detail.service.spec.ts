import { TestBed } from '@angular/core/testing';

import { EventsDetailService } from './events-detail.service';

describe('EventsDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventsDetailService = TestBed.get(EventsDetailService);
    expect(service).toBeTruthy();
  });
});
