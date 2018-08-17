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
import {SearchService} from "./services/search.service";
import { SearchComponent } from './components/search/search.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import {ModalService} from "./services/modal.service";
import {MatMenuModule, MatTabsModule} from "@angular/material";
import { ProfileComponent } from './components/modals/profile/profile.component';
import { SettingsComponent } from './components/modals/settings/settings.component';
import { ImageUploadComponent } from './components/partials/image-upload/image-upload.component';
import { CategoriesSettingsComponent } from './components/partials/categories-settings/categories-settings.component';
import {AngularFireStorageModule} from "angularfire2/storage";
import { UnitsEditorComponent } from './components/partials/units-editor/units-editor.component';
import {MDBBootstrapModulesPro, MDBSpinningPreloader} from "ng-uikit-pro-standard";
import {NO_ERRORS_SCHEMA} from '@angular/core';

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

    UnitsEditorComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModulesPro.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NotesModule,
    RecipesModule,
    RoutingModule,
    MatMenuModule,
    MatTabsModule,
  ],
  providers: [FireService, SearchService, ModalService, MDBSpinningPreloader],
  bootstrap: [AppComponent],
  entryComponents: [ProfileComponent, SettingsComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {
}
