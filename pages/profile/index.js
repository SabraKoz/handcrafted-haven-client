import { Card, Container, Flex, Grid, Heading } from "@radix-ui/themes";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { Sidebar } from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { getFavoritedProducts } from "../../data/products";
import { ProductCard } from "../../components/ProductCard";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/state";

export default function Profile() {
    const router = useRouter()
    const { profile } = useAppContext()
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        getFavoritedProducts().then(data => {
            setFavorites(data)
        })
    }, [])

    return (
        <Flex>
            <Sidebar activePath={router.pathname} profile={profile} />
            <Container m="7">
                <Card m="5" style={{ padding: "20px", backgroundColor: "#BAC5BE", borderRadius: "10px", boxShadow: "0 0 20px black" }}>
                <Heading m="5" align="center" size="8" weight="bold" style={{ textShadow: "2px 2px 3px teal" }}>{profile.first_name}'s Favorites</Heading>
                <Grid columns="3" gap="4">
                    {favorites.map(product => (
                        <ProductCard product={product} key={product.id} img_src={product.image_path} />
                    ))}
                </Grid>
                </Card>
            </Container>
        </Flex>
    )
}

Profile.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}
