import React from 'react';

export const WarningIcon = ({ fill, ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" {...props}>
      <g id="Exclamation" transform="translate(-292 -183)">
        <g id="Exclamation-2" data-name="Exclamation" transform="translate(-56 22.111)">
          <rect
            id="Rectangle-9"
            width="4"
            height="25"
            rx="2"
            transform="translate(371.789 170.773)"
            fill={fill}
          />
          <rect
            id="Rectangle-9-Copy"
            width="4"
            height="4"
            rx="2"
            transform="translate(371.789 197.662)"
            fill={fill}
          />
        </g>
        <g
          id="Ellipse_35"
          data-name="Ellipse 35"
          transform="translate(292 183)"
          fill="none"
          stroke={fill}
          stroke-width="3"
        >
          <circle cx="25.5" cy="25.5" r="25.5" stroke="none" />
          <circle cx="25.5" cy="25.5" r="24" fill="none" />
        </g>
      </g>
    </svg>
  );
};

WarningIcon.defaultProps = {
  fill: 'red',
};
