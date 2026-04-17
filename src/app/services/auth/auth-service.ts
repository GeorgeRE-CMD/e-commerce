import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  token: WritableSignal<string | null> = signal(null);
  isAuthenticated = computed(() => {
    const token = this.token();
    return !!token && token.length > 10;
  }); constructor() {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      this.token.set(storedToken);
    } else {
      this.token.set(null);
    }
  }
  // ** Sign Up
  signUp(data: any): Observable<any> {
    return this.http
      .post(`${environment.baseUrl}/api/v1/auth/signup`, data)
      .pipe(
        tap((res: any) => {
          if (res?.token) {
            this.handleUser(res.token);
          }
        })
      );
  }



  // ** Sign In
  signIn(data: any): Observable<any> {
    return this.http
      .post(`${environment.baseUrl}/api/v1/auth/signin`, data)
      .pipe(
        tap((res: any) => {
          if (res?.token) {
            this.handleUser(res.token);
          }
        })
      );
  }




  signOut() {
    localStorage.removeItem('token');
    this.token.set(null);
  }


  // ** forget password
  forgetPassword(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data);
  }



  // ** verify Reset Code
  verifyResetCode(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data)
  }




  // ** Reset Password
  resetPassword(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
  }


  handleUser(token: string) {
    localStorage.setItem('token', token);
    this.token.set(token);
  }

}
