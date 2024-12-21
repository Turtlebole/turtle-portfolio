import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 80px 0;
    background: ${({ theme }) => theme.bg};
    
    @media (max-width: 960px) {
        padding: 60px 20px;
    }
`;

const Wrapper = styled.div`
    max-width: 1100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`;

const Title = styled.h2`
    font-size: 42px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.2;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 32px;
    }
`;

const PlaylistsContainer = styled.div`
    width: 100%;
    max-width: 1100px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const PlaylistEmbed = styled.iframe`
    border-radius: 12px;
    width: 100%;
    height: 380px;
    border: none;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    background: ${({ theme }) => theme.card};
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }
`;

const Playlists = () => {
    return (
        <Container id="music">
            <Wrapper>
                <Title>Moje playliste</Title>
                <PlaylistsContainer>
                    <PlaylistEmbed
                        src="https://open.spotify.com/embed/playlist/6RX0Ff6sGtHf2dJqGWR4Py?utm_source=generator"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                    <PlaylistEmbed
                        src="https://www.youtube.com/embed/videoseries?list=PLyR1OANXfzk6VuZsp-9qswqBgG1-mIUzR"
                        allowFullScreen=""
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        loading="lazy"
                    />
                </PlaylistsContainer>
            </Wrapper>
        </Container>
    );
};

export default Playlists;
