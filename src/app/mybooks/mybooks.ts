import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { IssueService } from './issue.service';
import { Book } from '../models/book-model';
import { Issue, IssuedBookRecord } from '../models/issue-model';
import { CommonModule, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { LoadingSpinner } from '../shared/loading-spinner/loading-spinner';
import { FineDService } from './fine.service';
import { IssueStatusPipe } from '../shared/overdue-status-pipe';
import { ConfirmDialog } from '../shared/confirm-dialog/confirm-dialog';
import { DaysUntil } from '../shared/days.until';
import { HighlightDirective } from "../shared/highlight.directive";

@Component({
  selector: 'app-mybooks',
  imports: [DatePipe, LoadingSpinner, ConfirmDialog, CommonModule, IssueStatusPipe, DaysUntil, HighlightDirective],
  templateUrl: './mybooks.html',
  styleUrl:'./mybooks.css',
})

export class Mybooks implements OnInit {
  ngOnInit(): void {
    this.getIssuedBook()
  }
  public issuedBook:IssuedBookRecord[]=[]
  showPopUp:boolean= false;
  booktoReturn:IssuedBookRecord | null = null
  
  isloading:boolean = true
  showMess:string=''

  userid!:number

  private issuserv = inject(IssueService)
  private fineserv = inject(FineDService)
  private cdr = inject(ChangeDetectorRef)

  getIssuedBook(){
    this.issuserv.getIssuedBook().subscribe({
      next:(data) =>{
        this.userid = data[0].user.id
        this.issuedBook=data
        this.isloading=false
        this.cdr.detectChanges()
        console.log(data);
      }
    })
  }

  confirmreturn(issue:IssuedBookRecord){
    this.booktoReturn = issue
    this.showMess="Are you sure to return book"
    this.showPopUp=true
  }

  returnBook(){
     this.issuserv.returnBook(this.booktoReturn?.id).subscribe({
      next:(data)=>{
        console.log(data);
        this.showPopUp =false
        this.booktoReturn = null
        window.location.reload()
      },
      error:(err) =>{
        console.log(err,"this is error");
      }
    })
  }

  renewBook(id:number){
    this.issuserv.renewBook(id).subscribe({
      next:(data) =>{
        console.log(data);
        window.location.reload()
      }
    })
  }

  payfineforIssue(id:number){
    this.fineserv.payfineByIssue(id).subscribe({
      next:(data) =>{
        console.log(data);
      }
    })
    alert("fine paid successfully")
  }

  payAllFine(id:number){
    this.fineserv.payAllfine(id).subscribe({
      next:(data) =>{
        console.log(data); 
      }
    })
  }

  cnacelreturn(){
    this.showPopUp = false
  }


currentTab: 'active' | 'history' = 'active';

setTab(tab: 'active' | 'history') {
  this.currentTab = tab;
}

}
