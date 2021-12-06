import styled from 'styled-components'

const Wrapper = styled.div``

const Label = styled.label`
  display: none;
`

const Input = styled.input`
  box-shadow: none;
  margin-right: 12px;

  &::-webkit-slider-thumb {
  }
`

export default function RangeInput({
  name,
  value,
  min,
  max,
  step,
  onChange,
  disabled
}) {
  return (
    <Wrapper>
      <Label htmlFor={name}>{name}</Label>
      <Input
        type="range"
        name={name}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        disabled={disabled}
      />
    </Wrapper>
  )
}