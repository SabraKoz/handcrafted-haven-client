import { Box, Container, Grid, Heading } from "@radix-ui/themes";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";
import { getAllStores } from "../../data/stores";
import { StoreCard } from "../../components/storecard";


export default function Stores() {
    const [stores, setStores] = useState([])

    useEffect(() => {
        getAllStores().then(data => {
            if (data) {
                setStores(data)
            }
        })
    }, [])

    return (
        <Container>
            <Heading m="5" align="center" size="8" weight="bold" style={{ color: "skyblue", textShadow: "2px 2px 2px gray"}}>Stores</Heading>
            <Grid columns="3" gap="3">
                {stores.map(store => (
                    <StoreCard store={store} key={store.id} />
                ))}
            </Grid>
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