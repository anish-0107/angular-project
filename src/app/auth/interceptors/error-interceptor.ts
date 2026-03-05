import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../auth-service";
import { ErrorHandleService } from "../../shared/error-handle/error-handle-service";

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Inject services directly at the top of the function
  const router = inject(Router);
  const authService = inject(AuthService);
  const errorService = inject(ErrorHandleService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const backendResponse = err.error.error;

      if (err.status === 401 || err.status === 403 || err.status == 404) {
        authService.logout();
        router.navigate(["auth/login"]);
      } 
      else if (err.status === 500) {
        console.log("Critical server error (500) detected.");
      }

      errorService.showError(backendResponse);

      return throwError(() => err);
    })
  );
};