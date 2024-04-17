import { TestBed } from '@angular/core/testing';

import { NucleoServiceService } from './nucleo.service.service';

describe('NucleoServiceService', () => {
  let service: NucleoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NucleoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
