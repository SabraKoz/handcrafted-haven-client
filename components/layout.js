import Head from 'next/head'
import { AppWrapper } from '../context/state'
import { Box } from '@radix-ui/themes'

export default function Layout({ children }) {
  return (
    <AppWrapper>
      <>
        <Head>
          <title>Handcrafted Haven</title>
        </Head>
        <Box style={{ backgroundImage: "url('')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "repeat", minHeight: "100vh", quality: "25" }}>
        <main className="container">{children}</main>
        </Box>
      </>
    </AppWrapper>
  )
}
