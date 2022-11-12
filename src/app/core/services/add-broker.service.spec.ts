import { TestBed } from '@angular/core/testing';

import { AddBrokerService } from './add-broker.service';

describe('AddBrokerService', () => {
  let service: AddBrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBrokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
