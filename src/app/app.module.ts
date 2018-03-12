import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RoutingModule} from "./router/routing.module";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {FireService} from "./services/fire.service";
import {FormsModule} from "@angular/forms";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {NotesModule} from "./notes/notes.module";
import {RecipesModule} from "./recipes/recipes.module";
import { MDBBootstrapModule } from 'angular-bootstrap-md';

const fireBaseConfig = {
  apiKey: "AIzaSyDlCSFFdJ2kdm8-2ZkKPZasVWHqc0bfotg",
  authDomain: "przepisnik-v2.firebaseapp.com",
  databaseURL: "https://przepisnik-v2.firebaseio.com",
  projectId: "przepisnik-v2",
  storageBucket: "przepisnik-v2.appspot.com",
  messagingSenderId: "529215752695"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(fireBaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,
    NotesModule,
    RecipesModule,

    RoutingModule,
  ],
  providers: [FireService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
