import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private userRef: AngularFireObject<any>;
  public hideHeaders: any;

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userRef = this.db.object(`Users/${user.uid}`);
        this.hideHeaders = this.db.object(`Users/${user.uid}/hideHeaders`).valueChanges();
      }
    });
  }

  update(value) {
    return this.userRef.update(value);
  }
}
