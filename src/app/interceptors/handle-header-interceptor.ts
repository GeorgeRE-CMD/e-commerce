import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth-service';
export const handleHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token();

  // فقط requests اللي تحتاج auth
  if (req.url.includes('cart') || req.url.includes('orders')) {
    if (!token) {
      return next(req); // أو return throwError / redirect login
    }

    req = req.clone({
      setHeaders: {
        token: token
      }
    });
  }
  return next(req);
};
