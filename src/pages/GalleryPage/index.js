import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { extendedGalleryImages } from '../../data/constants';
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
} from '../../components/Gallery/GalleryStyle';

const GalleryPage = () => {
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

    const displayedImages = useMemo(() => {
        if (isMobile && !showAll) {
            return extendedGalleryImages.slice(0, 3);
        }
        return extendedGalleryImages;
    }, [isMobile, showAll]);

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => 
            prevIndex === extendedGalleryImages.length - 1 ? 0 : prevIndex + 1
        );
        setSelectedImage(extendedGalleryImages[currentIndex === extendedGalleryImages.length - 1 ? 0 : currentIndex + 1]);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? extendedGalleryImages.length - 1 : prevIndex - 1
        );
        setSelectedImage(extendedGalleryImages[currentIndex === 0 ? extendedGalleryImages.length - 1 : currentIndex - 1]);
    };

    return (
        <Container id="gallery">
            <Heading>Prethodne žurke</Heading>
            <GridContainer>
                {displayedImages.map((image, index) => (
                    <ImageContainer
                        key={image.id}
                        onClick={() => {
                            setSelectedImage(image);
                            setCurrentIndex(index);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <GalleryImage src={image.url} alt={image.title} />
                        <ImageTitle>{image.title}</ImageTitle>
                    </ImageContainer>
                ))}
            </GridContainer>

            {isMobile && extendedGalleryImages.length > 3 && (
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
                            <NavigationButton direction="prev" onClick={handlePrev}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </NavigationButton>
                            <NavigationButton direction="next" onClick={handleNext}>
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

export default GalleryPage; 