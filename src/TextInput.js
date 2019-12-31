import React from 'react'

const handleOnChange = (onChange) => (event) => onChange(event.target.value)

export const TextInput = ({ onChange, onBlur, value }) => (
  <input
    onChange={handleOnChange(onChange)}
    onBlur={onBlur}
    value={value}
  />
)
