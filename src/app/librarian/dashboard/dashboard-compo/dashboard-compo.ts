import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Book } from '../../../models/book-model';
import { BookService } from '../../../book/book.service';
import { BookCard } from '../../../book/book-card/book-card';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingSpinner } from '../../../shared/loading-spinner/loading-spinner';
import { User } from '../../../models/user-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-compo',
  imports: [LoadingSpinner, DatePipe],
  templateUrl: './dashboard-compo.html',
  styleUrl: './dashboard-compo.css',
})
export class DashboardCompo implements  OnInit {
  ngOnInit(): void {
    this.dashdata()
  }
  private apiurl ="http://localhost:3001/api"
  private http =inject(HttpClient)
  private cdr  = inject(ChangeDetectorRef)

  isloading:boolean=true

  data:any={}

  dashdata(){
    this.http.get<object>(`${this.apiurl}/stats/dashboard`).subscribe({
      next:(data) =>{
        this.data=data
        this.isloading=false
        this.cdr.detectChanges()
        console.log(data);
      }
    })
  }

  getAllFinesReport(){
    this.http.get<User>(`${this.apiurl}/fines/report`).subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
