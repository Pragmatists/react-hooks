import React from 'react'
import debounce from 'lodash/debounce'
import { isNil } from 'lodash'

export const withDebounce = (Component) => {
  return class WithDebounce extends React.Component {
    state = { value : undefined}
    
    handleDebounceChange = (value) => {
      this.props.onChange(value)
    }

    debouncedOnChange = debounce(this.handleDebounceChange, 100)

    onChange = (value) => {
      this.setState(() => ({ value }), () => this.debouncedOnChange(this.state.value))
    }

    onBlur = (event) => {
      if (this.debouncedOnChange.flush !== undefined) {
        this.debouncedOnChange.flush()
      }
      if (this.props.onBlur) {
        this.props.onBlur(event)
      }
    }

    render () {
      const value = isNil(this.state.value) ? '' : this.state.value
      return (
        <Component {...this.props} value={value} onChange={this.onChange} onBlur={this.onBlur} />
      )
    }
  }
}
