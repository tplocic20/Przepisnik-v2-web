import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule} from "@angular/material";
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule {
}
