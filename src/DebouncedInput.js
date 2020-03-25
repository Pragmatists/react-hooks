import { useDebounce } from './useDebounce'
import { TextInput } from './TextInput'
import React from 'react'

export const DebouncedInput = ({ onBlur, onChange, value, debounceTime }, ...props) => {
  const { debouncedValue, handleOnChange, handleOnBlur } = useDebounce({
    onBlur,
    onChange,
    value
  }, debounceTime)

  return (
    <TextInput
      onBlur={handleOnBlur}
      onChange={handleOnChange}
      value={debouncedValue}
      {...props}
    />
  )
}
