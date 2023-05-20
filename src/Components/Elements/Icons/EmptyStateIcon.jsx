import React from 'react'

export const EmptyStateIcon = ({ fill, height, width, ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 19.456 93.44" {...props}>
      <path
        data-name="Path 196"
        d="M17.344 0v36.608a111.6 111.6 0 01-.576 11.424q-.576 5.6-1.472 11.872H4.544q-.9-6.272-1.472-11.872a111.6 111.6 0 01-.576-11.424V0zM0 83.844a9.842 9.842 0 01.736-3.78 9.023 9.023 0 012.048-3.072 10.08 10.08 0 013.1-2.048 9.644 9.644 0 013.84-.768 9.486 9.486 0 013.776.768 10.08 10.08 0 013.1 2.048 9.421 9.421 0 012.08 3.072 9.486 9.486 0 01.776 3.78 9.416 9.416 0 01-.768 3.8 9.511 9.511 0 01-2.08 3.04 9.632 9.632 0 01-3.104 2.02 9.842 9.842 0 01-3.776.74 10.008 10.008 0 01-3.84-.74 9.632 9.632 0 01-3.1-2.016 9.1 9.1 0 01-2.052-3.044 9.77 9.77 0 01-.736-3.8z"
        fill="rgba(51,51,51,0.87)"
        opacity={0.467}
      />
    </svg>
  );
};

EmptyStateIcon.defaultProps = {
  fill: '#bbb',
  height: '5rem',
  width: '5rem',
};
