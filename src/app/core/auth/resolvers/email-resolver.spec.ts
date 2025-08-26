import { TestBed } from '@angular/core/testing';

import { EmailResolver } from './email-resolver';

describe('EmailResolver', () => {
  let service: EmailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
