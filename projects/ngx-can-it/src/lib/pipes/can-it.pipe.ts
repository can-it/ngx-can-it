import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canIt'
})
export class CanItPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
