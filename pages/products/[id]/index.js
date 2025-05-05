import { Box, Button, Card, Container, Flex, Heading, HoverCard, Text } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { favoriteProduct, getProductById, unfavoriteProduct } from "../../../data/products";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa"
import Reviews from "../../../components/reviews";
import { addProductToOrder } from "../../../data/orders";

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

    const favorite = () => {
        favoriteProduct(id).then(refresh)
    }

    const unfavorite = () => {
        unfavoriteProduct(id).then(refresh)
    }

    const addToCart = () => {
        addProductToOrder(product.id).then(() => {
            router.push("/profile/cart")
        })
    }

    return (
        <Container>
            <Box>
                <Heading m="5" align="center" size="8" weight="bold" style={{ color: "skyblue", textShadow: "2px 2px 2px gray" }}>{product.name}</Heading>
                <Flex justify="between">
                <Box m="3">
                    <Text>Store: </Text>
                    <HoverCard.Root>
                        <HoverCard.Trigger>
                            <Link href={`/stores/${product.store?.id}`} style={{ textDecoration: "none", color: "skyblue" }}>{product.store?.name}</Link>
                        </HoverCard.Trigger>
                        <HoverCard.Content size="1">
                            <Text>View Store</Text>
                        </HoverCard.Content>
                    </HoverCard.Root>
                </Box>
                <Box m="3">
                    <Text>Quantity: </Text>
                    {product.quantity}
                </Box>
                <Box m="3">
                    <Text>Favorites: </Text>
                    {product.favorites?.length}
                </Box>
                <Box m="3">
                    <Text>Reviews: </Text>
                    {product.reviews?.length}
                </Box>
                {
                    product.is_favorited ? 
                        <Button onClick={unfavorite} color="red"><FaHeart /></Button>
                        :
                        <Button onClick={favorite} color="red"><FaRegHeart /></Button>
                }
                <Box>
                    <Button onClick={addToCart}>Add to Cart</Button>
                </Box>
                </Flex>
                <Flex justify="between">
                <Box m="3">
                    {product.description}
                </Box>
                <Box m="3">
                    <img src={product.image_path} style={{ width: "100%", height: "100%", borderRadius: "15px" }} />
                </Box>
                </Flex>
                <Box>
                    <Reviews product={product} refresh={refresh} />
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