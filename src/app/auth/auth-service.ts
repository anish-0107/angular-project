import { HttpClient, HttpErrorResponse, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap, throwError } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { User } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient)
  private apiUrl = "http://localhost:3001"

  private currentRoleSubject = new BehaviorSubject<string | null>(localStorage.getItem('role'));

  userRole$ = this.currentRoleSubject.asObservable();

  login(username: any, password: string) {
    const credential = {
      username,
      password
    }
    return this.http.post<{ token: string, user: any }>(`${this.apiUrl}/api/auth/login`, credential).pipe(
      tap(res => {
        if (res.token && res.user) {
          localStorage.setItem("token", res.token)
          localStorage.setItem("username", res.user.username)
          localStorage.setItem("role", res.user.role)
          this.currentRoleSubject.next(res.user.role);
        }
        else {
          console.warn("Server returned 204: Login successful, but no token received.");
        }
      })
    )
  }

  logout() {
  return this.http.post<Token>(`${this.apiUrl}/api/auth/logout`, {}).pipe(
    tap(() => console.log("Server invalidated session")),
    tap(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem('role');
      this.currentRoleSubject.next(null);
    })
  );
}

  profile() {
    return this.http.get<User>(`${this.apiUrl}/api/auth/profile`).pipe(
      catchError(this.handleError)
    )
  }

  regestor(username: string, password: string, phone: string, address: string, fullName: string, email: string) {

    const cred = {
      username,
      password,
      email,
      address,
      fullName,
      phone
    }
    return this.http.post<object>(`${this.apiUrl}/api/auth/register`, cred).pipe(
      tap(res => {
        console.log("registor successfully", res);
        this.currentRoleSubject.next(username);
      })
    )
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  isAdminLoggedin(){
    const role = localStorage.getItem("role")
    if(role == 'librarian'){
      return true
    }
    return false
  }

  getToken(): string | null {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token')
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
