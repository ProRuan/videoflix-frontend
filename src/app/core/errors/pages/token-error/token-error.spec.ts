import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenError } from './token-error';

describe('TokenError', () => {
  let component: TokenError;
  let fixture: ComponentFixture<TokenError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
