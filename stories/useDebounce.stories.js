import React, { useState } from 'react'
import { DebouncedInput } from '../src/DebouncedInput'

export default { title: 'useDebounce' }

export const useDebounce = () => {
  const [value, setValue] = useState('')
  const handleBlur = ({ target: { value } }) => setValue

  return (
    <div style={{ display: 'inline-grid' }}>
      <DebouncedInput
        onChange={setValue}
        onBlur={handleBlur}
        value={value}
        debounceTime={1000}
      />
      <span style={{ margin: '5px' }}>Debounced value:</span>
      <input value={value} disabled />
    </div>
  )
}
