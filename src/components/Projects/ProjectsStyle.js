import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
`;

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 10px 0px 100px 0;
    gap: 40px;
`;

export const Title = styled.div`
    font-size: 38px;
    text-align: center;
    font-weight: 400;
    margin-top: 20px;
    color: ${({ theme }) => theme.colored_detail};
    @media (max-width: 768px) {
        font-size: 32px;
    }
`;

export const TimelineContainer = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    padding: 75px 0 40px;
    height: 700px;
`;

export const TimelineLine = styled.div`
    position: absolute;
    top: 155px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.primary}15;
    z-index: 1;
`;

export const SlideContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    margin-top: 25px;
`;

export const Pin = styled.div`
    position: relative;
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.bg};
    border: 2px solid ${({ theme }) => theme.primary};
    border-radius: 50%;
    z-index: 2;
    margin: 0;
    transform: translateY(-50%);

    &::before {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 20px;
        background-color: ${({ theme }) => theme.primary};
    }

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        background-color: ${({ theme }) => theme.primary};
        border-radius: 50%;
    }
`;

export const PinDate = styled.div`
    padding: 8px 15px;
    background: ${({ theme }) => theme.primary}15;
    color: ${({ theme }) => theme.primary};
    border: 1.8px solid ${({ theme }) => theme.primary};
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 15px;
    z-index: 2;
`;

export const CardWrapper = styled.div`
    margin-top: 2px;
    display: flex;
    justify-content: center;
`;

export const ProjectCard = styled.div`
    width: 330px;
    height: 490px;
    background: linear-gradient(343.07deg, hsla(231, 17%, 36%, 0.06) 5.71%, hsla(231, 17%, 36%, 0) 64.83%);
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.text_primary + 80};
    border-radius: 12px;
    box-shadow: 0 0 12px 4px rgba(0,0,0,0.4);
    overflow: hidden;
    padding: 26px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: all 0.5s ease-in-out;

    &:hover {
        transform: translateY(-10px);
        filter: brightness(1.2);
    }

    & img {
        width: 75%;
        height: 50%;
        align-self: center;
        border: 1px solid ${({ theme }) => theme.primary + 80};
        border-radius: 10px;
        box-shadow: 0 0 16px 2px rgba(0,0,0,0.3);
        user-select: none;
    }
`;

export const ProjectContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0px;
    padding: 0px 2px;
`;

export const ProjectTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    align-self: center;
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`;

export const ProjectDescription = styled.p`
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 99};
    margin-top: 8px;
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`;

export const Tags = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
`;

export const Tag = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
    background-color: ${({ theme }) => theme.primary + 15};
    padding: 2px 8px;
    border-radius: 10px;
`;
