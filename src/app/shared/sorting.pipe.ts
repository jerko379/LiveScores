import { Pipe, PipeTransform } from '@angular/core';
import {fixture} from "../model";

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(array: any[], field: string): any[] {

    array.sort((a: any, b: any) => {
      return a[field] - b[field];
    });

    return array
  }

}
