import React, { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

export const withDebounce = (Component, debounceTime = 300) => (props) => {
  const [value, setValue] = useState(props.value || '')
  const debouncedOnChange = useCallback(debounce(props.onChange, debounceTime), [props.onChange])

  const onChange = useCallback((onChangeValue = '') => {
    setValue(onChangeValue)
    debouncedOnChange(onChangeValue)
  }, [debouncedOnChange])

  const onBlur = useCallback((event) => {
    if (debouncedOnChange.flush !== undefined) {
      debouncedOnChange.flush()
    }
    if (props.onBlur) {
      props.onBlur(event)
    }
  }, [debouncedOnChange, props.onBlur])

  useEffect(() => setValue(props.value || ''), [props.value])

  return <Component {...props} value={value} onChange={onChange} onBlur={onBlur} />
}
