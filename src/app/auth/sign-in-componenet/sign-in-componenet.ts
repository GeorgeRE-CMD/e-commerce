import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth/auth-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-componenet',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in-componenet.html',
  styleUrl: './sign-in-componenet.css',
})
export class SignInComponenet {
  authS = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  formGroup: FormGroup;
  constructor() {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]]
    })
  }

  signIn() {
    if(this.formGroup.invalid) return;
    this.authS.signIn(this.formGroup.value).subscribe({
      next:(res)=>{
        this.router.navigate(['/home']);
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
