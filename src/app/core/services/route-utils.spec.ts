import { TestBed } from '@angular/core/testing';

import { RouteUtils } from './route-utils';

describe('RouteUtils', () => {
  let service: RouteUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteUtils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
