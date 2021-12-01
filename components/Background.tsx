import Image from 'next/image'
import background from '../public/background.png'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: -1;
`

export default function Background() {
  return (
    <Wrapper>
      <Image
        priority
        alt="background image"
        src={background}
        layout="fill"
        objectFit="cover"
        quality={100}
        placeholder="blur"
      />
    </Wrapper>
  )
}