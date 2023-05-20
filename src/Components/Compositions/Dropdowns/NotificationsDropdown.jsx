import React from 'react'
import { Span, DropdownHeader, MenuList, ListItem, DropdownFooter } from './Styles'
import MainModal from './MainModal';

const NotificationsDropdown = ({ toggleDropdown }) => {
  return (
    <MainModal
      toggleDropdown={toggleDropdown}
      width="350px"
      top="3rem"
      right="1rem"
    >
      <DropdownHeader>
        <h6 className="text-sm text-muted">You have {13} notifications.</h6>
      </DropdownHeader>
      <MenuList>
        <ListItem>Notification 1</ListItem>
        <ListItem>Notification 2</ListItem>
        <ListItem>Notification 3</ListItem>
        <ListItem>Notification 4</ListItem>
      </MenuList>
      <DropdownFooter>
        <Span>View All</Span>
      </DropdownFooter>
    </MainModal>
  );
}

export default NotificationsDropdown
