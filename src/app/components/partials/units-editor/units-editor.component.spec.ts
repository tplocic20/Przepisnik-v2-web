import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsEditorComponent } from './units-editor.component';

describe('UnitsEditorComponent', () => {
  let component: UnitsEditorComponent;
  let fixture: ComponentFixture<UnitsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
