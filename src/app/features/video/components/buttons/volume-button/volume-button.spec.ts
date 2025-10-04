import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeButton } from './volume-button';

describe('VolumeButton', () => {
  let component: VolumeButton;
  let fixture: ComponentFixture<VolumeButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolumeButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolumeButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
