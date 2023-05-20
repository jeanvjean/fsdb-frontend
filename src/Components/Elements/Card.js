import styled from '@emotion/styled';

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};
  border-radius: 1px;
  box-shadow: 0 1px 13px rgba(0, 0, 0, 0.01);
  padding: 3rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  min-height: 200px;
  position: relative;
  overflow: auto;

  @media (max-width: ${({ theme: { breaks } }) => breaks.MD}) {
    padding: 3rem 0.5rem 2rem 0.5rem;
  }

`;

export const CardHeader = styled.div`
  color: ${({ theme: { colors } }) => colors.dark3};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.normal};
  margin-bottom: 30px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${({ theme: { breaks } }) => breaks.MD}) {
    display: block;
    
  }
`;
