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
import {SearchService} from "./services/search.service";
import { SearchComponent } from './components/search/search.component';
<<<<<<< HEAD
import { UserInfoComponent } from './components/user-info/user-info.component';
=======
import {ModalService} from "./services/modal.service";
import {MatProgressBarModule, MatProgressSpinnerModule} from "@angular/material";
>>>>>>> master

const fireBaseConfig = {
  apiKey: "AIzaSyAIHYAHC6ykzoTnO25vEpxwkXm9_fS_Jeo",
  authDomain: "przepisnik.firebaseapp.com",
  databaseURL: "https://przepisnik.firebaseio.com",
  projectId: "firebase-przepisnik",
  storageBucket: "firebase-przepisnik.appspot.com",
  messagingSenderId: "457833981759"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    UserInfoComponent,

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
    MatProgressSpinnerModule
  ],
  providers: [FireService, SearchService, ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
