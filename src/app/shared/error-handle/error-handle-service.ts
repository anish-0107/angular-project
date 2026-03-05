import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandleService {
  
  private isShownSubject = new BehaviorSubject<any | null>(null);
  isShown$ = this.isShownSubject.asObservable();
  showmess =''

  showError(message2:string){
    this.showmess=message2
    setTimeout(() => {
      this.isShownSubject.next(this.showmess);
    }, 100);
  }

  close() {
    this.isShownSubject.next(null); // This notifies the HTML to hide the modal
    console.log("Pop up closed successfully");
  }

}
