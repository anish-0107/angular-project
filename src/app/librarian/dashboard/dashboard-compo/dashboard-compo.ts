import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Book } from '../../../models/book-model';
import { BookService } from '../../../book/book.service';
import { BookCard } from '../../../book/book-card/book-card';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-compo',
  imports: [BookCard],
  templateUrl: './dashboard-compo.html',
  styleUrl: './dashboard-compo.css',
})
export class DashboardCompo implements OnInit {
  ngOnInit(): void {
    this.showBooks()
  }

  books:Book[]=[]

  isLoading:boolean=true

  title: string = ''
  body: string = ''
  category: string = ''
  isbn: string = ''
  publishedyear: Date = new Date
  totalCopies: number = 0

    private bookserv = inject(BookService)
    private cdr = inject(ChangeDetectorRef)
    private route = inject(Router)

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

    updatebook(id:number){
    const updatedbook ={
      title:this.title,
      body:this.body,
      isbn:this.isbn,
      category:this.category,
      publishedYear:this.publishedyear,
      totalCopies:this.totalCopies,
    }
    this.bookserv.updateBook(updatedbook,id).subscribe({
      next:(data) =>{
        console.log("book updated", data);
      }
    })
  }
}
