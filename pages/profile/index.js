import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { Sidebar } from "../../components/sidebar";
import { useEffect, useState } from "react";
import { getFavoritedProducts } from "../../data/products";
import { ProductCard } from "../../components/productcard";
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
            <Box m="7">
                <Heading m="5" align="center" size="8" weight="bold" style={{ color: "skyblue", textShadow: "2px 2px 2px gray" }}>Favorites</Heading>
                <Grid columns="3" gap="4">
                    {favorites.map(product => (
                        <ProductCard product={product} key={product.id} img_src={`http://localhost:8000${product.image_path}`} />
                    ))}
                </Grid>
            </Box>
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
