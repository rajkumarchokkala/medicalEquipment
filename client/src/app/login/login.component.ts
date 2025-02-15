import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  itemForm!: FormGroup;

  constructor(private fb: FormBuilder, private hs: HttpService, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.itemForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.hs.Login(this.itemForm.value).subscribe(
        {
          next: (response) => {
            console.log(response);
            localStorage.setItem("token", response.token);
            localStorage.setItem("role", response.role);
            localStorage.setItem("username", response.username);
            console.log(localStorage.getItem("role"));
            this.router.navigateByUrl('dashboard');
            this.snackBar.open('Login Successful!', '', {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['custom-snackbar']
            });
          },
          error: (error) => {
            console.log(error);
            this.snackBar.open('Invalid Credentials', '', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['custom-snackbar']
            });
          
          }
        }
      );
    }
  }
}