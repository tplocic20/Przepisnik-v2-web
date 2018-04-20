import {Component, Inject, OnInit} from '@angular/core';
import {FireService} from "../../../services/fire.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  config: any;
  userData: any;
  currentUser: any;

  constructor(private srv: FireService, public dialogRef: MatDialogRef<ProfileComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.config = data;
  }

  ngOnInit() {
    this.srv.authCtx.subscribe(user => this.userData = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        photoType: "",
        newPhoto: null,
        emailVerified: user.emailVerified,
        uid: user.uid,
      }
    );
    this.srv.getUserData().subscribe(val => {
      this.currentUser = val;
    });
  }

  onFileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const reader: FileReader = new FileReader();
      const file: File = fileList[0];
      this.userData.photoType = file.type;
      this.userData.newPhoto = file;

      reader.onloadend = () => {
        this.userData.photoUrl = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  removeImg() {
    this.userData.photoUrl = null;
    this.userData.newPhoto = null;
    this.userData.photoype = null;
  }


  close() {
    this.dialogRef.close();
  }

  submit() {
    this.srv.updateUserInfo(this.currentUser, this.userData);
    this.close();
  }

}
