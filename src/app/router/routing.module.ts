import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../components/login/login.component";
import {RecipescontainerComponent} from "../recipes/components/recipescontainer/recipescontainer.component";
import {NotescontainerComponent} from "../notes/components/notescontainer/notescontainer.component";

const routes: Routes = [
  {path: 'home', component: LoginComponent},
  {path: 'recipes', component: RecipescontainerComponent},
  {path: 'notes', component: NotescontainerComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
