import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../../book/book.service';
import { FormsModule } from '@angular/forms';
import { Book } from '../../../models/book-model';

@Component({
  selector: 'app-book-form',
  imports: [FormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm {
 
  books:Book[]=[]
  title: string = ''
  body: string = ''
  category: string = ''
  isbn: string = ''
  publishedyear: Date = new Date
  totalCopies: number = 0

    private bookserv = inject(BookService)
  private cdr = inject(ChangeDetectorRef)

    addBook() {
    const newbook = {
      title: this.title,
      body: this.body,
      isbn: this.isbn,
      category: this.category,
      publishedYear: this.publishedyear,
      totalCopies: this.totalCopies,
    }
    this.bookserv.addBook(newbook).subscribe({
      next: (data) => {
        console.log("book added", data);
      }
    })
  }


}
