import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Book } from '../models/book-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: Book[] =[]
  private apiUrl="http://localhost:3001"
  constructor(private http:HttpClient){}
 

 getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/api/books/detailed`)
  }

  getbookbyId(id:number){
    return this.http.get<Book>(`${this.apiUrl}/api/books/detailed/${id}`).pipe(
      catchError(this.handleError)
    )
  }
  getdetailavliabilty(id:number){
    return this.http.get<Book>(`${this.apiUrl}/api/books/${id}/availability`).pipe(
      catchError(this.handleError)
    )
  }

  getavalablebook(){
    return this.http.get<Book>(`${this.apiUrl}/api/books/available`).pipe(
      catchError(this.handleError)
    )
  }

  addBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/api/books/create`, book).pipe(
      catchError(this.handleError)
    )
  }

  updateBook(book:Partial<Book>, id:number):Observable<Book>{
    return this.http.put<Book>(`${this.apiUrl}/api/books/${id}/update`, book).pipe(
      catchError(this.handleError)
    )
  }

  deleteBook(id:number):Observable<Book>{
    return this.http.delete<Book>(`${this.apiUrl}/books/${id}`)
  }

  searchBok(){
    return this.http.get<Book>(`${this.apiUrl}/api/books/search`)
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.status === 0) errorMessage = 'Network error. Please check your internet connection.';
    else if (error.status === 404) errorMessage = 'Book not found.';
    else if (error.status === 500) errorMessage = 'Server error. Please try again later.';
    else errorMessage = error.message;

    return throwError(() => new Error(errorMessage));
  }

}
