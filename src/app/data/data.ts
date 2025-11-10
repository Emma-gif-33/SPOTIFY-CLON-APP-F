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
      song_url: "/public/media/songs/TOM,a-ha.mp3",
      caratula: "/media/phtos/TEOTH,BoniieTyler.jpg",
      duration: "3:45"
    },
    {
      song_name: "Never gonna give you up",
      artist_name: "Rick Astley",
      song_url: "/media/songs/TOM,a-ha.mp3", //TEMPORAL
      caratula: "/media/phtos/NeverGYU.RickAstley.jpeg",
      duration: "4:12"
    },
    {
      song_name: "Every Breath You Take",
      artist_name: "The Police",
      song_url: "/media/songs/TP-ebyt.mp3", //TEMPORAL
      caratula: "/media/phtos/TP-ebyt.jpg",
      duration: "3:48"
    },
    {
      song_name: "Bad",
      artist_name: "Micheal Jackson",
      song_url: "/media/songs/TOM,a-ha.mp3", //TEMPORAL
      caratula: "/media/phtos/mj-bad.webp",
      duration: "4:20"
    }
  ];

  getSongs(): Song[] {
    return this.songs;
  }
}