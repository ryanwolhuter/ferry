import Head from 'next/head'
import Background from './Background'
import NavBar from './NavBar'
import styles from './Layout.module.css'
import { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  children: ReactNode
  provider?: any
  updateProvider?: any
  contracts?: any
  toggleShowSubscribeForm?: any
  hasBackground?: boolean
  hasNav?: boolean
}

export default function Layout({
  children,
  provider,
  updateProvider,
  contracts,
  toggleShowSubscribeForm,
  hasBackground = true,
  hasNav = true
}: Props
) {

  const Main = styled.main`
    height: 100vh;
    display: grid;
    align-items: center;
  `

  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `

  return (
    <>
      <Head>
        <title>Ferry</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {hasBackground && <Background />}

      {hasNav && <NavBar provider={provider} updateProvider={updateProvider} contracts={contracts} toggleShowSubscribeForm={toggleShowSubscribeForm} />}
      <Main>
        <Wrapper>{children}</Wrapper>
      </Main>
    </>
  )
}