import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../models/book-model';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { BookCard } from "../book-card/book-card";
import { FormsModule } from '@angular/forms';
import { LoadingSpinner } from "../../shared/loading-spinner/loading-spinner";
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { HighlightDirective } from "../../shared/highlight.directive";
import { IssueService } from '../../mybooks/issue.service';
import { ConfirmDialog } from "../../shared/confirm-dialog/confirm-dialog";

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, BookCard, FormsModule, LoadingSpinner, HighlightDirective, ConfirmDialog],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList implements OnInit, OnDestroy {

  private bookserv = inject(BookService)
  private cdr = inject(ChangeDetectorRef)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  books: Book[] = []

  title: string = ''
  body: string = ''
  category: string = ''
  isbn: string = ''
  publishedyear: Date = new Date
  totalCopies: number = 0

  isShown: boolean = false
  isLoading = true;
  selectedFilter: string = 'all'

  searchText: string = '';
  filteredUsers: Book[] = []; // What you actually show on screen
  filteredBooks:Book[]=[] 

  showPopup:boolean =false

  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;


  protected currentRole = localStorage.getItem('role')

  id = Number(this.route.snapshot.paramMap.get('id'))


  onFilterChange() {
    if (this.selectedFilter === 'all') {
      this.showBooks();
    } else {
      this.getAllavaliableBooks(); // Load all if filter is cleared
    }
  }

  showBooks() {
    this.bookserv.getBooks().subscribe({
      next: (data) => {
        this.books = data
        this.isLoading = false;
        this.cdr.detectChanges()
        console.log("books:", data);
      }
    })
  }

  getAllavaliableBooks() {
    this.bookserv.getavalablebook().subscribe({
      next: (data) => {
        this.books = data
        this.isLoading = false;
        console.log(data, 'avialble books');
        this.cdr.detectChanges()
      }
    })
  }

  updatebook(id: number) {
    const updatedbook = {
      title: this.title,
      body: this.body,
      isbn: this.isbn,
      category: this.category,
      publishedYear: this.publishedyear,
      totalCopies: this.totalCopies,
    }
    this.bookserv.updateBook(updatedbook, id).subscribe({
      next: (data) => {
        console.log("book updated", data);
      }
    })
  }

  showfrom() {
    this.isShown = !this.isShown
  }

  showdetails(id: number) {
    this.router.navigate([`book/list/${id}`]); 
  }

  bookIdToBorrow:number | null = null
  showConfirmBorrow=false
  private issuserv = inject(IssueService)

   onConfirmBorrow(){
    if(this.bookIdToBorrow){
      this.issuserv.borrowBook(this.bookIdToBorrow).subscribe({
      next:(data) =>{
        console.log(data) 
        this.showConfirmBorrow = false
        this.cdr.detectChanges()
    },
    error:(err) =>{
      console.log(err,"err");
      this.showConfirmBorrow = false
    }
    })
    }
  }

  borrowBook(id:number){
    this.bookIdToBorrow = id
    console.log(id);
    console.log(this.bookIdToBorrow,"hoiii");
    this.showConfirmBorrow =true
  }

  closeAllpop(){
    this.showConfirmBorrow =false
  }


  ngOnInit() {
    this.showBooks()
    this.filteredUsers = this.books;

    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(500),         
      distinctUntilChanged()  
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  onSearchChange(event: any) {
    // Push the current text into the subject
    this.searchSubject.next(this.searchText);
  }

  performSearch(term: string) {
    console.log('Searching for:', term);
    const lowerTerm = term.toLowerCase();
    this.filteredUsers = this.books.filter(book =>
      book.title.toLowerCase().includes(lowerTerm) ||
      book.body.toLowerCase().includes(lowerTerm)
    );
    this.cdr.detectChanges()
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
  }  

}
