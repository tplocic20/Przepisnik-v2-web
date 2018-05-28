import {Component, OnInit} from '@angular/core';
import {FireService} from "../../services/fire.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {ProfileComponent} from "../modals/profile/profile.component";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userData: any;

  constructor(private srv: FireService, private router: Router, private dialogSrv: MatDialog) {
  }

  ngOnInit() {
    this.srv.authCtx.subscribe(user => this.userData = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL != null ? user.photoUrl : 'https://i.pinimg.com/564x/f0/03/44/f00344d904062ce92b4b3b146060d874.jpg',
        emailVerified: user.emailVerified,
        uid: user.uid,
      }
    );
  }

  logout() {
    this.srv.signOut().then(() => this.router.navigate(['home']));
  }

  editProfile() {
    const config = {
      disableClose: true,
      data: this.userData
    };
    this.dialogSrv.open(ProfileComponent, config as any);
  }
}
