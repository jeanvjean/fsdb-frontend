import styled from '@emotion/styled';

export const DashboardContainer = styled.div`
  height: auto;
  width: 100%;
  display: flex;
`;

export const DashboardWrapper = styled.div`
  position: relative;
  z-index: 20;
  ${({ sidebarOpen }) =>
    !sidebarOpen ? `width: 100%;` : `width: calc(100% - 20.49%); transition: all 0.3s linear;`}

  @media (max-width: ${({ theme: { breaks } }) => breaks.MD}) {
    overflow-y: scroll;
    width: 100%;
  }
`;

export const Content = styled.div`
  padding: 2rem;
  line-break: nowrap;
  height: 100vh;
  overflow-y: auto;

  @media (max-width: ${({ theme: { breaks } }) => breaks.MD}) {
    padding: 1rem;
  }
`;

export const LayoutLoaderWrapper = styled.div`
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

export const AuthContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

export const FormWrapper = styled.div`
  flex-basis: 60%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  /* transform: translateX(-7%); */
  @media (max-width: ${({ theme }) => theme.breaks.SM}) {
    flex-basis: 100%;
  }
`;

export const Footer = styled.footer`
  width: 380px;
  margin: 50px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.lightBlack1};
  @media (max-width: ${({ theme }) => theme.breaks.SM}) {
    margin: 40px;
    text-align: center;
  }
`;
