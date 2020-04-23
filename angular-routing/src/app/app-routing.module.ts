import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { TrackComponent } from './track/track.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'search', component: SearchComponent },
  { path: '',  redirectTo: '/search', pathMatch: 'full' },
  { path: 'tracks/:id', component: TrackComponent },
  { path: 'artists/:id', component : ArtistComponent},
  { path: 'albums/:id', component : AlbumComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
