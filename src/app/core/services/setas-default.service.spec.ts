import { TestBed } from '@angular/core/testing';

import { SetasDefaultService } from './setas-default.service';

describe('SetasDefaultService', () => {
  let service: SetasDefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetasDefaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
