import React from 'react';
import { motion } from 'framer-motion';
import type { Album, Photo } from '../types';

interface GalleryProps {
    albums: Album[];
    onPhotoClick: (photo: Photo, albumIndex: number, photoIndex: number) => void;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Gallery: React.FC<GalleryProps> = ({ albums, onPhotoClick }) => {
    return (
        <section className="gallery">
            {albums.map((album, albumIndex) => (
                <div key={album.id} className="album-section">
                    <div className="album-header">
                        <h3>{album.title}</h3>
                        <div className="separator"></div>
                    </div>

                    <motion.div
                        className="photo-masonry"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {album.photos.map((photo, photoIndex) => (
                            <motion.div
                                key={photo.id}
                                className="photo-item"
                                variants={item}
                                onClick={() => onPhotoClick(photo, albumIndex, photoIndex)}
                                whileHover={{ scale: 1.03, zIndex: 10 }}
                            >
                                <img src={photo.thumbnailUrl} alt={photo.caption || 'Wedding photo'} loading="lazy" />
                                <div className="photo-overlay"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            ))}
        </section>
    );
};

export default Gallery;
