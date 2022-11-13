import { TestBed } from '@angular/core/testing';

import { EditBrokerService } from './edit-broker.service';

describe('EditBrokerService', () => {
  let service: EditBrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditBrokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
