import styled from 'styled-components';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(343.07deg, hsla(231, 17%, 36%, 0.06) 5.71%, hsla(231, 17%, 36%, 0) 64.83%);
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;

    @media (min-width: 961px) {
        padding: 40px;
    }
`;

export const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    gap: 20px;

    @media (min-width: 961px) {
        flex-direction: row;
        gap: 40px;
    }
`;

export const LeftContainer = styled.div`
    flex: 1;
    background-color: ${({ theme }) => theme.card};
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 600px;

    @media (max-width: 960px) {
        order: 2;
        padding: 24px;
    }
`;

export const RightContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 960px) {
        order: 1;
    }
`;

export const ImageContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 500px;

    @media (max-width: 960px) {
        padding: 10px;
        max-width: 400px;
    }

    @media (max-width: 640px) {
        padding: 5px;
        max-width: 280px;
    }
`;

export const Img = styled.img`
    width: 100%;
    border: 2px solid ${({ theme }) => theme.primary};
    border-radius: 12px;
`;

export const ProjectHeader = styled.div`
    margin-bottom: 8px;
`;

export const ProjectTitle = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 8px;
`;

export const ProjectSubtitle = styled.p`
    color: ${({ theme }) => theme.text_secondary};
    font-size: 16px;
    font-weight: 500;
`;

export const Divider = styled.div`
    height: 1px;
    background: ${({ theme }) => theme.text_secondary + '20'};
    margin: 16px 0;
`;

export const InfoSection = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 24px;
`;

export const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const InfoLabel = styled.span`
    color: ${({ theme }) => theme.text_secondary};
    font-size: 14px;
`;

export const InfoValue = styled.span`
    color: ${({ theme }) => theme.text_primary};
    font-size: 16px;
    font-weight: 500;
`;

export const Description = styled.div`
    color: ${({ theme }) => theme.text_primary};
    font-size: 16px;
    line-height: 1.7;
    margin-bottom: 24px;
`;

export const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 24px;
`;

export const Tag = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + '15'};
    padding: 6px 16px;
    border-radius: 100px;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.primary + '30'};
    }
`;

export const Links = styled.div`
    display: flex;
    gap: 16px;
    margin-top: auto;
`;

export const GitHubLink = styled.a`
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: ${({ theme }) => theme.text_primary};
    background: ${({ theme }) => theme.card_light};
    padding: 12px 20px;
    border-radius: 100px;
    font-weight: 500;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
        background: ${({ theme }) => theme.text_primary + '10'};
        color: ${({ theme }) => theme.primary};
        transform: translateY(-2px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    }

    svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
        transition: all 0.3s ease;
    }
`;
