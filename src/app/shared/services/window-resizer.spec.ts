import { TestBed } from '@angular/core/testing';

import { WindowResizer } from './window-resizer';

describe('WindowResizer', () => {
  let service: WindowResizer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowResizer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
