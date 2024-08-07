import { Routes } from '@angular/router';
import { AlbumsComponent } from './features/albums/albums.component';
import { HomeComponent } from './features/home/home.component';
import { LinksComponent } from './features/links/links.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'homePage' },
  },
  {
    path: 'albums',
    component: AlbumsComponent,
    data: { animation: 'albumsPage' },
  },
  {
    path: 'links',
    component: LinksComponent,
    data: { animation: 'linksPage' },
  },
];
