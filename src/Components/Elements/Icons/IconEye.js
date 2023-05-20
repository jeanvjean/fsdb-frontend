import React from 'react';
import PropTypes from 'prop-types';

export const IconEye = (props) => (
  <svg width="1em" height="1em" viewBox="0 0 511.992 298.667" {...props}>
    <g data-name="Group 101">
      <g data-name="Group 100">
        <path
          data-name="Path 1165"
          d="M510.1 143.275C506.064 137.408 409.168 0 256 0 124.56 0 7.44 136.619 2.512 142.438a10.707 10.707 0 000 13.781c4.928 5.829 122.048 142.448 253.483 142.448s248.554-136.619 253.482-142.443a10.668 10.668 0 00.623-12.949zM255.995 277.338c-105.365 0-205.547-100.484-230.995-128 25.408-27.541 125.483-128 231-128 123.28 0 210.3 100.327 231.547 127.42-24.534 26.645-125.291 128.58-231.552 128.58z"
        />
      </g>
    </g>
    <g data-name="Group 103">
      <g data-name="Group 102">
        <path
          data-name="Path 1166"
          d="M255.995 64a85.333 85.333 0 1085.333 85.333A85.419 85.419 0 00255.995 64zm0 149.334a64 64 0 1164-64 64.079 64.079 0 01-64 64.004z"
        />
      </g>
    </g>
  </svg>
);

IconEye.propTypes = {
  fill: PropTypes.string,
};

IconEye.defaultProps = {
  fill: '#000',
};
