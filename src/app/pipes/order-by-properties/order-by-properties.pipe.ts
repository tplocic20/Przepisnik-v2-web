import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderByProperty'
})
export class OrderByPropertiesPipe implements PipeTransform {

  transform(items: any[], prop: string) {
    if (!items) return items;
    return items.sort((a, b) => {
      if (a[prop].toLowerCase() < b[prop].toLowerCase()) return -1;
      if (a[prop].toLowerCase() > b[prop].toLowerCase()) return 1;
      return 0;
    });
  }

}
