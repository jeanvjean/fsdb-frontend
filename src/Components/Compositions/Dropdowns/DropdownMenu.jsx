/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';

import {
  DropdownHeader,
  MenuList,
  DropdownFooter,
} from './Styles';
import { withRouter, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import MainModal from './MainModal';
import { Img as Icon } from '../Header/DashboardHeader';
import { ProfileIconSVG, SettingsIconSVG } from '../../Icons';
import { useUser } from '../../../hooks/useUser';
import { ROLES } from '../Sidebar/sidebarData';

const dropdownData = [
  {
    icon: ProfileIconSVG,
    item: 'My Profile',
    link: '/dashboard/profile',
  },
  {
    icon: SettingsIconSVG,
    item: 'Settings',
    link: '/dashboard/settings',
  },
];

const DdLink = styled(Link)`
  // display: block;
  display: flex;
  align-items: center;
  justify-contentent: center;
  padding: 10px 1rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black2};
  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.black2};
    background-color: ${({ theme }) => theme.colors.bodyBgColor};
    cursor: pointer;
    transition: all 0.3s ease-out;
  }
`;

const DropdownMenu = ({ history, toggleDropdown, handleLogout }) => {

  const {user} = useUser()

  return (
    <MainModal
      toggleDropdown={toggleDropdown}
      width="170px"
      right="2rem"
      top="5rem"
    >
      <DropdownHeader>WELCOME!</DropdownHeader>
      <MenuList>
        {dropdownData.filter(r=> {
          if(user.user_type !==ROLES.ADMIN && r.item === 'Settings'){
            return false
          }
          return true
        }).map((el, i) => {
          const {icon:RouteIcon} = el
          return (
            <li key={i}>
              <DdLink to={el.link}>
                <RouteIcon style={{marginRight: '0.8rem'}} />
                {el.item}
              </DdLink>
            </li>
          )
        })}
      </MenuList>
      <DropdownFooter onClick={handleLogout}>
        <Icon src="/logout-icon.svg" />
        Logout
      </DropdownFooter>
    </MainModal>
  );
};

export default withRouter(DropdownMenu);
