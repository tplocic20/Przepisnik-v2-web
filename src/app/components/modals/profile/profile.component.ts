import {Component, Inject, OnInit} from '@angular/core';
import {FireService} from "../../../services/fire.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userData: any;
  currentUser: any;
  userForm: FormGroup;

  constructor(private srv: FireService, private fb: FormBuilder, public dialogRef: MatDialogRef<ProfileComponent>) {
  }

  ngOnInit() {
    this.srv.authCtx.subscribe(user => {
        this.userData = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          photoType: "",
          newPhoto: null,
          emailVerified: user.emailVerified,
          uid: user.uid,
        };
        this.userForm = this.fb.group({
          name: [this.userData.displayName],
          email: [{value: this.userData.email, disabled: true}],
        });
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
        this.userData.photoURL = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  removeImg() {
    this.userData.photoURL = null;
    this.userData.newPhoto = null;
    this.userData.photoype = null;
  }

  verifyEmail() {
    this.srv.verifyEmail();
  }

  close() {
    this.dialogRef.close();
    console.log(this.userData);
    console.log(this.currentUser);
  }

  submit() {
    this.userData.displayName = this.userForm.get('name').value;
    this.srv.updateUserInfo(this.currentUser, this.userData);
    this.close();
  }

}
