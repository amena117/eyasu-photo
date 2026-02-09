import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';
import Guestbook from './components/Guestbook';
import type { Album, Photo } from './types';

// Mock Data
const MOCK_ALBUMS: Album[] = [
  {
    id: 'ceremony',
    title: 'Ceremony',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    photos: Array.from({ length: 8 }).map((_, i) => ({
      id: `c-${i}`,
      url: `https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80`,
      thumbnailUrl: `https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
      caption: `Ceremony Moment ${i + 1}`
    }))
  },
  {
    id: 'reception',
    title: 'Reception',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    photos: Array.from({ length: 6 }).map((_, i) => ({
      id: `r-${i}`,
      url: `https://images.unsplash.com/photo-1511285560982-1351cdeb9821?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80`,
      thumbnailUrl: `https://images.unsplash.com/photo-1511285560982-1351cdeb9821?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
      caption: `Reception Party ${i + 1}`
    }))
  }
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const openLightbox = (photo: Photo, albumIndex: number, photoIndex: number) => {
    setCurrentPhoto(photo);
    setCurrentAlbumIndex(albumIndex);
    setCurrentPhotoIndex(photoIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentPhoto(null);
  };

  const nextPhoto = () => {
    const album = MOCK_ALBUMS[currentAlbumIndex];
    let nextIndex = currentPhotoIndex + 1;
    let nextAlbumIndex = currentAlbumIndex;

    if (nextIndex >= album.photos.length) {
      nextAlbumIndex = (currentAlbumIndex + 1) % MOCK_ALBUMS.length;
      nextIndex = 0;
    }

    setCurrentAlbumIndex(nextAlbumIndex);
    setCurrentPhotoIndex(nextIndex);
    setCurrentPhoto(MOCK_ALBUMS[nextAlbumIndex].photos[nextIndex]);
  };

  const prevPhoto = () => {
    let prevIndex = currentPhotoIndex - 1;
    let prevAlbumIndex = currentAlbumIndex;

    if (prevIndex < 0) {
      prevAlbumIndex = (currentAlbumIndex - 1 + MOCK_ALBUMS.length) % MOCK_ALBUMS.length;
      prevIndex = MOCK_ALBUMS[prevAlbumIndex].photos.length - 1;
    }

    setCurrentAlbumIndex(prevAlbumIndex);
    setCurrentPhotoIndex(prevIndex);
    setCurrentPhoto(MOCK_ALBUMS[prevAlbumIndex].photos[prevIndex]);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Hero />
      <Gallery albums={MOCK_ALBUMS} onPhotoClick={openLightbox} />
      <Guestbook />

      {lightboxOpen && currentPhoto && (
        <Lightbox
          photo={currentPhoto}
          onClose={closeLightbox}
          onNext={nextPhoto}
          onPrev={prevPhoto}
        />
      )}

      <footer className="footer">
        <p>&copy; 2026 Sarah & David's Wedding. Built with Love.</p>
      </footer>
    </div>
  );
}

export default App;
