import { TestBed } from '@angular/core/testing';

import { TokenPageConfigurator } from './token-page-configurator';

describe('TokenPageConfigurator', () => {
  let service: TokenPageConfigurator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenPageConfigurator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
