import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { galleryImages } from '../../data/constants';
import {
  Container,
  Heading,
  GridContainer,
  ImageContainer,
  GalleryImage,
  Modal,
  ModalContent,
  ModalImage,
  CloseButton,
  NavigationButton,
  ImageTitle,
  ViewMoreButton
} from './GalleryStyle';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    setSelectedImage(galleryImages[(currentIndex + 1) % galleryImages.length]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setSelectedImage(galleryImages[(currentIndex - 1 + galleryImages.length) % galleryImages.length]);
  };

  const displayedImages = useMemo(() => {
    if (isMobile && !showAll) {
      return galleryImages.slice(0, 3);
    }
    return galleryImages;
  }, [isMobile, showAll]);

  return (
    <Container id="gallery">
      <Heading>Galerija</Heading>
      <GridContainer>
        {displayedImages.map((img, index) => (
          <ImageContainer
            key={img.id}
            onClick={() => {
              setSelectedImage(img);
              setCurrentIndex(index);
            }}
          >
            <GalleryImage src={img.url} alt={img.title} />
            <ImageTitle>{img.title}</ImageTitle>
          </ImageContainer>
        ))}
      </GridContainer>

      {isMobile && galleryImages.length > 3 && (
        <ViewMoreButton onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show Less' : 'View More'}
        </ViewMoreButton>
      )}

      <AnimatePresence>
        {selectedImage && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <ModalContent
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalImage src={selectedImage.url} alt={selectedImage.title} />
              <CloseButton onClick={() => setSelectedImage(null)}>×</CloseButton>
              <NavigationButton 
                direction="prev" 
                onClick={handlePrev}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </NavigationButton>
              <NavigationButton 
                direction="next" 
                onClick={handleNext}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </NavigationButton>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Gallery; 