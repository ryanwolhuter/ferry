import styled from 'styled-components'

const Wrapper = styled.div`
display: flex;
align-items: center;
`

const Input = styled.input`
  color: transparent;
  box-shadow: none;
  width: 64px;
  height: 64px;
  padding: 0;
  margin: 16px;
  border: none;
  border-radius: 100px;
  background: var(--turquoise-gradient);
  cursor: pointer;
  position: relative;
  box-shadow: 0px 0px 25px rgba(98, 11, 129, 0.12);
  transition: all 0.2s;

  &:hover {
    background: var(--pink-orange-gradient);
    box-shadow: 0px 0px 17px rgba(116, 6, 226, 0.37);
  }

  &::file-selector-button {
    display: none;
  }

  &::after {
    color: white;
    content: "+";
    position: absolute;
    font-size: 64px;
    top: 28px;
    left: 14px;
  }
  `

const Label = styled.label`
  display: none;
`

export default function FileInput({ onChange }) {
  return (
    <Wrapper>
      <Input
        type="file"
        name="file"
        onChange={onChange}
      />
      <Label htmlFor="file" aria-hidden={true}>Choose file</Label>
    </Wrapper>
  )
}