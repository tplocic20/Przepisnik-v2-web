import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {Observable} from "rxjs/Observable";
import {Note} from "../models/Note";
import {Recipe} from "../models/Recipe";

@Injectable()
export class FireService {

  public authState: any = null;
  authCtx: Observable<any> = null;

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase) {
    this.authCtx = this.auth.authState;
    this.auth.authState.subscribe(user => {
      if (user) {
        this.authState = user;
      }
    });
  }

  private categoriesRef = this.db.list("Categories");
  private categoriesList = this.categoriesRef.snapshotChanges().map(actions => this.mapWithKey(actions));

  private recipesRef = this.db.list("Recipes");
  private recipesList = this.recipesRef.snapshotChanges().map(actions => this.mapWithKey(actions));

  private favouritesRef = this.db.list("Recipes", query => query.orderByChild('Favourite').equalTo(true));
  private favouritesList = this.favouritesRef.snapshotChanges().map(actions => this.mapWithKey(actions));

  private notesRef = this.db.list("Notes");
  private notesList = this.notesRef.snapshotChanges().map(actions => this.mapWithKey(actions));

  private imagesRef = firebase.storage();

  get userData() {
    return this.authState;
  }

  get isSignedIn() {
    return this.authState != null;
  }

  private categoriesLoaded: Observable<any[]>;
  get categories() {
    if (!this.categoriesLoaded) {
      this.categoriesLoaded = this.getCategories();
    }
    return this.categoriesLoaded;
  }

  public register(email, pass) {
    return this.auth.auth.createUserWithEmailAndPassword(email, pass);
  }

  public rememberMe(email, pass) {
    const credentials = {
      e: email,
      p: pass
    };
    const encoded = btoa(JSON.stringify(credentials));
    console.log(encoded);
    // this.storage.set('credentials', encoded);
  }

  public signIn(email, pass) {
    return this.auth.auth.signInWithEmailAndPassword(email, pass);
  }

  public signOut() {
    // this.storage.remove('credentials');
    this.authState = null;
    return this.auth.auth.signOut();
  }

  private mapWithKey(actions) {
    const list = [];
    actions.forEach(action => {
      const $key = action.payload.key;
      list.push({$key, ...action.payload.val()});
    });
    return list;
  }

  private newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private getCategories() {
    if (!this.categoriesList) return null;
    return this.categoriesList.map(res => {
      return res;
    });
  }

  addCategory(data) {
    // this.categoriesRef.push({Name: data}).then(() => this.msg.toast.info(`Kategoria ${data} została dodana`),
    //     error => this.msg.toast.error(error));
  }

  removeCategory(data) {
    // this.categoriesRef.remove(data.$key).then(() => this.msg.toast.info(`Kategoria ${data.Name} została usunięta`),
    //     error => this.msg.toast.error(error));
  }

  editCategory(data) {
    // this.categoriesRef.update(data.$key, {Name: data.Name}).then(() => this.msg.toast.info(`Kategoria ${data.Name} została zapisana`),
    //     error => this.msg.toast.error(error));
  }

  getNotes() {
    // this.msg.loading.show("Pobieranie danych");
    return this.notesList.map(res => {
      // this.msg.loading.close();
      return res;
    });
  }

  getNote(noteId) {
    return this.db.object(`Notes/${noteId}`).valueChanges();
  }

  addNote(note: Note) {
    return this.notesRef.push(note);
  }

  updateNote(key, note: Note) {
    return this.notesRef.update(key, note);
  }

  removeNote(key) {
    return this.notesRef.remove(key);

  }

  getFavourites() {
    return this.favouritesList.map(res => {
      return res;
    });
  }

  getRecipes(categoryId) {
    // this.msg.loading.show("Pobieranie danych");
    return this.recipesList.map(data => {
      // this.msg.loading.close();
      return data.filter(x => x.Categories.indexOf(categoryId || "") > -1);
    });
  }

  addRecipe(recipe: Recipe) {
    return this.recipesRef.push(recipe);
  }

  updateRecipe(key, recipe: Recipe) {
    return this.recipesRef.update(key, recipe);
  }

  removeRecipe(key) {
    return this.recipesRef.remove(key);
  }

  getRecipe(recipeId) {
    return this.db.object(`Recipes/${recipeId}`).valueChanges();
  }

  uploadImage(imageData, contentType) {
    return this.imagesRef.ref(this.newGuid()).putString(imageData, 'base64', {contentType: contentType});
  }

  removeImage(imageKey: string) {
    return this.imagesRef.ref(imageKey).delete();
  }

  updateUserInfo(userInfo) {
    console.log(userInfo);
    // this.authState.updateProfile({
    //   displayName: userInfo.name,
    // });
  }
}
