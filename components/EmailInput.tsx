import styled from 'styled-components'

const Wrapper = styled.div`
`

const Label = styled.label`
`

const Input = styled.input`
  width: 282px;
  height: 40px;
  padding: 10px 12px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 14px;
  display: flex;
  align-items: center;
  background: var(--white);
  border: none;
  border-radius: 10px;
  box-shadow: inset 0px 0px 10px rgba(91, 34, 112, 0.32);

  &:hover,
  &:focus {
    filter: drop-shadow(0px 0px 25px rgba(113, 68, 129, 0.14));
    outline: none;
    background: var(--white);
  }

  &:disabled {
    filter: none;
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`

export default function EmailInput({ onChange }) {
  return (
    <Wrapper>
      <Label htmlFor="email">To: (Optional)</Label>
      <Input
        id="email"
        type="email"
        onChange={onChange}
      />
    </Wrapper>
  )
}