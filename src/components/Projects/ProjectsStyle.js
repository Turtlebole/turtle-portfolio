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
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

export const Title = styled.div`
    font-size: 38px;
    text-align: center;
    font-weight: 400;
    margin-top: 20px;
    color: ${({ theme }) => theme.colored_detail};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 32px;
    }
`;

export const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

export const CarouselWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 1350px;
    overflow: hidden;

    @media (max-width: 768px) {
        overflow-x: auto;
        white-space: nowrap;
        padding: 0 20px;
    }
`;

export const ToggleButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    width: calc(100% - 40px);
    max-width: 1350px;
    transform: translateY(-50%);
    pointer-events: none;
    gap: 16px;

    & > div:first-child {
        margin-left: 20px;
    }
    & > div:last-child {
        margin-right: -20px;
    }

    @media (max-width: 1200px) {
        position: static;
        top: auto;
        transform: none;
        margin-top: 20px;
        width: 100%;
        justify-content: center;
        gap: 12px;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

export const ToggleButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    user-select: none;
    background: ${({ theme }) => theme.primary + '20'};
    color: ${({ theme }) => theme.darkMode ? '#FFFFFF' : '#000000'};
    pointer-events: all;
    transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        background: ${({ theme }) => theme.primary + '60'};
        transform: scale(1.1);
    }

    @media (max-width: 1200px) {
        font-size: 20px;
        padding: 12px;
    }

    @media (max-width: 768px) {
        padding: 14px;
        font-size: 24px;
    }
`;

export const Divider = styled.div`
    width: 1.5px;
    background: ${({ theme }) => theme.primary};
`;

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 32px;
    grid-auto-rows: minmax(100px, auto);
    @media (max-width: 960px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 640px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

export const LeftArrowSVG = styled.svg.attrs({
    width: '24',
    height: '24',
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
})`
    path {
        stroke: ${({ theme }) => theme.highlighted_svg};
    }
`;

export const RightArrowSVG = styled.svg.attrs({
    width: '24',
    height: '24',
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
})`
    path {
        stroke: ${({ theme }) => theme.highlighted_svg};
    }
`;

export const LeftArrowPath = () => (
    <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
);

export const RightArrowPath = () => (
    <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
);
