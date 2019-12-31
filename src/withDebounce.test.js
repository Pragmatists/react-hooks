import React from 'react'
import { withDebounce } from './withDebouncePirates'
import { mount } from 'enzyme'
import { TextInput } from './TextInput'

describe('withDebounce', () => {
  const DebouncedInput = withDebounce((props) => <TextInput {...props} />)
  it('should call onChange callback with debounce', (done) => {
    const onChangeCallback = jest.fn()
    const DebouncedInput = withDebounce((props) => <TextInput {...props} />, 1)

    const component = mount(<DebouncedInput onChange={onChangeCallback} />)

    component.find('input').simulate('change', { target: { value: 's' } })
    component.find('input').simulate('change', { target: { value: 'so' } })
    component.find('input').simulate('change', { target: { value: 'som' } })
    component.find('input').simulate('change', { target: { value: 'some' } })

    setTimeout(() => {
      expect(onChangeCallback).toHaveBeenCalledTimes(1)
      expect(onChangeCallback).toHaveBeenCalledWith('some')
      done()
    }, 101)
  })

  it('should not call onChange callback sooner than debounce time', (done) => {
    const onChangeCallback = jest.fn()
    const DebouncedInput = withDebounce((props) => <TextInput {...props} />, 200)

    const component = mount(<DebouncedInput onChange={onChangeCallback} />)

    component.find('input').simulate('change', { target: { value: 's' } })
    component.find('input').simulate('change', { target: { value: 'so' } })
    component.find('input').simulate('change', { target: { value: 'som' } })
    component.find('input').simulate('change', { target: { value: 'some' } })

    setTimeout(() => {
      expect(onChangeCallback).not.toHaveBeenCalledWith('some')
      done()
    }, 2)
  })

  it('should call onChange callback on blur', () => {
    const onChangeCallback = jest.fn()

    const component = mount(<DebouncedInput onChange={onChangeCallback} />)

    component.find('input').simulate('change', { target: { value: 's' } })
    component.find('input').simulate('change', { target: { value: 'so' } })
    component.find('input').simulate('change', { target: { value: 'som' } })
    component.find('input').simulate('change', { target: { value: 'some' } })
    component.simulate('blur')

    expect(onChangeCallback).toHaveBeenCalledTimes(1)
    expect(onChangeCallback).toHaveBeenCalledWith('some')
  })

  it('should not call onChange callback on blur if text not changed', () => {
    const onChangeCallback = jest.fn()

    const component = mount(<DebouncedInput type='text' onChange={onChangeCallback} />)

    component.simulate('blur')

    expect(onChangeCallback).not.toHaveBeenCalled()
  })

  it('should call provided onBlur', () => {
    const blurEvent = { x: 'y' }
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const component = mount(<DebouncedInput onChange={onChange} onBlur={onBlur} />)

    component.find('input').simulate('blur', blurEvent)

    expect(onBlur).toHaveBeenCalledWith(expect.objectContaining(blurEvent))
  })

  it('should not fail if onblur not provided', () => {
    const onChange = jest.fn()

    const component = mount(<DebouncedInput onChange={onChange} />)

    component.find('input').simulate('blur')
  })
})
