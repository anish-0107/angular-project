import { Component } from '@angular/core';
import { ErrorHandleService } from './error-handle-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-error-handle',
  imports: [AsyncPipe],
  templateUrl: './error-handle.html',
  styleUrl: './error-handle.css',
})
export class ErrorHandle {

  constructor(public errserv:ErrorHandleService){}

}
