import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'newlineFilter'
})

export class NewLineFilterPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) { return value }
    return value.toString()
      .replace(/,/g,'\n');
  }
}