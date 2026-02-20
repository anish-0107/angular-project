import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Book } from '../../models/book-model';
import { BookService } from '../book.service';
import { FormsModule } from '@angular/forms';
import { IssueService } from '../../mybooks/issue.service';
import {  TruncatePipe } from '../../shared/truncate';

@Component({
  selector: 'app-book-card',
  imports: [FormsModule, TruncatePipe],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {

  @Input() Book!:Book
  @Output() remove = new EventEmitter<number>()

  public currentrole =localStorage.getItem('role')

  book:Book[] =[]

  private bookserv = inject(BookService)
  private issuserv = inject(IssueService)

  title:string =''
  body:string=''
  category:string=''
  isbn:string=''
  publishedyear:Date= new Date
  totalCopies:number=0

  isShown:boolean = false

  showupdate(){
    this.isShown=!this.isShown
  }

  deleteme(){
    this.remove.emit(this.Book.id)
  }

  updatebook(){

    const updatedbook ={
      title:this.title,
      body:this.body,
      isbn:this.isbn,
      category:this.category,
      publishedYear:this.publishedyear,
      totalCopies:this.totalCopies,
    }
    this.bookserv.updateBook(updatedbook,this.Book.id).subscribe({
      next:(data) =>{
        console.log("book updated", data);
      }
    })
  }

  borowBook(){
    this.issuserv.borrowBook(this.Book.id).subscribe({
      next:(data) =>{
        console.log(data)  
    },
    error:(err) =>{
      console.log(err,"err");
    }
    })
  }

}
