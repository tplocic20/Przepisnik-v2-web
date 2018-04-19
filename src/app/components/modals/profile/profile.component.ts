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

  constructor(private srv: FireService, public dialogRef: MatDialogRef<ProfileComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.config = data;
  }

  ngOnInit() {
    this.srv.authCtx.subscribe(user => this.userData = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        emailVerified: user.emailVerified,
        uid: user.uid,
      }
    );
  }

  onFileChange(event) {
    const fileList: FileList = event.target.files;
    console.log(fileList);
    if (fileList.length > 0) {
      const reader: FileReader = new FileReader();
      const file: File = fileList[0];
      reader.onloadend = () => {
        this.userData.photoUrl = reader.result;
        console.log(this.userData.photoUrl);
      };

      reader.readAsDataURL(file);
    }
  }


  close() {
    this.dialogRef.close();
  }

  submit() {
    console.log(this.userData);
    this.srv.updateUserInfo(this.userData);
    this.close();
  }

}
