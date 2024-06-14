import styled from 'styled-components'

export const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(343.07deg, hsla(231, 17%, 36%, 0.06) 5.71%, hsla(231, 17%, 36%, 0) 64.83%);
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 80px 30px;
  @media (max-width: 960px) {
    padding: 66px 16px;
  }
  @media (max-width: 640px) {
    padding: 32px 16px;
    flex-direction: column;
  }
  z-index: 1;
`;

export const InnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const LeftContainer = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 640px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const RightContainer = styled.div`
  width: 50%;
  display: flex;
  order: 2;
  justify-content: end;
  gap: 12px;
  @media (max-width: 960px) {
    order: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
  }

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

export const ImageContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 640px) {
    padding: 10px;
  }
`;

export const Img = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 500px;
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  @media (max-width: 768px) {
    max-width: 400px;
    max-height: 400px;
  }

  @media (max-width: 640px) {
    max-width: 280px;
    max-height: 280px;
  }

`;

export const ProjectTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 640px) {
    margin-bottom: 10px;
  }
`;

export const SubTitle = styled.div`
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 30px;
  padding: 20px;
  color: ${({ theme }) => theme.text_primary + 95};

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 640px) {
    font-size: 16px;
    line-height: 32px;
  }
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.orange_detail};
`;


export const Tags = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
    padding: 20px;
`

export const Tag = styled.span`
    font-size: 18px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
    background-color: ${({ theme }) => theme.orange_detail + 20};
    padding: 2px 8px;
    border-radius: 10px;
`
