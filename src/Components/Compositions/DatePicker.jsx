import React from 'react';
import DatePicker from 'react-date-picker';

const CustomDatePicker = ({handleChange, value}) => {

  return (
    <div>
      <DatePicker
        onChange={handleChange}
        value={value}
        format={"y-MM-dd"}
      />
    </div>
  );
}
export default CustomDatePicker