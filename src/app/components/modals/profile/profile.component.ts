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

  constructor(private srv: FireService, public dialogRef: MatDialogRef<ProfileComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.config = data;
  }

  ngOnInit() {
  }


  close() {
    this.dialogRef.close();
  }

  submit() {
    this.close();
  }

}
