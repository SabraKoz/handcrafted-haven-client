import { Container, Heading } from "@radix-ui/themes";
import Layout from "../components/layout";
import Navbar from "../components/navbar";


export default function Profile() {


    return (
        <Container>
            <Heading m="5">Profile</Heading>
        </Container>
    )
}

Profile.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar/>
            {page}
        </Layout>
    )
}