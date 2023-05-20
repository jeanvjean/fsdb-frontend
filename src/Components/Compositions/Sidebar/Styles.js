import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { NavigateNext } from 'emotion-icons/material';

export const NextIcon = styled(NavigateNext)`
  width: 16px;
  float: right;
`;

export const SidebarHeader = styled.header`
  padding: 0 2rem;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  @media (max-width: ${({ theme: { breaks } }) => breaks.MD}) {
    padding: 0 1rem;
  }
`;

export const Img = styled.img`
  max-width: ${({ size }) => size};
  max-height: ${({ size }) => size};
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: calc(100% - 80px);
`;

export const Span = styled.span`
  flex-basis: 61%;
`;

export const ListItem = styled.li`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.normal};
  height: 55px;
  padding-left: 2rem;
  padding-right: 2rem;
  margin: auto;
  overflow-x: hidden;
  line-break: nowrap;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.smaller};
  color: ${({ theme }) => theme.colors.lightBlack2};
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ active }) =>
    active === 'active' &&
    `
    background-color: rgba(111, 108, 211, 0.1);
  `}

  @media (max-width: ${({ theme: { breaks } }) => breaks.MD}) {
    padding: 0 1rem;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.small};
  }

  &:hover {
    background-color: rgba(111, 108, 211, 0.1);
    cursor: pointer;
    div {
      visibility: visible;
    }
  }
`;

export const IconDiv = styled.div`
  flex-basis: 30%;
  visibility: hidden;
  ${({ active }) =>
    active === 'active' &&
    `
    visibility: visible;
  `}
`;

export const SideBarContainer = styled.div`
  // position: relative;
  width: ${({clientWindowWidth}) => clientWindowWidth === 'desktop' ? '21%' : clientWindowWidth ==='medium' ? '30%' : '80%'};
  height: 100vh;
  background-color: #f0f0f0;
  position: ${({clientWindowWidth}) => clientWindowWidth === 'mobile' ? 'fixed' : 'sticky'};
  top: 0;
  z-index: ${({clientWindowWidth}) => clientWindowWidth === 'mobile' ? '3000' : '2'};
  overflow-x: hidden;

  ${({clientWindowWidth}) => clientWindowWidth === 'mobile' && css`
    z-index: 30;
  `}

  ${({ sidebarOpen }) =>
    !sidebarOpen
      ? `
    width: 0%;
    transition: all 0.2s linear;
    `
      : `
        transform: translateX(0%);
        transition: all 0.2s linear;
      `}

  ${({clientWindowWidth, sidebarOpen}) => clientWindowWidth === 'desktop' && css`
    // transform: translateX(0%);
    // width: ${sidebarOpen ? '21%': '0%'};
    transition: all 0.2s linear;  
  `}

  ${({clientWindowWidth, sidebarOpen}) => clientWindowWidth === 'medium' && css`
    // transform: translateX(0%);
    // width: ${sidebarOpen ? '30%': '0%'};
    transition: all 0.2s linear;  
  `}  

//   ${({clientWindowWidth, sidebarOpen}) => clientWindowWidth === 'mobile' && css`
//   transform: ${sidebarOpen ? 'translateX(-100%)': 'translateX(0%)'};
//   width: ${sidebarOpen ? '0%': '50%'};
//   transition: all 0.2s linear;  
//   position: fixed;
//   transform: translateX(-100%);
//   left: 0;
// `}  



`;

export const Footer = styled.footer`
  margin: 2rem;
  @media (max-width: ${({ theme: { breaks } }) => breaks.SM}) {
    margin: 2rem 1rem;
  }

  ${({ sidebarOpen }) =>
    !sidebarOpen
      ? `
    visibility: hidden;
    transition: all 0.2s linear;
  `
      : `
    opacity: 1;
    visibility: visible;
    transition: all 0.5s linear;
  `}
`;

export const DarkMode = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 0.4fr;
  color: ${({ theme }) => theme.colors.lightBlack2};
  @media (max-width: ${({ theme: { breaks } }) => breaks.SM}) {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.small};
  }
`;

export const H3 = styled.h3`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.normal};
  margin-bottom: 1rem;
  color: ${({ theme: { colors } }) => colors.grey};
  opacity: 0.8;
`;


// @media (max-width: ${({ theme: { breaks } }) => breaks.LG}) {
//   ${({ sidebarOpen }) =>
//     !sidebarOpen
//       ? `
//       width: 0;
//       transition: all 0.2s linear;
//       `
//       : `
//       transform: translateX(0%);
//       width: 30%;
//       transition: all 0.2s linear;
//     `}
// }


// @media (max-width: ${({ theme: { breaks } }) => breaks.MD}) {
//   ${({ sidebarOpen }) =>
//     !sidebarOpen
//       ? `
//       width: 0;
//       transition: all 0.2s linear;
//       background-color: red;
//       `
//       : `
//       transform: translateX(0%);
//       width: 0%;
//       transition: all 0.2s linear;
//       background-color: green;
//     `}
// }
// @media (max-width: ${({ theme: { breaks } }) => breaks.SM}) {
//   z-index: 30;
//   ${({ sidebarOpen }) =>
//     sidebarOpen
//       ? `transform: translateX(-100%); position: fixed; left: 0; width: 0%;`
//       : `transform: translateX(0%); width: 50%; position: fixed; left: 0;`}
//   transition: all 0.3s linear;
// }