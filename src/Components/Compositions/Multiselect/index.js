import React, { useState } from 'react'
import { Box } from 'rebass'
import { Multiselect } from 'multiselect-react-dropdown';

const MultiselectForm = ({options, selectedValues, onSelect, onRemove, displayValue }) => {

  // const [options, setOptions] = useState(allOptions)

  return (
    <Box>
      <Multiselect
      options={options}
      selectedValues={selectedValues}
      onSelect={onSelect}
      onRemove={onRemove}
      displayValue={displayValue}
      style={
        { chips: { background: "#574CC2" } }
      }
      />      
    </Box>
  )
}

MultiselectForm.defaultProps = {
  options: [],
  selectedValues: [],
  onSelect: () => false,
  onRemove: () => false,
  onRemove: () => false,
  displayValue: "name"
}

export default MultiselectForm
