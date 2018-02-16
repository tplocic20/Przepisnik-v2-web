import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipescontainerComponent } from './recipescontainer.component';

describe('RecipescontainerComponent', () => {
  let component: RecipescontainerComponent;
  let fixture: ComponentFixture<RecipescontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipescontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipescontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
