import { TestBed } from '@angular/core/testing';

import { PageNavigator } from './page-navigator';

describe('PageNavigator', () => {
  let service: PageNavigator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageNavigator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
