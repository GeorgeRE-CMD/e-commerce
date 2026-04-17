import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth/auth-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-forget-password-component',
  imports: [RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './forget-password-component.html',
  styleUrl: './forget-password-component.css',
})
export class ForgetPasswordComponent {
  authS = inject(AuthService);
  routerS = inject(Router);
  emailEntry: FormGroup;
  codeEntry: FormGroup;
  resetP: FormGroup;
  fb = inject(FormBuilder);
  steps = signal(1);

  constructor() {
    this.emailEntry = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
    this.codeEntry = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
    this.resetP = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]]
    });
  }

  stepClass(step: number) {
    return this.steps() >= step
      ? 'bg-[#16a34a] text-white'
      : 'bg-[#f3f4f6] text-[#99a1af]';
  }

  lineClass(step: number) {
    return this.steps() >= step
      ? 'bg-[#16a34a]'
      : 'bg-gray-300';
  }

  // ******************************************************************* 
  forgetPassword() {
    const email = this.emailEntry.get('email')?.value;
    if (!email) return;
    this.authS.forgetPassword({ email }).subscribe({
      next: (res) => {
        console.log(res);
        this.steps.set(2);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // *******************************************************************
  resetCode() {
    const resetCode = this.codeEntry.get('resetCode')?.value;
    if (!resetCode) return;
    this.authS.verifyResetCode({ resetCode }).subscribe({
      next: (res) => {
        console.log(res);
        this.steps.set(3);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // *******************************************************************


  resetPassword() {
    if (!this.resetP.value) return;
    this.authS.resetPassword(this.resetP.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
