import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../../book/book.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../../models/book-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm implements OnInit {
 
  books:Book[]=[]
  title: string = ''
  body: string = ''
  category: string = ''
  isbn: string = ''
  publishedyear: Date = new Date
  totalCopies: number = 0

  private bookserv = inject(BookService)
  private fb = inject(FormBuilder);
  private routes = inject(Router)
  bookForm!: FormGroup;

  ngOnInit() {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      totalCopies: [1, [Validators.required, Validators.min(1)]],
      publishedyear: ['', [Validators.required]]
    });
  }

  get f() { return this.bookForm.controls; }

    addBook() {
    if(this.bookForm.valid){
      const {title,body,category,isbn,totalCopies,publishedyear}=this.bookForm.value;
      const finalBookObject = { title, body, category, isbn, totalCopies, publishedyear };
    
    this.bookserv.addBook(finalBookObject).subscribe({
      next: (data) => {
        console.log("book added", data);
        this.routes.navigate(['librarian/book-list'])
      }
    })
  }
  }


}
