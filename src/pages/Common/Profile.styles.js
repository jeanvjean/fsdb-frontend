import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const ProfileContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1rem;
  @media (max-width: ${({ theme }) => theme.breaks.MD}) {
    grid-template-columns: 1fr;
  }
`;

export const UserCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  height: 350px;
  position: relative;
  width: 240px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  border: 1px solid ${({ theme }) => theme.colors.blue1};
`;

export const UserImg = styled.img`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blue1};
`;

export const UserType = styled.small`
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
  color: ${({ theme }) => theme.colors.blue1};
  text-transform: uppercase;
  font-weight: 400;
`;

export const UserDetails = styled.div`
  padding: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.black};
`;

export const commonEditTabStyles = css`
  padding: 0.2rem 1rem;
  cursor: pointer;
  width: 200px;
  border: none;
  background: transparent;
  text-align: center;
  text-transform: uppercase;
`;

export const ProfileTab = styled.span`
  ${commonEditTabStyles}
  font-size: ${({ theme }) => theme.fontSizes.small};
  &:hover {
    color: ${({ theme }) => theme.colors.blue1};
    transition: color 0.3s ease-in;
  }

  @media (max-width: ${({ theme }) => theme.breaks.LG}) {
    font-size: ${({ theme }) => theme.fontSizes.xSmall};
  }

  ${({ theme, isActive }) => {
    return isActive
      ? `
        color: ${theme.colors.blue1};
        border-bottom: 1px solid ${theme.colors.blue1};
        `
      : `
      color: ${theme.colors.black};
  `;
  }}
`;

export const ChangePasswordTab = styled.span`
  ${commonEditTabStyles}
  font-size: ${({ theme }) => theme.fontSizes.small};
  &:hover {
    color: ${({ theme }) => theme.colors.blue1};
    transition: color 0.3s ease-in;
  }

  @media (max-width: ${({ theme }) => theme.breaks.LG}) {
    font-size: ${({ theme }) => theme.fontSizes.xSmall};
  }

  ${({ theme, isActive }) => {
    return !isActive
      ? `
        text-transform: uppercase;
        color: ${theme.colors.blue1};
        border-bottom: 1px solid ${theme.colors.blue1};
        `
      : `
      color: ${theme.colors.black};
  `;
  }}
`;
