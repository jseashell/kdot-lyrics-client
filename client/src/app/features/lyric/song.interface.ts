export interface ScrapedSong {
  id: string;
  song: Song;
  lyrics: string[];
}

export interface Song {
  artist_names?: string;
  apple_music_player_url?: string;
  full_title?: string;
  header_image_thumbnail_url?: string;
  header_image_url?: string;
  id?: number;
  uuid?: string;
  path?: string;
  release_date_for_display?: string;
  song_art_image_thumbnail_url?: string;
  song_art_image_url?: string;
  title?: string;
  url?: string;
  primary_artist?: Artist;
  featured_artists?: Artist[];
  album?: Album;
  media?: Media;
}

export interface Artist {
  id?: number;
  name?: string;
  api_path?: string;
  header_image_url?: string;
  image_url?: string;
  url?: string;
}

export interface Album {
  api_path?: string;
  cover_art_url?: string;
  full_title?: string;
  id?: number;
  name?: string;
  release_date_for_display?: string;
  url?: string;
}

export interface Media {
  provider?: string;
  start?: number;
  type?: string;
  url?: string;
}
