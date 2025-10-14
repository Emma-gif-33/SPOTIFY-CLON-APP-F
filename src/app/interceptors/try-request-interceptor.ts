import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { SpotifyLoginService } from '../services/spotify-api/spotify-login-service';
import { CookieStorageService } from '../services/cookie-storage-service';

export const tryRequestInterceptor: HttpInterceptorFn = (req, next) => {
  
  const _authService = inject(SpotifyLoginService);
  const _cookieService = inject(CookieStorageService);

  if(req.url.includes('/api/token'))
    return next(req);

  return next(req).pipe(
    catchError( (error:any) => {
      if(!(error instanceof HttpErrorResponse) || error.status !== 401)
        return throwError(()=>error);

      return _authService.getToken().pipe(
        switchMap((res) => {
          const token = _cookieService.getCookieValue('access_token');
          const newReq = req.clone({
            setHeaders:{
              'Authorization': `Bearer ${token}`
            }
          })

          return next(newReq)
        })
      )
    })
  )
};
