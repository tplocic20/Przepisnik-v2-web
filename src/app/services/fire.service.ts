import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import 'firebase/storage';
import {Note} from "../models/Note";
import {Recipe} from "../models/Recipe";
import {map} from "rxjs/internal/operators";
import {AngularFireStorage} from "angularfire2/storage";
import {Observable} from "rxjs/Rx";

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

        this.categoriesRef = this.db.list(`Categories/${user.uid}`);
        this.categoriesList = this.categoriesRef.snapshotChanges().pipe(
          map(actions => actions.map(a => ({$key: a.key, ...a.payload.val()}))));

        this.unitsRef = this.db.list(`Units/${user.uid}`);
        this.unitsList = this.unitsRef.snapshotChanges().pipe(
          map(actions => actions.map(a => ({$key: a.key, ...a.payload.val()}))));

        this.recipesRef = this.db.list(`Recipes/${user.uid}`);
        this.recipesList = this.recipesRef.snapshotChanges().pipe(
          map(actions => actions.map(a => ({$key: a.key, ...a.payload.val()}))));

        this.notesRef = this.db.list(`Notes/${user.uid}`);
        this.notesList = this.notesRef.snapshotChanges().pipe(
          map(actions => actions.map(a => ({$key: a.key, ...a.payload.val()}))));

        this.favouritesRef = this.db.list(`Recipes/${user.uid}`, query => query.orderByChild('Favourite').equalTo(true));
        this.favouritesList = this.favouritesRef.snapshotChanges().pipe(
          map(actions => actions.map(a => ({$key: a.key, ...a.payload.val()}))));

      }
    });
  }

  private unitsRef: AngularFireList<any>;
  private unitsList: Observable<any>;

  private categoriesRef: AngularFireList<any>;
  public categoriesList: Observable<any>;

  private recipesRef: AngularFireList<any>;
  private recipesList: Observable<any>;

  private favouritesRef: AngularFireList<any>;
  private favouritesList: Observable<any>;

  private notesRef: AngularFireList<any>;
  private notesList: Observable<any>;

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

  private unitsFlatLoaded: any;
  get unitsFlat() {
    if (!this.unitsFlatLoaded) {
      this.getUnitsFlat();
    }
    console.log(this.unitsLoaded);
    return this.unitsFlatLoaded;
  }

  public register(email, pass) {
    return this.auth.auth.createUserWithEmailAndPassword(email, pass);
  }

  public verifyEmail() {
    this.userState.sendEmailVerification();
  }

  public signIn(email, pass) {
    return this.auth.auth.signInWithEmailAndPassword(email, pass);
  }

  public signOut() {
    this.userState = null;
    return this.auth.auth.signOut();
  }

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

  private getUnitsFlat() {
    this.unitsRef.valueChanges().subscribe(units => {
      this.unitsLoaded = units.map(p => p.Name);
    });
  }

  addUnit(unit) {
    return this.unitsRef.push(unit);
  }

  editUnit(unit) {
    return this.unitsRef.update(unit.$key, {Name: unit.Name});
  }

  removeUnit(unit) {
    return this.unitsRef.remove(unit.$key);
  }

  private getCategories() {
    if (!this.categoriesList) return null;
    return this.categoriesList;
  }

  addCategory(data) {
    return this.categoriesRef.push({Name: data, Owner: this.userState.uid});
  }

  removeCategory(data) {
    return this.categoriesRef.remove(data.$key);
  }

  editCategory(data) {
    return this.categoriesRef.update(data.$key, {Name: data.Name});
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
    return this.recipesList.pipe(
      map(actions => {
          return actions.filter(x => (x as any).Categories.indexOf(categoryId || "") > -1);
        }
      ));
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
    return this.db.object(`Recipes/${this.userState.uid}/${recipeId}`).valueChanges();
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
