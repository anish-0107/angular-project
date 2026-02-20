import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Issue } from '../models/issue-model';

@Injectable({
  providedIn: 'root',
})
export class FineDService {
  private apiURl ="http://loaclhost:3001/api/fines"

  private http = inject(HttpClient)



  payfineByIssue(id:number):Observable<Issue>{
    return this.http.post<Issue>(`${this.apiURl}/${id}/pay`,{}).pipe(
      catchError(this.handleError)
    )
  }

  payAllfine(id:number):Observable<Issue>{
    return this.http.post<Issue>(`${this.apiURl}/user/${id}/pay-all`,{}).pipe(
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
