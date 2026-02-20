import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable ()
export class ErrorInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
     catchError( err =>{
      if(err.nmae == "Unauthorized"){
        const unauthorisedError = new HttpResponse({
          status:401,
          statusText:'unathorised access',
          url:req.url
        })
        return throwError(() => unauthorisedError )
      }

      else if(err.name == "forbidden"){
        const forbiddenError = new HttpResponse({
          status:403,
          statusText:'Access Denied',
          url:req.url
        })
        return throwError(() => forbiddenError )
      }
      return throwError(() => err)
     }) 
    )
  }
  
}