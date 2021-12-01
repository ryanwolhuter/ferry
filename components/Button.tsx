import styled from 'styled-components'

const ButtonBase = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  border-radius: 10px;
  width: 101px;
  height: 48px;
  border: none;
  outline: none;
  white-space: nowrap;
`

const PrimaryButton = styled(ButtonBase)`
    color: var(--white);
    background: var(--purple-gradient);
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;

    &:hover {
      box-shadow: 0px 0px 17px rgba(116, 6, 226, 0.37);
    }

    &:active {
      box-shadow: 0px 0px 17px rgba(116, 6, 226, 0.37);
      border: 1px solid;
      border-image-source: linear-gradient(
        77.23deg,
        #f173cd 4.4%,
        #e394c0 45.66%,
        #ffb800 111.45%
      );
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: center;
    }

    &:disabled {
      background: var(--brown);
      color: var(--grey);
      box-shadow: none;
      font-style: normal;
      font-weight: normal;
    }
`

export default function Button({ variant, children, ...props }) {
  let Button = PrimaryButton
      
  return (
    <Button {...props}>
      {children}
    </Button>
  )
}
