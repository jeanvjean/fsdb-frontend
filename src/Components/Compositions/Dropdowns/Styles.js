import styled from '@emotion/styled';
import { User } from 'emotion-icons/fa-solid';
import { Calendar } from 'emotion-icons/octicons';
import { DirectionsRun, Settings } from 'emotion-icons/material';

export const RunningIcon = styled(DirectionsRun)`
  width: 14px;
  margin-right: 0.5rem;
`;

export const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  z-index: 1000;
  transition: opacity 0.3s linear;
  overflow: auto;
  padding: 5rem 0;
`;

export const UserIcon = styled(User)`
  width: 14px;
  margin-right: 0.5rem;
`;
export const SettingsIcon = styled(Settings)`
  width: 17px;
  margin-right: 0.5rem;
`;
export const CalendarIcon = styled(Calendar)`
  width: 13px;
  margin-right: 0.5rem;
`;

export const Modal = styled.div`
  position: absolute;
  ${({ right, top, width, height, padding }) => `
    top: ${top};
    right: ${right};
    width: ${width};
    padding: ${padding};
    min-height: ${height};
  `}
  border-radius: 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.darkBlue};
  z-index: 150;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0.4;
      transform: translateY(-8%);
    }
    25% {
      opacity: 0.6;
      transform: translateY(-6%);
    }
    50% {
      opacity: 0.8;
      transform: translateY(-4%);
    }
    75% {
      opacity: 0.9;
      transform: translateY(-2%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const DropdownHeader = styled.header`
  padding: 1rem 1rem;
`;

export const MenuList = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  margin-bottom: 5px;
`;

export const ListItem = styled.li`
  display: block;
  padding: 10px 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.bodyBgColor};
    cursor: pointer;
    transition: all 0.3s ease-out;
  }
`;

export const DropdownFooter = styled.footer`
  // display: block;
  display: flex;
  align-items: center;
  padding: 10px 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.bodyBgColor};
  &:hover {
    background-color: ${({ theme }) => theme.colors.bodyBgColor};
    cursor: pointer;
    transition: all 0.3s ease-out;
  }
`;

export const Span = styled.span`
  text-align: center;
  display: block;
  color: ${({ theme }) => theme.colors.mediumBue};
  font-weight: 600;
`;
