import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../../models/book-model';
import { BookService } from '../../../book/book.service';
import { Router } from '@angular/router';
import { BookCard } from '../../../book/book-card/book-card';
import { FormsModule } from '@angular/forms';
import { ConfirmDialog } from "../../../shared/confirm-dialog/confirm-dialog";
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { HighlightDirective } from "../../../shared/highlight.directive";
import { IssueService } from '../../../mybooks/issue.service';

@Component({
  selector: 'app-book-list',
  imports: [BookCard, FormsModule, ConfirmDialog, HighlightDirective],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookListLib implements OnInit, OnDestroy {

  ngOnInit(): void {
    this.showBooks()

    this.filteredBooks = this.books;

    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  books: Book[] = []

  isLoading: boolean = true

  title: string = ''
  body: string = ''
  category: string = ''
  isbn: string = ''
  publishedyear: string = ''
  totalCopies: number = 0

  searchText: string = ''

  selectedBookId: number | null = null;
  showForm = false;
  popUp: boolean = false

  Message: string = ""

  private bookserv = inject(BookService)
  private issuserv = inject(IssueService)
  private cdr = inject(ChangeDetectorRef)

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

  // when button tap in card it emits event that catch by handle delete function and sored for booktodelete 
  // and pass ths same booktodelete id o ondeletefunction which call when user tap on confirm
  showConfirmPopup = false;
  showConfirmBorrow = false;
  bookIdToDelete: number | null = null;
  bookIdToBorrow:number |null = null

  handleConfirmForAll(id: number) {
    this.bookIdToDelete = id;
    this.showConfirmPopup = true;
  }

  onConfirmDelete() {
    if (this.bookIdToDelete) {
      this.bookserv.deleteBook(this.bookIdToDelete).subscribe(() => {
        this.books = this.books.filter(b => b.id !== this.bookIdToDelete);
        this.closePopup();
      });
    }
  }

  closePopup() {
    this.showConfirmPopup = false;
    this.bookIdToDelete = null;
  }


  selectedFilter: string = 'all'
  filteredBooks: Book[] = []

  onFilterChange() {
    if (this.selectedFilter === 'all') {
      this.showBooks();
    } else {
      this.getAllavaliableBooks(); // Load all if filter is cleared
    }
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

  openUpdateForm(book: Book) {
    this.selectedBookId = book.id;
    this.showForm = true;

    // Pre-fill the parent's variables with the book's data
    this.title = book.title;
    this.body = book.body;
    this.category = book.category;
    this.isbn = book.isbn;
    this.totalCopies = book.totalCopies;
    this.publishedyear = book.publishedDate;

    this.cdr.detectChanges()
  }

  submitUpdate() {
    if (!this.selectedBookId) return;

    const updatedData = {
      title: this.title,
      body: this.body,
      category: this.category,
      isbn: this.isbn,
      totalCopies: this.totalCopies,
      publishedYear: this.publishedyear
    };

    this.bookserv.updateBook(updatedData, this.selectedBookId).subscribe({
      next: (data) => {
        console.log(data);
        this.showForm = false; // Close form
        this.showBooks();      // Refresh list
      }
    });
  }



  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;
  onSearchChange(event: any) {
    // Push the current text into the subject
    this.searchSubject.next(this.searchText);
  }

  performSearch(term: string) {
    console.log('Searching for:', term);
    const lowerTerm = term.toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(lowerTerm) ||
      book.body.toLowerCase().includes(lowerTerm)
    );
    this.cdr.detectChanges()
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
  }
}
