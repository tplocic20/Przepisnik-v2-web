import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RoutingModule} from "./router/routing.module";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {FireService} from "./services/fire.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {NotesModule} from "./notes/notes.module";
import {RecipesModule} from "./recipes/recipes.module";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {SearchService} from "./services/search.service";
import { SearchComponent } from './components/search/search.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import {ModalService} from "./services/modal.service";
import {MatMenuModule, MatProgressSpinnerModule, MatTabsModule} from "@angular/material";
import { ProfileComponent } from './components/modals/profile/profile.component';
import { SettingsComponent } from './components/modals/settings/settings.component';
import { ImageUploadComponent } from './components/partials/image-upload/image-upload.component';
import { CategoriesSettingsComponent } from './components/partials/categories-settings/categories-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    UserInfoComponent,
    ProfileComponent,
    SettingsComponent,
    ImageUploadComponent,
    CategoriesSettingsComponent,

  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NotesModule,
    RecipesModule,
    RoutingModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTabsModule,
  ],
  providers: [FireService, SearchService, ModalService],
  bootstrap: [AppComponent],
  entryComponents: [ProfileComponent, SettingsComponent]
})
export class AppModule {
}
