import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  username: string = ''
  password: string = ''
  private authserv = inject(AuthService)
  private route = inject(Router)
  private cdr = inject(ChangeDetectorRef)

  isLoggedin!: boolean
  private fb = inject(FormBuilder);
  // Define the form variable
  loginForm!: FormGroup;



  login() {
    if (this.loginForm.valid) {    
    const { username, password } = this.loginForm.value;
    this.authserv.login(username, password).subscribe({
      next: (data) => {
        console.log("logged in", data);
        if (data.user.role === "librarian") {
          this.route.navigate(['/librarian/dashboard']);
          this.cdr.detectChanges()
        } else {
          this.route.navigate(["/book/list"]);
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.log(err, 'err occured');
      }
    });
  } else {
    this.loginForm.markAllAsTouched();
  }
  }

  get f() { return this.loginForm.controls; }
}
