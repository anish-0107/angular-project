import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login{
  username:string=''
  password:string=''
  private authserv = inject(AuthService)
  private route = inject(Router)

  isLoggedin!:boolean

  login(){
     this.authserv.login(this.username,this.password).subscribe({
      next:(data) =>{
        console.log("logged in", data)
        if(data.user.role == "librarian"){
          this.route.navigate(['/librarian/dashboard'])
        }
        else{
        this.route.navigate(["/book/list"])
        }
      },
      error:(err)=>{
        console.log(err,'err occured');
        }
      })
  }

  

  logout(){
    this.authserv.logout().subscribe({
      next:(data) =>{
        console.log("logut success", data); 
      },
      error: (err) => {
      console.error("Logout error (likely expired token)", err);
      // Even if the server fails, the Service 'finalize' cleared the storage
      // So we just send them to login anyway
    },
    complete:() =>{console.log("complete");
    }
  })
  }

  // isloggedin(){
  //   this.isLoggedin =this.authserv.isLoggedIn()
  // }
}
