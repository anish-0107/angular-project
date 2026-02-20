import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'issueStatus',
  standalone: true
})
export class IssueStatusPipe implements PipeTransform {

  transform(issue: any): 'OVERDUE' | 'RETURNED' | 'ACTIVE' {
    if (issue.status === "issued") return 'ACTIVE';

    if (issue.status === 'returned' || issue.returnDate) {
      return 'RETURNED';
    }
    const today = new Date();
    const dueDate = new Date(issue.dueDate);

    if (today > dueDate) {
      return 'OVERDUE';
    }
    return 'ACTIVE';
  }
}