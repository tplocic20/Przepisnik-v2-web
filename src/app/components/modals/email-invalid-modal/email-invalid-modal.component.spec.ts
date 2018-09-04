import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailInvalidModalComponent } from './email-invalid-modal.component';

describe('EmailInvalidModalComponent', () => {
  let component: EmailInvalidModalComponent;
  let fixture: ComponentFixture<EmailInvalidModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailInvalidModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailInvalidModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
