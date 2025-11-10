import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { SpotifySearchResponse, SpotifyTrack } from '../../../app/interface/interface';
import { environment } from '../../../app/environments/environments.development';
import { SpotifyAuthService } from './spotify-auth';
import { spotify } from '../../environments/environments.local';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  constructor(
    private http: HttpClient,
    private authService: SpotifyAuthService
  ) {}

  /** 🔍 Busca canciones, artistas o álbumes */
  search(query: string, types: string[], limit: number = 10): Observable<SpotifySearchResponse> {
    const token = this.authService.getAccessToken();

    // Si no hay token, lo solicita antes de hacer la búsqueda
    if (!token) {
      return this.authService.getClientCredentialsToken().pipe(
        switchMap(() => this.search(query, types, limit))
      );
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${spotify.API_URL}/search?q=${encodeURIComponent(query)}&type=${types.join(',')}&limit=${limit}`;

    return this.http.get<SpotifySearchResponse>(url, { headers });
  }
}