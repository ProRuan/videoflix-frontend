import { TestBed } from '@angular/core/testing';

import { QualityLevelController } from './quality-level-controller';

describe('QualityLevelController', () => {
  let service: QualityLevelController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualityLevelController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
