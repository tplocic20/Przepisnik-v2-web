import { Component, OnInit } from '@angular/core';
import {FireService} from "../../../services/fire.service";

@Component({
  selector: 'app-units-editor',
  templateUrl: './units-editor.component.html',
  styleUrls: ['./units-editor.component.scss']
})
export class UnitsEditorComponent implements OnInit {

  units: any;
  constructor(private srv: FireService) { }

  ngOnInit() {
    this.units = this.srv.units;
  }

}
