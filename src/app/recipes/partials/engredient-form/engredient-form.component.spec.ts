import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngredientFormComponent } from './engredient-form.component';

describe('EngredientFormComponent', () => {
  let component: EngredientFormComponent;
  let fixture: ComponentFixture<EngredientFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngredientFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngredientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
