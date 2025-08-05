import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Startsite } from './startsite';

describe('Startsite', () => {
  let component: Startsite;
  let fixture: ComponentFixture<Startsite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Startsite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Startsite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
