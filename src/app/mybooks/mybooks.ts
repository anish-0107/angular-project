import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { IssueService } from './issue.service';
import { Book } from '../models/book-model';
import { Issue, IssuedBookRecord } from '../models/issue-model';
import { CommonModule, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { LoadingSpinner } from '../shared/loading-spinner/loading-spinner';
import { FineDService } from './fine.service';
import { IssueStatusPipe } from '../shared/overdue-status-pipe';

@Component({
  selector: 'app-mybooks',
  imports: [DatePipe,LoadingSpinner, CommonModule, IssueStatusPipe],
  templateUrl: './mybooks.html',
  styleUrl:'./mybooks.css',
})

export class Mybooks implements OnInit {
  ngOnInit(): void {
    this.getIssuedBook()
  }
  public issuedBook:IssuedBookRecord[]=[]
  
  isloading:boolean = true
  private issuserv = inject(IssueService)
  private fineserv = inject(FineDService)
  private cdr = inject(ChangeDetectorRef)

  getIssuedBook(){
    this.issuserv.getIssuedBook().subscribe({
      next:(data) =>{
        this.issuedBook=data
        this.isloading=false
        this.cdr.detectChanges()
        console.log(data);
      }
    })
  }

  returnBook(id:number){
    this.issuserv.returnBook(id).subscribe({
      next:(data)=>{
        console.log(data);
      }
    })
  }

  renewBook(id:number){
    this.issuserv.renewBook(id).subscribe({
      next:(data) =>{
        console.log(data);
      }
    })
  }

  payfineforIssue(id:number){
    this.fineserv.payfineByIssue(id).subscribe({
      next:(data) =>{
        console.log(data);
      }
    })
  }

  payAllFine(id:number){
    this.fineserv.payAllfine(id).subscribe({
      next:(data) =>{
        console.log(data); 
      }
    })
  }

}
