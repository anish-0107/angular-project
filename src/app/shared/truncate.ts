import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true // Added if you are using standalone components
})
export class TruncatePipe implements PipeTransform {

  constructor() { }

  transform(text: string, limit: number = 100): string {
    if (!text) {
      return '';
    }
    if (text.length <= limit) {
      return text;
    }
    return text.substring(0, limit) + '...';
  }

}
