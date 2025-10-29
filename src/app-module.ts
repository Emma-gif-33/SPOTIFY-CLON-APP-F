import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Player } from './app/components/player/player';
import { PlayerBar } from './app/components/player-bar/player-bar';
import { Playlist } from './app/components/playlist/playlist';
import { Search } from './app/components/search/search';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptors/auth-interceptor-interceptor';
import { addAuthHeaderInterceptor } from './app/interceptors/auth-header-interceptor-interceptor';
import { CookieService } from 'ngx-cookie-service';
import { AudioService } from './app/services/audio-service';
import { MusicDataService } from './app/data/data';
import { SpotifyApiService } from './app/services/spotify/spotify-api-service';
import { SpotifyAuthService } from './app/services/spotify/spotify-auth';
import { CookiesStorageService } from './app/services/cookie-service';
import { FormsModule } from '@angular/forms';
import { Disc } from './app/components/disc/disc';


@NgModule({
  declarations: [
    App,
    Player,
    PlayerBar,
    Search,
    Playlist,
    Disc
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        addAuthHeaderInterceptor
      ])
    ),
    CookieService,
    AudioService,
    MusicDataService,
    SpotifyApiService,
    SpotifyAuthService,
    CookiesStorageService
  ],
  bootstrap: [App]
})
export class AppModule { }