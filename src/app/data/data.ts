import { Injectable } from '@angular/core';
import { Song } from '../../app/services/audio-service';


@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  private songs: Song[] = [
    {
      song_name: "Take on me",
      artist_name: "a-ha",
      song_url: "/media/songs/TOM,a-ha.mp3",
      caratula: "/media/phtos/TEOTH,BoniieTyler.jpg",
      duration: "3:45"
    },
    {
      song_name: "Never gonna give you up",
      artist_name: "Rick Astley",
      song_url: "/media/songs/TOM,a-ha.mp3", //TEMPORAL
      caratula: "/media/phtos/NeverGYU.RickAstley.jpeg",
      duration: "4:12"
    }
  ];

  getSongs(): Song[] {
    return this.songs;
  }
}