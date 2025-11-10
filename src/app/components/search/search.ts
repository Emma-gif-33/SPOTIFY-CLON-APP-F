import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from '../../../app/interface/interface';
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';
import { SpotifyApiService } from '../../services/spotify/spotify-api-service';
import { SpotifyAuthService } from '../../services/spotify/spotify-auth';
import { AudioService, Song } from '../../services/audio-service';


@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit, OnDestroy {
  searchTerm$ = new Subject<string>();

  tracks: SpotifyTrack[] = [];
  albums: SpotifyAlbum[] = [];
  artists: SpotifyArtist[] = [];

  isLoading: boolean = false;
  hasSearched: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private spotifyApiService: SpotifyApiService,
    private spotifyAuthService: SpotifyAuthService,
    private audioService: AudioService
  ) { }

  ngOnInit(): void {
    this.ensureAuthentication();
    this.setupSearch();
  }

  private ensureAuthentication(): void {
    if (!this.spotifyAuthService.hasValidToken()) {
      this.spotifyAuthService.getClientCredentialsToken()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => console.log('Token obtenido exitosamente'),
          error: (err) => console.error('Error obteniendo token:', err)
        });
    }
  }

  private setupSearch(): void {
    this.searchTerm$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
      switchMap(term => {
        if (term.trim() === '') {
          this.clearResults();
          return [];
        }

        this.isLoading = true;
        return this.spotifyApiService.search(term, ['track', 'album', 'artist'], 10);
      })
    ).subscribe({
      next: (results) => {
        this.tracks = results.tracks?.items || [];
        this.albums = results.albums?.items || [];
        this.artists = results.artists?.items || [];
        this.hasSearched = true;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error en búsqueda:', error);
        this.isLoading = false;
      }
    });
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm$.next(input.value);
  }

  clearResults(): void {
    this.tracks = [];
    this.albums = [];
    this.artists = [];
    this.hasSearched = false;
  }

  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  getArtistNames(artists: SpotifyArtist[]): string {
    return artists.map(artist => artist.name).join(', ');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private mapSpotifyTrackToSong(track: SpotifyTrack): Song {
    return {
      song_name: track.name,
      artist_name: track.artists.map(a => a.name).join(', '),
      song_url: track.preview_url || '', // ojo: algunas canciones no tienen preview
      caratula: track.album.images?.[0]?.url || '',
      duration: this.formatDuration(track.duration_ms)
    };
  }

  playTrack(track: SpotifyTrack): void {
    if (!track.preview_url) {
      console.warn('Esta canción no tiene preview disponible.');
      return;
    }
    const song = this.mapSpotifyTrackToSong(track);
    this.audioService.init([song]);  // cargamos una sola canción
    this.audioService.play();        // reproducimos
  }


}