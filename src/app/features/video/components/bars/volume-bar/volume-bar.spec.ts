import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeBar } from './volume-bar';

describe('VolumeBar', () => {
  let component: VolumeBar;
  let fixture: ComponentFixture<VolumeBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolumeBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolumeBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
