import {NgModule} from '@angular/core';
import {} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RecipeDetailsComponent} from "../components/recipe-details/recipe-details.component";
import {RecipescontainerComponent} from "../components/recipescontainer/recipescontainer.component";
import {RecipesDashboardComponent} from "../components/recipes-dashboard/recipes-dashboard.component";
import {AuthGuard} from "../../guards/auth-guard";

const recipesRoutes: Routes = [
  {
    path: "recipes",
    component: RecipescontainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ":id",
        canActivate: [AuthGuard],
        component: RecipeDetailsComponent
      },
      {
        path: '',
        canActivate: [AuthGuard],
        component: RecipesDashboardComponent
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
