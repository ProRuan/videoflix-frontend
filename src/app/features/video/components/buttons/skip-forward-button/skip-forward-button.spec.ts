import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipForwardButton } from './skip-forward-button';

describe('SkipForwardButton', () => {
  let component: SkipForwardButton;
  let fixture: ComponentFixture<SkipForwardButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkipForwardButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkipForwardButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
