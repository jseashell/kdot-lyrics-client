import { Routes } from '@angular/router';
import { AlbumsComponent } from './features/albums/albums.component';
import { HomeComponent } from './features/home/home.component';
import { LinksComponent } from './features/links/links.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'albums',
    component: AlbumsComponent,
  },
  {
    path: 'links',
    component: LinksComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
