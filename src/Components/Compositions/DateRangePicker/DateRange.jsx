import React from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import styled from '@emotion/styled';

const DateRangeWrapper = styled.div`
  .react-calendar {
    border: 1px solid ${(p) => p.theme.colors.borderColor} !important;
  }

  .react-daterange-picker {
    width: 100%;
  }

  .react-daterange-picker__wrapper {
    height: 35px !important;
    flex: 1;
    width: 100%;
    background: ${(p) => p.theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    padding: 4px;
    margin: 5px 0;
    margin-top: 10px;
    overflow: auto;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    outline: none;
    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.green2};
    }
    * {
      color: ${({ theme }) => theme.colors.dark4};
      stroke: ${({ theme }) => theme.colors.borderColor};
      &:focus {
        outline: none !important;
      }
    }
  }
`;

export const DateRange = ({ 
  handleDateChange, 
  format, 
  value,
  locale, 
  ...props 
}) => {
  return (
    <DateRangeWrapper {...props}>
      <DateRangePicker onChange={handleDateChange} value={value} format={format} locale={locale}/>
    </DateRangeWrapper>
  );
};

DateRange.defaultValue = {
  format: `d-MM-y`,
  locale: "hu-HU"
}
