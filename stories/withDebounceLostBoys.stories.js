import React, { useState } from 'react'
import { withDebounce } from '../src/withDebounceLostBoys'
import { TextInput } from '../src/TextInput'

export default { title: 'withDebounce' }

const DebouncedInput = withDebounce((props) => <TextInput {...props} />, 1000)

export const withDebounceLostBoys = () => {
  const [value, setValue] = useState('')
  const handleBlur = ({ target: { value } }) => setValue

  return (
    <div style={{ display: 'inline-grid' }}>
      <DebouncedInput
        onChange={setValue}
        onBlur={handleBlur}
      />
      <span style={{ margin: '5px' }}>Debounced value:</span>
      <input value={value} disabled />
    </div>
  )
}
