import {NgModule} from '@angular/core';
import {} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RecipeDetailsComponent} from "../components/recipe-details/recipe-details.component";
import {RecipescontainerComponent} from "../components/recipescontainer/recipescontainer.component";

const recipesRoutes: Routes = [
  {
    path: "recipes",
    component: RecipescontainerComponent,
    children: [
      {
        path: ":id",
        component: RecipeDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule {
}
