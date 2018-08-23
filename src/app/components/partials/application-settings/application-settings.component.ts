import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../../services/settings.service";

@Component({
  selector: 'app-application-settings',
  templateUrl: './application-settings.component.html',
  styleUrls: ['./application-settings.component.scss']
})
export class ApplicationSettingsComponent implements OnInit {

  constructor(public settings: SettingsService) { }

  ngOnInit() {
  }

  update(ev) {
    this.settings.update();
  }
}
