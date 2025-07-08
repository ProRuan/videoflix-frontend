import { TestBed } from '@angular/core/testing';

import { InputValidation } from './input-validation';

describe('InputValidation', () => {
  let service: InputValidation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputValidation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
