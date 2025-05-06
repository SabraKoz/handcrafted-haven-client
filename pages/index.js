import { Box, Container } from '@radix-ui/themes'
import Layout from '../components/layout'
import Navbar from '../components/navbar'

export default function Index() {
  return (
    <Container>
      <Box align="center" m="9">
          <img src="/Handcrafted Yarn logo.png" style={{ borderRadius: "60px" }} />
      </Box>
    </Container>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}