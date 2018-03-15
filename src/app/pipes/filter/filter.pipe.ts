import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    console.log(filter);
    if (!items || !filter) {
      return items;
    }

    if (filter.length < 3) {
      return items;
    }

    return items.filter(item => {
      return Object.keys(item).some(key => {
        return item[key].toString().toLowerCase().indexOf(filter.toString().toLowerCase()) != -1;
      });
    });
  }

}
