import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'taskStatusFilter'
})

export class TaskStatusFilterPipe implements PipeTransform {
  transform(value: string): string {
    return value ? [...value.split(',')].pop() : value;
  }
}