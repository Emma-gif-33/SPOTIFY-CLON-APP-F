import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBar } from './search-bar/search-bar';
import { SearchSection } from './search-section/search-section';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../interceptors/auth-interceptor';
import { addAuthHeaderInterceptor } from '../interceptors/core/add-auth-header-interceptor';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SearchBar,
    SearchSection
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:[
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        addAuthHeaderInterceptor
      ])
    )
  ],
  exports:[
    SearchBar
  ]
})
export class SearchModule { }
