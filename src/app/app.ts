import { Component, OnInit, signal } from '@angular/core';
import { LoginService } from './services/spotify-api/login-service';
import { PlaylistResponse } from './interfaces/playlist-response';
import { PlaylistService } from './services/spotify-api/playlist-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('EXAMPLE_APP');

  constructor(
    private _s_LoginService: LoginService,
    private _s_PlaylistService: PlaylistService
  ) {  }

  token: string = "";
  playlist: undefined | PlaylistResponse

  ngOnInit(): void {
    this._s_LoginService.getAccessToken().subscribe((data)=>{
      this.token = data.access_token;
      this._s_PlaylistService.getPlaylist(this.token).subscribe((data)=>{
        this.playlist = data
        console.log(this.playlist);
      })
    });


  }



}
