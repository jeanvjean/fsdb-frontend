import styled from '@emotion/styled';
import { MoreVert } from 'emotion-icons/material';

export const MoreIcon = styled(MoreVert)`
  width: 17px;
  margin: 0 auto;
  color: #38383f;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.greyWeb};
  padding: 1.5rem 2rem;
  min-height: 100px;

  @media (max-width: ${(p) => p.theme.breaks.MD}) {
    padding: 1.5rem 1rem;
  }
`;

export const ProfileWrapper = styled.div`
  max-width: 200px;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.small};
  color: #38383f;
  overflow: hidden;
  @media (max-width: ${(p) => p.theme.breaks.MD}) {
    width: 125px;
  }
`;

export const Profile = styled.div`
  max-width: calc(100% - 50px);
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 7px;
  font-family: ${(p) => p.theme.fontFamilies.helveticaNeue};
`;

export const BusinessName = styled.small`
  text-transform: uppercase;
  font-size: 8px;
`;

export const Span = styled.span`
  display: block;
  min-width: 65px;
  font-weight: 700;
  font-size: ${(p) => p.theme.fontSizes.small};
  font-family: ${(p) => p.theme.fontFamilies.openSans};
  @media (max-width: ${(p) => p.theme.breaks.MD}) {
    font-size: ${(p) => p.theme.fontSizes.xSmaller};
  }
`;

export const Div = styled.div`
  width: 70px;
  position: relative;

  @media (max-width: ${(p) => p.theme.breaks.XL}) {
    width: 70px;
  }
  @media (max-width: ${(p) => p.theme.breaks.LG}) {
    width: 65px;
  }
  @media (max-width: ${(p) => p.theme.breaks.MD}) {
    width: 65px;
  }
  @media (max-width: ${(p) => p.theme.breaks.MD}) {
    width: 40px;
  }
`;

export const Button = styled.button`
  height: 100%;
  background: transparent;
  border: none;

  &:focus {
    outline: 0;
  }

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s linear;
  }
`;

export const Img = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

export const NavItems = styled.div`
  flex-basis: calc(100% - 240px);
  display: flex;
  justify-content: flex-end;
  @media (max-width: ${(p) => p.theme.breaks.MD}) {
    flex-basis: 100%;
  }
  @media (max-width: ${(p) => p.theme.breaks.SM}) {
    flex-basis: 100%;
  }
`;

export const StyledNavBar = styled.nav`
  background-color: ${({ theme }) => theme.colors.greyWeb};
  width: 100%;
  padding: 0.5rem 2rem;
  display: flex;
  flex-flow: column nowrap;
`;

export const BurgerIcon = styled.button`
  width: 18px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  &:focus {
    outline: 0;
  }
`;

export const BurgerLines = styled.div`
  width: 18px;
  height: 2px;
  border-radius: 20px;
  background-color: #38383f;
`;
