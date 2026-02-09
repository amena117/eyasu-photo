import React from 'react';
import type { Photo } from '../types';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface LightboxProps {
    photo: Photo;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ photo, onClose, onNext, onPrev }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
        >
            <button className="close-btn" onClick={onClose}><X size={32} strokeWidth={1} /></button>

            <div className="lightbox-content">
                <button className="nav-btn prev" onClick={onPrev}><ChevronLeft size={48} strokeWidth={0.5} /></button>
                <motion.img
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={photo.url}
                    alt={photo.caption}
                />
                <button className="nav-btn next" onClick={onNext}><ChevronRight size={48} strokeWidth={0.5} /></button>
            </div>

            <div className="lightbox-footer">
                <p className="caption">{photo.caption}</p>
                <a href={photo.url} download className="download-btn">
                    <Download size={16} /> Download High-Res
                </a>
            </div>
        </motion.div>
    );
};

export default Lightbox;
