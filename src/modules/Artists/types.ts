export type Song = {
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  artworkUrl60: string;
}

export type ArtistList = {
  results: Song[]
}
export type SearchParams = {
  dataLimit: number;
  term: string;
}