import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';
import { User } from '../../models/user-model';
import { DatePipe, JsonPipe } from '@angular/common';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-profile',
  imports: [JsonPipe, DatePipe,LoadingSpinner],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  isloading :boolean =true
  ngOnInit(): void {
    this.getprofile()
  }

  private authserv= inject(AuthService)
  private cdr =inject(ChangeDetectorRef)
  userdata!:User

  getprofile(){
    this.authserv.profile().subscribe({
      next:(data) =>{
        console.log(data);
        this.userdata=data
        this.cdr.detectChanges()
        this.isloading=false
      }
    })
  }
}
