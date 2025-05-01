import { Box, Container, Heading, HoverCard, Text } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProductById } from "../../../data/products";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";
import Link from "next/link";


export default function ProductDetail() {
    const router = useRouter()
    const { id } = router.query
    const [product, setProduct] = useState({})

    const refresh = () => {
        getProductById(id).then(data => {
            if (data) {
                setProduct(data)
            }
        })
    }

    useEffect(() => {
        if (id) {
            refresh()
        }
    }, [id])

    return (
        <Container>
            <Box>
                <Heading>{product.name}</Heading>
                <Box>
                    <Text>Store: </Text>
                    <HoverCard.Root>
                        <HoverCard.Trigger>
                            <Link href={`/stores/${product.store?.id}`}>{product.store?.name}</Link>
                        </HoverCard.Trigger>
                        <HoverCard.Content>
                            <Text>View Store</Text>
                        </HoverCard.Content>
                    </HoverCard.Root>
                </Box>
                <Box>
                    <Text>Quantity: </Text>
                    {product.quantity}
                </Box>
                <Box>
                    <Text>Favorites: </Text>
                    {product.favorites?.length}
                </Box>
                <Box>
                    {product.description}
                    <img src={product.image_path} style={{ width: "100%", height: "100%", borderRadius: "15px" }} />
                </Box>
            </Box>
        </Container>
    )
}

ProductDetail.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}