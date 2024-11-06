import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const HeroContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.bg};
    padding: 0 40px;
    height: calc(100vh - 80px); // Adjust based on your navbar height

    @media screen and (max-width: 960px) {
        padding: 0 20px;
        height: auto;
        min-height: 100vh;
    }
`;

export const HeroInnerContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    max-width: 1400px;
    width: 100%;
    padding: 40px 0;
    gap: 60px;
    align-items: center;
    animation: ${fadeIn} 1s ease;

    @media screen and (max-width: 960px) {
        grid-template-columns: 1fr;
        padding: 80px 0;
        gap: 30px;
    }
`;

export const HeroLeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    order: 1;

    @media screen and (max-width: 960px) {
        order: 2;
        align-items: center;
        text-align: center;
    }
`;

export const HeroRightContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    order: 2;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, ${({ theme }) => theme.primary}20 0%, transparent 70%);
        border-radius: 50%;
        z-index: 0;
    }

    @media screen and (max-width: 960px) {
        order: 1;
    }
`;

export const Img = styled.img`
    position: relative;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    border: 4px solid ${({ theme }) => theme.primary};
    object-fit: cover;
    object-position: center;
    z-index: 1;
    filter: contrast(1.1) brightness(1.1);
    box-shadow: 0 8px 30px rgba(0,0,0,0.12);

    @media screen and (max-width: 768px) {
        width: 280px;
        height: 280px;
    }
`;

export const Title = styled.h1`
    font-size: 60px;
    font-weight: 800;
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.1;
    margin: 0;
    background: linear-gradient(
        to right,
        ${({ theme }) => theme.text_primary} 0%,
        ${({ theme }) => theme.primary} 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media screen and (max-width: 768px) {
        font-size: 40px;
    }
`;

export const TextLoop = styled.div`
    display: flex;
    gap: 12px;
    font-size: 32px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.2;

    @media screen and (max-width: 768px) {
        font-size: 24px;
        align-items: center;
        justify-content: center;
    }
`;

export const Span = styled.span`
    color: ${({ theme }) => theme.primary};
    cursor: default;
`;

export const SubTitle = styled.p`
    font-size: 20px;
    line-height: 1.6;
    color: ${({ theme }) => theme.text_secondary};
    margin: 0;
    max-width: 600px;

    @media screen and (max-width: 768px) {
        font-size: 16px;
    }
`;

export const ResumeButton = styled.a`
    width: fit-content;
    padding: 16px 32px;
    background: ${({ theme }) => theme.primary}15;
    color: ${({ theme }) => theme.primary};
    border: 1.8px solid ${({ theme }) => theme.primary};
    border-radius: 12px;
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    svg {
        font-size: 20px;
    }

    &:hover {
        background: ${({ theme }) => theme.primary}30;
        color: ${({ theme }) => theme.primary};
        box-shadow: 0 5px 10px ${({ theme }) => theme.primary}15;
    }

    @media screen and (max-width: 768px) {
        padding: 12px 24px;
        font-size: 16px;
        
        svg {
            font-size: 18px;
        }
    }
`;

export const ResumeButtonComponent = ({ children }) => {
    const handleDownload = (event) => {
        event.preventDefault();
        const fileUrl = '/CV/CV.pdf';
        const fileName = 'CV.pdf';

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <ResumeButton href="#" onClick={handleDownload}>
            <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {children}
        </ResumeButton>
    );
};