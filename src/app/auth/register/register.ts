import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../book/book.service';
import { AuthService } from '../auth-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      user: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  } 

  user:string=''
  address:string=''
  password:string=''
  fullName:string=''
  email:string=''
  phone:string=''

  private authserv= inject(AuthService)
  private fb= inject(FormBuilder)
  private route= inject(Router)

  registerForm!:FormGroup

  get f() { return this.registerForm.controls; }
  
  registor() {

    if (this.registerForm.valid) {
      const {fullName, user,email, password,address,phone } = this.registerForm.value;
      console.log("Registration Data:", this.registerForm.value);
       this.authserv.regestor(fullName,user,password,password,phone,email).subscribe({
      next:(data) =>{
        console.log("registor succ");     
        return this.route.navigate(['auth/login'])
      }
  })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}
