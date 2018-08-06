import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import 'firebase/storage';
import {Note} from "../models/Note";
import {Recipe} from "../models/Recipe";
import {map} from "rxjs/internal/operators";
import {AngularFireStorage} from "angularfire2/storage";

@Injectable()
export class FireService {

  public userState: any = null;
  authCtx: any = null;

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.authCtx = this.auth.authState;
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userState = user;
        this.userRef = this.db.object("Users/" + this.userState.uid);
        this.userObj = this.userRef.valueChanges();
      }
    });
  }

  private unitsRef = this.db.list("Units");
  private unitsList = this.unitsRef.snapshotChanges().pipe(
    map(actions => actions.map(a => ({$key: a.key, ...a.payload.val()}))));

  private categoriesRef = this.db.list("Categories");
  private categoriesList = this.categoriesRef.snapshotChanges().pipe(
    map(actions => actions.map(a => ({$key: a.key, ...a.payload.val()}))));

  private recipesRef = this.db.list("Recipes");
  private recipesList = this.recipesRef.snapshotChanges().pipe(
    map(actions =>
      actions.map(a => ({$key: a.key, ...a.payload.val()}))
    ));

  private favouritesRef = this.db.list("Recipes", query => query.orderByChild('Favourite').equalTo(true));
  private favouritesList = this.favouritesRef.snapshotChanges().pipe(
    map(actions =>
      actions.map(a => ({$key: a.key, ...a.payload.val()}))
    ));

  private notesRef = this.db.list("Notes");
  private notesList = this.notesRef.snapshotChanges().pipe(
    map(actions =>
      actions.map(a => ({$key: a.key, ...a.payload.val()}))
    ));

  private userRef = null;
  private userObj = null;

  get isSignedIn() {
    return this.userState != null;
  }

  private categoriesLoaded: any;
  get categories() {
    if (!this.categoriesLoaded) {
      this.categoriesLoaded = this.getCategories();
    }
    return this.categoriesLoaded;
  }

  private unitsLoaded: any;
  get units() {
    if (!this.unitsLoaded) {
      this.unitsLoaded = this.getUnits();
    }
    return this.unitsLoaded;
  }

  public register(email, pass) {
    return this.auth.auth.createUserWithEmailAndPassword(email, pass);
  }

  public verifyEmail() {
    this.userState.sendEmailVerification();
  }

  // public rememberMe(email, pass) {
  //   const credentials = {
  //     e: email,
  //     p: pass
  //   };
  //   const encoded = btoa(JSON.stringify(credentials));
  //   console.log(encoded);
  //   // this.storage.set('credentials', encoded);
  // }

  public signIn(email, pass) {
    return this.auth.auth.signInWithEmailAndPassword(email, pass);
  }

  public signOut() {
    // this.storage.remove('credentials');
    this.userState = null;
    return this.auth.auth.signOut();
  }

  // private mapWithKey(actions) {
  //   const list = [];
  //   actions.forEach(action => {
  //     const $key = action.payload.key;
  //     list.push({$key, ...action.payload.val()});
  //   });
  //   return list;
  // }

  private newGuid() {
    return this.db.createPushId();
  }

  getUserData() {
    return this.userObj;
  }

  private getUnits() {
    if (!this.unitsList) return null;
    return this.unitsList.pipe(
      map(actions =>
        actions.map(a => a)
      ));
  }

  private getCategories() {
    if (!this.categoriesList) return null;
    return this.categoriesList.pipe(
      map(actions =>
        actions.map(a => a)
      ));
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
    return this.notesList.pipe(
      map(actions =>
        actions.map(a => a)
      ));
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
    return this.favouritesList.pipe(
      map(actions =>
        actions.map(a => a)
      ));
  }

  getRecipes(categoryId) {
    // this.msg.loading.show("Pobieranie danych");
    return this.recipesList.pipe(
      map(actions => {
          return actions.filter(x => (x as any).Categories.indexOf(categoryId || "") > -1).map(a => {
            return a;
          });
        }
      ));
  }

// .filter(x => x.Categories.indexOf(categoryId || "") > -1);
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

  uploadImage(imageData, contentType = null) {
    if (contentType) {
      return this.storage.ref(this.newGuid()).putString(imageData, 'base64', {contentType: contentType});
    } else {
      return this.storage.ref(this.newGuid()).put(imageData);

    }
  }

  removeImage(imageKey: string) {
    return this.storage.ref(imageKey).delete();
  }


  updateUserInfo(currentUser, userInfo) {
    if (!currentUser) {
      currentUser = {
        photoId: null
      };
    }
    const uploadData = {
      displayName: userInfo.displayName,
      photoURL: userInfo.photoURL,
    };
    if (userInfo.newPhoto) {
      const ref = `av_${userInfo.uid}`;
      const imgRef = this.storage.ref(ref);
      this.storage.upload(ref, userInfo.newPhoto).then(() => {
        imgRef.getDownloadURL().subscribe(url => {
          uploadData.photoURL = url;
          currentUser.photoId = ref;
          this.userRef.set(currentUser);
          this.userState.updateProfile(uploadData);
        });
      }).catch(err => {
        console.log(err);
      });
    } else if (!userInfo.photoURL) {
      if (currentUser.photoId) {
        this.removeImage(currentUser.photoId);
        currentUser.photoId = null;
        this.userRef.set(currentUser);
      }
      uploadData.photoURL = null;
      this.userState.updateProfile(uploadData);
    } else {
      this.userState.updateProfile(uploadData);
    }
  }
}
