import { TestBed } from '@angular/core/testing';

import { IndepthService } from './indepth.service';

describe('IndepthService', () => {
  let service: IndepthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndepthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
