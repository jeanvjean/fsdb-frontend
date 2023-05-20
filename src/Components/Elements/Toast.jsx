import React from 'react';
import { toast } from 'react-toastify';
import {
  FaInfo,
  FaCheck,
  FaExclamationTriangle,
  FaBug,
  FaExclamationCircle,
} from 'react-icons/fa';

const style = {
  marginTop: 9,
};

const displayIcon = (type) => {
  switch (type) {
    case 'success':
      return <FaCheck style={style} />;
    case 'info':
      return <FaInfo />;
    case 'error':
      return <FaExclamationCircle />;
    case 'warning':
      return <FaExclamationTriangle style={style} />;
    default:
      return <FaBug style={style} />;
  }
};

export const toastMessage = ({ type, message, options }) => {
  return toast[type](
    <div data-testid="modal-alert" style={{ display: 'flex', color: 'white' }}>
      <div
        data-testid="modal-alert-type"
        style={{
          fontSize: 15,
          paddingTop: 8,
          flexShrink: 0,
          textAlign: 'center',
          width: '30px',
        }}
      >
        {displayIcon(type)}
      </div>
      <div data-testid="modal-message" style={{ flexGrow: 1, fontSize: 15, padding: '8px 12px' }}>
        {message}
      </div>
    </div>,
    { ...options }
  );
}

export default toastMessage;
