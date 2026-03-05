import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Book } from '../../models/book-model';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-book-details',
  imports: [JsonPipe, LoadingSpinner, DatePipe, CommonModule],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetails{
  private bookserv = inject(BookService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private cdr = inject(ChangeDetectorRef)


  id = Number(this.route.snapshot.paramMap.get('id'))
  isloading:boolean = true
  bookData!:Book

  getVAlibilitybyid() {
    this.bookserv.getdetailavliabilty(this.id).subscribe({
      next: (data) => {
        console.log("availibilty", data);
      }
    })
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.bookserv.getbookbyId(id);
      })
    ).subscribe({
      next: (data) => {
        console.log(this.id, data);
        this.bookData = data;        
        this.isloading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Failed to load book", err);
        this.isloading = false;
      }
    });
  }

  backtolist(){
    this.router.navigate(['book/list'])
  }
  }

  