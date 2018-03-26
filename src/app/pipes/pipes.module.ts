import { NgModule } from '@angular/core';
import {FilterPipe} from "./filter/filter.pipe";
import { OrderByPropertiesPipe } from './order-by-properties/order-by-properties.pipe';

@NgModule({
  declarations: [FilterPipe, OrderByPropertiesPipe],
  exports: [FilterPipe, OrderByPropertiesPipe]
})
export class PipesModule { }
