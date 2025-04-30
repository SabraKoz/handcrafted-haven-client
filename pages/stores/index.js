import { Container, Heading } from "@radix-ui/themes";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";


export default function Stores() {


    return (
        <Container>
            <Heading m="5">Stores</Heading>
        </Container>
    )
}

Stores.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}