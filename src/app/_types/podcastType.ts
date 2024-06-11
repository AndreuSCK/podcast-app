type Genre = {
  name: string;
  id: string;
}
type PodcastInfoType = {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  collectionHdPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  artworkUrl600: string;
  genreIds: string[];
  genres: string[];
}

type PodcastEpisodeType = {
  episodeFileExtension: string;
  artworkUrl160: string;
  episodeContentType: string;
  episodeUrl: string;
  artworkUrl600: string;
  artworkUrl60: string;
  artistViewUrl: string;
  contentAdvisoryRating: string;
  trackViewUrl: string;
  collectionViewUrl: string;
  trackTimeMillis: number;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  genres: Genre[];
  episodeGuid: string;
  description: string;
  trackId: number;
  trackName: string;
  shortDescription: string;
  artistIds: number[];
  releaseDate: string;
  feedUrl: string;
  country: string;
  previewUrl: string;
  kind: string;
  wrapperType: string;
}