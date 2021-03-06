import {Component, OnInit} from '@angular/core';
import {FireService} from "../../services/fire.service";
import {Router} from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import {ProfileComponent} from "../modals/profile/profile.component";
import {SettingsComponent} from "../modals/settings/settings.component";
import {MessagesService} from "../../services/messages.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userData: any;
  classes = "rounded-menu";

  constructor(private srv: FireService, private router: Router, private dialogSrv: MatDialog, private toast: MessagesService) {
    this.userData = this.srv.userState;
  }

  ngOnInit() {
  }

  logout() {
    this.srv.signOut().then(() => {
      this.toast.info("Wylogowano");
      this.router.navigate(['home']);
    });
  }

  editProfile() {
    const config = {
      disableClose: true
    };
    this.dialogSrv.open(ProfileComponent, config as any);
  }

  settings() {
    const config = {
      disableClose: true
    };
    this.dialogSrv.open(SettingsComponent, config as any);
  }
}
