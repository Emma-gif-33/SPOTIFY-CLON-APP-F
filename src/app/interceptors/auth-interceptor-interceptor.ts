import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { CookiesStorageService } from '../services/cookie-service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../environments/environments.development';
import { isTokenResponse } from '../core/spotify-guard/token-response';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>, 
  next: HttpHandlerFn
) => {
  const _cookieService = inject(CookiesStorageService);

  return next(req).pipe(
    tap(event => {
      if (!req.url.includes(environment.AUTH_API_URL))
        return;

      if (event instanceof HttpResponse && event.status === 200) {
        const body = event.body as any;

        if (isTokenResponse(body)) {
          const expirationMS = 60 * 60 * 1000; // 1 hora
          const expirationDate = new Date(Date.now() + expirationMS);

          _cookieService.setKey('access_token', body.access_token, expirationDate);
        }
      }
    })
  );
};