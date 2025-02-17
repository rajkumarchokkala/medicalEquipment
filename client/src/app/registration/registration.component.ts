import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  itemForm!: FormGroup;
  durationInSeconds = 2;
  roles: string[] = ['HOSPITAL', 'TECHNICIAN', 'SUPPLIER'];

  constructor(private fb: FormBuilder, private hs: HttpService, private router: Router, private snackBar: MatSnackBar) {
    this.itemForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log("in on submit...");

    if (this.itemForm.valid) {
      this.hs.registerUser(this.itemForm.value).subscribe(
        (data) => {
          console.log("Registration successful", data);
          this.router.navigateByUrl('login');
          this.snackBar.open('Register Successfully! Please Login', '', {
            duration: this.durationInSeconds * 1000,
            verticalPosition: 'top',
            panelClass: ['custom-snackbar']
          });
        },
        (error) => {
          console.error("Registration failed", error);
          this.snackBar.open('⚠️User Already Exists', '', {
            duration: this.durationInSeconds * 1000,
            verticalPosition: 'top',
            panelClass: ['custom-snackbar'],
          });

        }
      );
    } else {

      this.snackBar.open('Please fill the form correctly before submitting.', '', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'top',
        panelClass: ['custom-snackbar']

      });
    }
  }
}



