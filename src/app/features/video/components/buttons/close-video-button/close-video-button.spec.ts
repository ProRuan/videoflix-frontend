import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseVideoButton } from './close-video-button';

describe('CloseVideoButton', () => {
  let component: CloseVideoButton;
  let fixture: ComponentFixture<CloseVideoButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseVideoButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseVideoButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
