import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../auth/auth-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  role=localStorage.getItem("role")
  public authserv = inject(AuthService)
  private route =inject(Router)

  userisLoogged!:boolean
  adminloggedin!:boolean

  ngOnInit(): void {
    this.isloggedin()
    this.isadminlogged()
  }
  isloggedin(){
    this.userisLoogged=this.authserv.isLoggedIn()    
  }

  adminlogout(){
    console.log("lgout");
    this.authserv.logout().subscribe({
      next:(data)=>{
        console.log(data,"data");
        window.location.reload()
      }
    })
  }

  isadminlogged(){
    this.adminloggedin = this.authserv.isAdminLoggedin()    
  }
}
