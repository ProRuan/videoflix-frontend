import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenStatePage } from './token-state-page';

describe('TokenStatePage', () => {
  let component: TokenStatePage;
  let fixture: ComponentFixture<TokenStatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenStatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenStatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
