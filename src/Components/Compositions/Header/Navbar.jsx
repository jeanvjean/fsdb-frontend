import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';
import Avatar from 'react-avatar';

import NotificationsDropdown from '../Dropdowns/NotificationsDropdown';
import {
  MoreIcon,
  Nav,
  NavItems,
  Div,
  ProfileWrapper,
  Profile,
  Span,
  Button,
  Img,
  BurgerLines,
  BurgerIcon,
  BusinessName,
} from './Styles';
import Breadcrumb from './Breadcrumb';
import { DashboardBreadcrumb } from './DashboardHeader';
import DropdownMenu from '../Dropdowns/DropdownMenu';
import { asyncActions } from '../../../api';
import { useUser } from '../../../hooks/useUser';
import { SettingsIconSVG } from '../../Icons';
import { ROLES } from '../Sidebar/sidebarData';

const Navbar = (props) => {
  const { toggleSidebar } = props;
  const history = useHistory();
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  const [notificationsDropdown, setNotificationsDropdown] = useState(false);

  // const { user } = useSelector(({ users }) => ({
  //   user: users?.user,
  // }));
  const {user} = useUser()

  const toggleUserDropdown = () => {
    setUserDropdownVisible(!userDropdownVisible);
  };

  const toggleNotificationsDropdown = () => {
    setNotificationsDropdown(!notificationsDropdown);
  };

  const goToSettings = () => {
    history.push('/dashboard/settings');
  };

  const handleLogout = async () => {
    localStorage.removeItem('token')
    asyncActions('LOGOUT').loading(true);
    asyncActions('LOGOUT').success(true);
    history.replace('/login')
    history.go(0)
  };

  const renderNavItems = () => {
    return (
    <>

    {
      user.user_type === ROLES.ADMIN && (
        <Div>
        <Button onClick={() => history.push(`/dashboard/settings`)}>
          {/* <Img style={{cursor:'pointer'}} size="18px" src="/settings-icon.svg" alt="settings icon" /> */}
          <SettingsIconSVG style={{cursor:'pointer'}} />
        </Button>
      </Div>
      )
    }


      {/* <Div>
        <Button onClick={toggleNotificationsDropdown}>
          <Img size="18px" src="/notification-icon.svg" alt="notification" />
        </Button>
        {notificationsDropdown && (
          <NotificationsDropdown toggleDropdown={toggleNotificationsDropdown} />
        )}
      </Div> */}

      <ProfileWrapper>
        <Avatar
          name={`${user.first_name} ${user.last_name}`}
          email=""
          round
          size="35"
          src={'/default-avatar.svg'}
          color={Avatar.getRandomColor('sitebase', ['#00CFE6', '#03E060', '#574CC1'])}
        />

        <Profile>
          <div>
            <Span>{user.first_name} {user.last_name}</Span>
            <BusinessName>{user.user_type}</BusinessName>
          </div>
        </Profile>

        <Button onClick={toggleUserDropdown}>
          <MoreIcon />
        </Button>
        {userDropdownVisible && <DropdownMenu {...props} handleLogout={handleLogout} toggleDropdown={toggleUserDropdown} />}
      </ProfileWrapper>
    </>
  )};


  return (
    <Nav id="mainNavbar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BurgerIcon onClick={toggleSidebar}>
          <BurgerLines />
          <BurgerLines />
          <BurgerLines />
        </BurgerIcon>
        <DashboardBreadcrumb style={{ marginLeft: '1rem' }}>
          {/* <Icon src="/home-icon.svg" alt="home" /> */}
          <Breadcrumb {...props} />
        </DashboardBreadcrumb>
      </div>
      <NavItems style={{ flexBasis: 'calc(100% - 60%)' }}>{renderNavItems()}</NavItems>
    </Nav>
  );
};

export default Navbar;
