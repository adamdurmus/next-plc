import axios from "axios";
import { SearchParams } from "./types";

export function getArtists(searchParams: SearchParams) {
  return new Promise<{ data: any }>((resolve) =>
    resolve(axios.get(`https://itunes.apple.com/search?term=${searchParams.term}&limit=${searchParams.dataLimit}`))
  );
}
