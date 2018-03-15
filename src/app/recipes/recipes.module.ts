import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipescontainerComponent } from './components/recipescontainer/recipescontainer.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import {FormsModule} from "@angular/forms";
import {RecipesRoutingModule} from "./routing/recipes-routing.module";
import {MDBBootstrapModule} from "angular-bootstrap-md/index";
import {PipesModule} from "../pipes/pipes.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    MDBBootstrapModule.forRoot(),
    RecipesRoutingModule
  ],
  declarations: [RecipesListComponent, RecipescontainerComponent, CategoriesComponent, RecipeDetailsComponent],
  exports: [RecipesListComponent, RecipescontainerComponent, CategoriesComponent, RecipeDetailsComponent]
})
export class RecipesModule { }
