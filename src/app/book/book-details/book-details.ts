import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Book } from '../../models/book-model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-details',
  imports: [JsonPipe],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetails implements OnInit {
  ngOnInit(): void {
    this.getbookbyid();
  }

  private bookserv = inject(BookService)
  private route= inject(ActivatedRoute)


  id =  Number(this.route.snapshot.paramMap.get('id'))
  userdata!:Book;

  getbookbyid(){
    this.bookserv.getbookbyId(this.id).subscribe({
      next:(data) =>{
        console.log(data);
        this.userdata =data   
      }
    })
  }

  getVAlibilitybyid(){
    this.bookserv.getdetailavliabilty(this.id).subscribe({
      next:(data) =>{
        console.log("availibilty", data);
      }
    })
  }
  

}
