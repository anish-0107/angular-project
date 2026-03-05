import { Component, EventEmitter, inject, Input, OnChanges, output, Output, SimpleChanges } from '@angular/core';
import { Book } from '../../models/book-model';
import { BookService } from '../book.service';
import { FormsModule } from '@angular/forms';
import { IssueService } from '../../mybooks/issue.service';
import {  TruncatePipe } from '../../shared/truncate';
import { ConfirmDialog } from "../../shared/confirm-dialog/confirm-dialog";
import { CommonModule } from '@angular/common';
import { HighlightDirective } from "../../shared/highlight.directive";
import { RoleDirective } from '../../shared/role-directive';

@Component({
  selector: 'app-book-card',
  imports: [FormsModule, CommonModule, TruncatePipe,RoleDirective],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {

  @Input() Book!:Book
  @Output() remove = new EventEmitter<number>()
  @Output() detailsclicked = new EventEmitter<number>()
  @Output() updateClicked = new EventEmitter<Book>()
  @Output() borrowclicked = new EventEmitter<number>()

  public currentrole =localStorage.getItem('role')

  book:Book[] =[]

  title:string =''
  body:string=''
  category:string=''
  isbn:string=''
  publishedyear:Date= new Date
  totalCopies:number=0

  isShown:boolean = false
  showPopup = false;
  message!:string

  deleteme(){
    this.remove.emit(this.Book.id)
    this.showPopup =true
    console.log(this.remove,"this is emiiited");
  }

  borrowid(){
    if(this.Book){
      this.borrowclicked.emit(this.Book.id)
      console.log(this.Book);
    }
  }

  
  confirmBorrow(){
    this.showPopup = true 
    this.message="The book dues in 14 days"
  }

  showdetails(){
    this.detailsclicked.emit(this.Book.id)
  }

  onUpdateCliked(){
    this.updateClicked.emit(this.Book)
  }

}
