import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotescontainerComponent } from './notescontainer.component';

describe('NotescontainerComponent', () => {
  let component: NotescontainerComponent;
  let fixture: ComponentFixture<NotescontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotescontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotescontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
