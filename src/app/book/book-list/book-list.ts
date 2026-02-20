import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Book } from '../../models/book-model';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { BookCard } from "../book-card/book-card";
import { FormsModule } from '@angular/forms';
import { LoadingSpinner } from "../../shared/loading-spinner/loading-spinner";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, BookCard, FormsModule, LoadingSpinner],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList implements OnInit {

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


  protected currentRole = localStorage.getItem('role')

  private bookserv = inject(BookService)
  private cdr = inject(ChangeDetectorRef)
  private route = inject(ActivatedRoute)

  id = Number(this.route.snapshot.paramMap.get('id'))

  ngOnInit(): void {
    this.showBooks()
  }


  onFilterChange() {
    if (this.selectedFilter === 'available') {
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

  // return all books which cpoies are more than 0
  getAllavaliableBooks() {
    this.bookserv.getavalablebook().subscribe({
      next: (data) => {
        console.log(data, 'avialble books');
      }
    })
  }



  handleDelete(id: number) {
    this.bookserv.deleteBook(id).subscribe({
      next: (data) => {
        this.books = this.books.filter(book => book.id != id)
        console.log("book deleted", data);
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

  // addBook() {
  //   const newbook = {
  //     title: this.title,
  //     body: this.body,
  //     isbn: this.isbn,
  //     category: this.category,
  //     publishedYear: this.publishedyear,
  //     totalCopies: this.totalCopies,
  //   }
  //   this.bookserv.addBook(newbook).subscribe({
  //     next: (data) => {
  //       console.log("book added", data);
  //     }
  //   })
  // }

}
