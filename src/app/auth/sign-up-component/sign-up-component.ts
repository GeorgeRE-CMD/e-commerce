import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from "@angular/router";

const passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
  const password = control.get('password')?.value;
  const rePassword = control.get('rePassword')?.value;
  return password === rePassword ? null : { passwordMismatch: true };
};
@Component({
  selector: 'app-sign-up-component',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './sign-up-component.html',
  styleUrl: './sign-up-component.css',
})
export class SignUpComponent {
  authS = inject(AuthService);
  routerS = inject(Router)
  formGroup: FormGroup;
  fb = inject(FormBuilder);
  constructor() {
    this.formGroup = this.fb.group(
      {
        name: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required]],
        rePassword: [null, Validators.required],
        phone: [null, [Validators.required]],
        terms: [null, Validators.requiredTrue],
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }
  get passwordValue() {
    return this.formGroup.get('password')?.value;
  }

  getPasswordStrength() {
    let strength = 0;

    if (/[A-Z]/.test(this.passwordValue)) strength++;
    if (/[a-z]/.test(this.passwordValue)) strength++;
    if (/\d/.test(this.passwordValue)) strength++;
    if (/[^A-Za-z0-9]/.test(this.passwordValue)) strength++;
    if (this.passwordValue.length >= 8) strength++;
    return strength; // من 0 لـ 5
  }
  getStrengthWidth() {
    return (this.getPasswordStrength() / 5) * 100;
  }
  getStrengthColor() {
    const strength = this.getPasswordStrength();

    if (strength <= 2) return 'bg-red-500';
    if (strength === 3) return 'bg-yellow-500';
    if (strength === 4) return 'bg-blue-500';
    return 'bg-green-500';
  }
  signUp() {
    if (this.formGroup.invalid) return;
    this.authS.signUp(this.formGroup?.value).subscribe({
      next: (res) => {
        if (res?.token) {
          this.routerS.navigate(['/home']);
        }
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
