import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngredientsEditorComponent } from './engredients-editor.component';

describe('EngredientsEditorComponent', () => {
  let component: EngredientsEditorComponent;
  let fixture: ComponentFixture<EngredientsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngredientsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngredientsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
