import { Component, inject } from '@angular/core';
import { BookService } from '../../book/book.service';
import { AuthService } from '../auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  user:string=''
  address:string=''
  password:string=''
  fullName:string=''
  email:string=''
  phone:string=''

  private authserv= inject(AuthService)

  registor(){
    this.authserv.regestor(this.user,this.address,this.password,this.phone,this.fullName,this.email).subscribe({
      next:(data) =>{
        console.log("registor succ");     
      }
  })
  }

  // use response data from registor and store it in one objcet and show it on ptofile of user
}
