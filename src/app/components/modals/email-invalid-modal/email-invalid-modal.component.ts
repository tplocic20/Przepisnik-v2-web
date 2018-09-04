import {Component, Inject, OnInit} from '@angular/core';
import {FireService} from "../../../services/fire.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-email-invalid-modal',
  templateUrl: './email-invalid-modal.component.html',
  styleUrls: ['./email-invalid-modal.component.scss']
})
export class EmailInvalidModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmailInvalidModalComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  verifyEmail() {
    this.data.sendEmail();
    this.close();
  }
}
