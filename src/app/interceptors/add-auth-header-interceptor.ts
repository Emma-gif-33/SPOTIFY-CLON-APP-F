import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieStorageService } from '../services/cookie-storage-service';
import { SpotifyLoginService } from '../services/spotify-api/spotify-login-service';
import { catchError, switchMap, throwError } from 'rxjs';

export const addAuthHeaderInterceptor: HttpInterceptorFn = (req:HttpRequest<unknown>, next:HttpHandlerFn) => {
  
  if(!req.url.includes('api.spotify.com/v1'))
    return next(req);

  const _cookieService: CookieStorageService = inject(CookieStorageService);
  const token = _cookieService.getCookieValue('access_token');

  const newReq = req.clone({
    setHeaders:{
      'Authorization': `Bearer ${token}`
    }
  })

  return next(newReq);
    
};
