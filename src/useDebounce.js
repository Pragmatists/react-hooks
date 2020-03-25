import debounce from 'lodash/debounce'
import isFunction from 'lodash/isFunction'
import { useCallback, useEffect, useState } from 'react'

export const useDebounce = ({ onBlur, onChange, value }, debounceTime = 300) => {
  const [debouncedValue, setInternalValue] = useState(value || '')
  const debouncedOnChange = useCallback(debounce(onChange, debounceTime), [onChange])

  const handleOnChange = useCallback((onChangeValue = '') => {
    setInternalValue(onChangeValue)
    debouncedOnChange(onChangeValue)
  }, [debouncedOnChange])

  const handleOnBlur = useCallback((event) => {
    if (isFunction(debouncedOnChange.flush)) {
      debouncedOnChange.flush()
    }
    if (isFunction(onBlur)) {
      onBlur(event)
    }
  }, [debouncedOnChange, onBlur])

  useEffect(() => setInternalValue(value || ''), [value])

  return { debouncedValue, handleOnChange, handleOnBlur }
}
