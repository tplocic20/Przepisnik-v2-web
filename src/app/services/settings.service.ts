import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private userRef: AngularFireObject<any>;
  public hideHeaders: any;
  public leftSearch: any;
  public saving = false;

  private saveTimeout;

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userRef = this.db.object(`Users/${user.uid}`);
        this.userRef.valueChanges().subscribe(val => {
          this.hideHeaders = val.hideHeaders;
          this.leftSearch = val.leftSearch;
        });
      }
    });
  }

  update() {
    if (this.saveTimeout)
      clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {
      this.saving = true;
      const item = {
        hideHeaders: this.hideHeaders,
        leftSearch: this.leftSearch
      };
      console.log(item);
      this.userRef.update(item).then(() => {
        clearTimeout(this.saveTimeout);
        setTimeout(() => {
          this.saving = false;

        }, 250);
      });
    }, 1000);
  }
}
