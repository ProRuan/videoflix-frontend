import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkHeader } from './link-header';

describe('LinkHeader', () => {
  let component: LinkHeader;
  let fixture: ComponentFixture<LinkHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
