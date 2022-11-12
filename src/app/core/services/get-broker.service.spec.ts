import { TestBed } from '@angular/core/testing';

import { GetBrokerService } from './get-broker.service';

describe('GetBrokerService', () => {
  let service: GetBrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBrokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
