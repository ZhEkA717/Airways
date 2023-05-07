import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toTime',
})
export default class ToFloorPipe implements PipeTransform {
  transform(value: string): string {
    const minutes = +value;
    const hh = Math.floor(minutes / 60);
    const mm = minutes - hh * 60;
    return `${hh}h ${mm}m`;
  }
}
