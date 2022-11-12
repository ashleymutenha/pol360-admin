import { TestBed } from '@angular/core/testing';

import { DeleteBrokerService } from './delete-broker.service';

describe('DeleteBrokerService', () => {
  let service: DeleteBrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteBrokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
