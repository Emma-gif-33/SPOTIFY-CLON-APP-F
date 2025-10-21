import { Component } from '@angular/core';
import { SpotifySearchService } from '../services/spotify-api/spotify-search-service';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  searchQuery: string = '';

  constructor(
    private _spotifySearch: SpotifySearchService
  ){}

  doSearch(): void{
    this._spotifySearch.doSearch(this.searchQuery).subscribe(
      data => console.log(data)
    )
  }

} 
