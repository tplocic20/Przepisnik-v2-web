import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../components/login/login.component";
import {NotescontainerComponent} from "../notes/components/notescontainer/notescontainer.component";
import {AuthGuard} from "../guards/auth-guard";
import {RegisterComponent} from "../components/register/register.component";

const routes: Routes = [
  {path: 'home', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'notes', component: NotescontainerComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [ AuthGuard
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
