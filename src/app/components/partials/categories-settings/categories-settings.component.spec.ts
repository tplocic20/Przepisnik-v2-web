import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSettingsComponent } from './categories-settings.component';

describe('CategoriesSettingsComponent', () => {
  let component: CategoriesSettingsComponent;
  let fixture: ComponentFixture<CategoriesSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
