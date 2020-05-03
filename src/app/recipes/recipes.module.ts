import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipesListComponent} from './components/recipes-list/recipes-list.component';
import {RecipescontainerComponent} from './components/recipescontainer/recipescontainer.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {RecipeDetailsComponent} from './components/recipe-details/recipe-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RecipesRoutingModule} from "./routing/recipes-routing.module";
import {PipesModule} from "../pipes/pipes.module";
import {RecipesDashboardComponent} from './components/recipes-dashboard/recipes-dashboard.component';
import {AddEditRecipeModalComponent} from './modals/add-edit-recipe-modal/add-edit-recipe-modal.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import {CategoriesSelectComponent} from './partials/categories-select/categories-select.component';
import {EngredientsEditorComponent} from './partials/engredients-editor/engredients-editor.component';
import {EngredientFormComponent} from './partials/engredient-form/engredient-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    RecipesRoutingModule,
    MatTabsModule,
    MatDialogModule,
    MatMenuModule,
    MatInputModule
  ],
  declarations: [RecipesListComponent, RecipescontainerComponent, CategoriesComponent, RecipeDetailsComponent, RecipesDashboardComponent, AddEditRecipeModalComponent,
    CategoriesSelectComponent, EngredientsEditorComponent, EngredientFormComponent],
  exports: [RecipesListComponent, RecipescontainerComponent, CategoriesComponent, RecipeDetailsComponent],
  entryComponents: [AddEditRecipeModalComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class RecipesModule {
}
