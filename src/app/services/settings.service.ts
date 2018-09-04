import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";
import {ToastService} from "ng-uikit-pro-standard";
import {MessagesService} from "./messages.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private userRef: AngularFireObject<any>;
  public hideHeaders: any;
  public leftSearch: any;
  public saving = false;

  private saveTimeout;

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase, private toast: MessagesService) {
    console.log("User service");
    this.auth.authState.subscribe(user => {
      if (user) {
        if (!user.emailVerified) {
          this.auth.auth.signOut();
        } else {
          this.userRef = this.db.object(`Users/${user.uid}`);
          this.userRef.valueChanges().subscribe(val => {
            if (!val) {
              this.userRef.update({
                hideHeaders: false,
                leftSearch: false
              });
            } else {
              this.hideHeaders = val.hideHeaders;
              this.leftSearch = val.leftSearch;
            }
          });
        }
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
        this.toast.success("Zaaktualizowano ustawienia")
        setTimeout(() => {
          this.saving = false;
        }, 250);
      });
    }, 1000);
  }
}
