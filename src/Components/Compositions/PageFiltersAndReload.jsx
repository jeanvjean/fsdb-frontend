import React from 'react';
import styled from '@emotion/styled';
import { DateRange } from './DateRangePicker/DateRange';
import { Label, ReloadIcon } from '../Elements';
import SelectField from '../Elements/SelectField';

export const Reloader = styled.button`
  border: 1px solid #00cfe6;
  background: #ffffff;
  height: 32px;
  min-width: 32px;
  display: flex;
  position: relative;
  top: 3px;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
    border-color: #15a5db;
    transition: all 0.2s linear;
  }
  &:focus {
    outline: none;
  }
`;
const FilterContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  width: 50%;
`;

const PageFiltersAndReload = ({
  handleSelectDateRange,
  handleRefreshPage,
  handleDateChange,
  refreshing,
  showCustom,
  dateRangeRef,
  dates,
  period,
}) => {
  return (
    <FilterContainer>
      <SelectField
        label="Date Range"
        style={{ minWidth: '268px' }}
        onChange={handleSelectDateRange}
        ref={dateRangeRef}
        id="date-range"
        name="period"
        flex={0}
        noRadius
        whiteBg
      >
        <option value="">
          Lifetime
        </option>
        <option selected={period === '7'} value="7">Last 7 Days</option>
        <option selected={period === '30'} value="30">Last 30 Days</option>
        <option selected={period === '90'} value="90">Last 90 Days</option>
        <option value="custom">Custom Date Filter</option>
      </SelectField>
      {showCustom && (
        <Label>
          Select Date Range
          <DateRange value={dates} handleDateChange={handleDateChange}/>
        </Label>
      )}
      <Reloader style={{ marginTop: '1rem' }} onClick={handleRefreshPage}>
        <ReloadIcon />
      </Reloader>
    </FilterContainer>
  );
};

export default PageFiltersAndReload;
