import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeControl } from './volume-control';

describe('VolumeControl', () => {
  let component: VolumeControl;
  let fixture: ComponentFixture<VolumeControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolumeControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolumeControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
