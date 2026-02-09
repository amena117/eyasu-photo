export interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  caption?: string;
}

export interface Album {
  id: string;
  title: string;
  coverPhotoUrl: string;
  photos: Photo[];
}

export interface GuestMessage {
  id: string;
  name: string;
  message: string;
  date: string;
}
