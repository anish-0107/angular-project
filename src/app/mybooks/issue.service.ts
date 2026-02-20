import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Issue, IssuedBookRecord } from '../models/issue-model';
import { Book } from '../models/book-model';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
 
  book:Book[] =[]
  private apiUrl = "http://localhost:3001/api/issues"
  private http = inject(HttpClient)
 
  borrowBook(bookId:number):Observable<Issue>{
    const issuedata={
      bookId
    }
    return this.http.post<Issue>(`${this.apiUrl}`,issuedata).pipe(
      catchError(this.handleError)
    )
  }

  getIssuedBook():Observable<IssuedBookRecord[]>{
    return this.http.get<IssuedBookRecord[]>(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    )
  }

  returnBook(id:number){
    return this.http.put<Issue>(`${this.apiUrl}/${id}/return`,{}).pipe(
    catchError(this.handleError)
    )
  }

  renewBook(id:number){
    return this.http.put<Issue>(`${this.apiUrl}/${id}/renew`,{}).pipe(
    catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.status === 0) errorMessage = 'Network error. Please check your internet connection.';
    else if (error.status === 404) errorMessage = 'issue not found.';
    else if (error.status === 500) errorMessage = 'Server error. Please try again later.';
    else errorMessage = error.message;

    return throwError(() => new Error(errorMessage));
  }
}

