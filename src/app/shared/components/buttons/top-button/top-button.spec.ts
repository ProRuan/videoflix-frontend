import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopButton } from './top-button';

describe('TopButton', () => {
  let component: TopButton;
  let fixture: ComponentFixture<TopButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
