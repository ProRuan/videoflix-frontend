import { TestBed } from '@angular/core/testing';

import { DialogConfigurator } from './dialog-configurator';

describe('DialogConfigurator', () => {
  let service: DialogConfigurator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogConfigurator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
