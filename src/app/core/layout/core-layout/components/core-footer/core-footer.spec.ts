import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreFooter } from './core-footer';

describe('CoreFooter', () => {
  let component: CoreFooter;
  let fixture: ComponentFixture<CoreFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
