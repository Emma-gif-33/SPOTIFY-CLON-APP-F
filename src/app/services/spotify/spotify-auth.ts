import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CookiesStorageService } from '../cookie-service';
import { SpotifyTokenResponse } from '../../../app/interface/interface';
import { environment } from '../../../app/environments/environments.development';
import { spotify } from '../../environments/environments.local';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  private token: string | null = null;
  private tokenExpiration: number = 0;

  constructor(private http: HttpClient) {}

  hasValidToken(): boolean {
    return !!this.token && Date.now() < this.tokenExpiration;
  }

  getAccessToken(): string | null {
    return this.token;
  }

  getClientCredentialsToken(): Observable<SpotifyTokenResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${spotify.CLIENT_ID}:${spotify.CLIENT_SECRET}`)
    });

    const body = new HttpParams().set('grant_type', 'client_credentials');

    return this.http.post<SpotifyTokenResponse>(spotify.AUTH_API_URL, body, { headers }).pipe(
      tap(response => {
        this.token = response.access_token;
        this.tokenExpiration = Date.now() + (response.expires_in * 1000); 
      })
    );
  }
}