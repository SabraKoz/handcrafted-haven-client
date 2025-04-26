import Head from 'next/head'
import { AppWrapper } from '../context/state'

export default function Layout({ children }) {
  return (
    <AppWrapper>
      <>
        <Head>
          <title>Handcrafted</title>
        </Head>
        <main className="container">{children}</main>
      </>
    </AppWrapper>
  )
}
