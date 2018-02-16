import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipescontainerComponent } from './components/recipescontainer/recipescontainer.component';
import { CategoriesComponent } from './components/categories/categories.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RecipesListComponent, RecipescontainerComponent, CategoriesComponent],
  exports: [RecipesListComponent, RecipescontainerComponent, CategoriesComponent]
})
export class RecipesModule { }
