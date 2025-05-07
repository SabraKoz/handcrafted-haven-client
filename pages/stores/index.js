import { Card, Container, Grid, Heading } from "@radix-ui/themes";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";
import { getAllStores } from "../../data/stores";
import { StoreCard } from "../../components/StoreCard";


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
            <Card m="5" style={{ padding: "20px", backgroundColor: "#BAC5BE", borderRadius: "10px", boxShadow: "0 0 20px black" }}>
            <Heading m="5" align="center" size="8" weight="bold" style={{ textShadow: "2px 2px 3px teal" }}>Stores</Heading>
            <Grid columns="3" gap="3">
                {stores.map(store => (
                    <StoreCard store={store} key={store.id} />
                ))}
            </Grid>
            </Card>
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