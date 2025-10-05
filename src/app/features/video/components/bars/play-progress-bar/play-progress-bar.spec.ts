import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayProgressBar } from './play-progress-bar';

describe('PlayProgressBar', () => {
  let component: PlayProgressBar;
  let fixture: ComponentFixture<PlayProgressBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayProgressBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayProgressBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
