import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatIndex'
})
export class FormatIndexPipe implements PipeTransform {
  transform(value: number): string {
    return value.toString().padStart(3, '0');
  }
}
