import React, { useEffect, useCallback } from 'react';
import { Modal } from '../Dropdowns/Styles';

const MainModal = ({ toggleDropdown, children, ...props }) => {
  const dropdownRef = React.createRef();

  const handleToggling = useCallback(
    (e) => {
      if (!dropdownRef?.current?.contains(e.target)) {
        toggleDropdown();
      }
    },
    [dropdownRef, toggleDropdown]
  );

  useEffect(() => {
    document.addEventListener('click', handleToggling);
    return () => {
      document.removeEventListener('click', handleToggling);
    };
  }, [handleToggling]);

  return (
    <Modal {...props} ref={dropdownRef}>
      {children}
    </Modal>
  );
};

export default MainModal;
