import React, { useState } from 'react'
import { withDebounce as withDebounceLostBoys } from '../src/withDebounceLostBoys'
import { withDebounce as withDebouncePirates } from '../src/withDebouncePirates'
import { TextInput } from '../src/TextInput'

export default { title: 'withDebounce' }

const DebouncedInputLostBoys = withDebounceLostBoys((props) => <TextInput {...props} />, 1000)

export const lostBoys = () => {
  const [value, setValue] = useState('')
  const handleBlur = ({ target: { value } }) => setValue

  return (
    <div style={{ display: 'inline-grid' }}>
      <DebouncedInputLostBoys
        onChange={setValue}
        onBlur={handleBlur}
      />
      <span style={{ margin: '5px' }}>Debounced value:</span>
      <input value={value} disabled />
    </div>
  )
}

const DebouncedInputPirates = withDebouncePirates((props) => <TextInput {...props} />, 1000)

export const pirates = () => {
  const [value, setValue] = useState('')
  const handleBlur = ({ target: { value } }) => setValue

  return (
    <div style={{ display: 'inline-grid' }}>
      <DebouncedInputPirates
        onChange={setValue}
        onBlur={handleBlur}
      />
      <span style={{ margin: '5px' }}>Debounced value:</span>
      <input value={value} disabled />
    </div>
  )
}
