import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipesListComponent} from './components/recipes-list/recipes-list.component';
import {RecipescontainerComponent} from './components/recipescontainer/recipescontainer.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {RecipeDetailsComponent} from './components/recipe-details/recipe-details.component';
import {FormsModule} from "@angular/forms";
import {RecipesRoutingModule} from "./routing/recipes-routing.module";
import {MDBBootstrapModule} from "angular-bootstrap-md/index";
import {PipesModule} from "../pipes/pipes.module";
import {RecipesDashboardComponent} from './components/recipes-dashboard/recipes-dashboard.component';
import {AddEditRecipeModalComponent} from './modals/add-edit-recipe-modal/add-edit-recipe-modal.component';
import {MatTabsModule, MatDialogModule} from "@angular/material";
import { CategoriesSelectComponent } from './partials/categories-select/categories-select.component';
import { EngredientsEditorComponent } from './partials/engredients-editor/engredients-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    MDBBootstrapModule.forRoot(),
    RecipesRoutingModule,
    MatTabsModule,
    MatDialogModule
  ],
  declarations: [RecipesListComponent, RecipescontainerComponent, CategoriesComponent, RecipeDetailsComponent, RecipesDashboardComponent, AddEditRecipeModalComponent, CategoriesSelectComponent, EngredientsEditorComponent],
  exports: [RecipesListComponent, RecipescontainerComponent, CategoriesComponent, RecipeDetailsComponent],
  entryComponents: [AddEditRecipeModalComponent]
})
export class RecipesModule {
}
