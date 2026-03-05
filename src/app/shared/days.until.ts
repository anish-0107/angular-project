import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysuntil',
  standalone: true // Added if you are using standalone components
})
export class DaysUntil implements PipeTransform {

  constructor() { }

  transform(value:Date | string | number): string {
    if (!value) {
      return '';
    }

    const dueDate = new Date(value) // gets due date from data
    const today = new Date()

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays == 0) {
      return "Due today";
    }
    else if(diffDays ==1){
        return "1 day left"
    }
    else if(diffDays >1){
        return `${diffDays} days left`
    }
    else if(diffDays === -1){
        return "1 day overdue"
    }
    else{
        return `${Math.abs(diffDays)} days overdue`;
    }
}

}