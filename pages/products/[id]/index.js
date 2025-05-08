import { Box, Button, Card, Container, Dialog, Flex, Heading, HoverCard, Text, TextField } from "@radix-ui/themes";
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
    const [customMessage, setCustomMessage] = useState("")

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
        addProductToOrder(product.id, customMessage).then(() => {
            router.push("/profile/cart")
        })
    }

    return (
        <Container>
            <Card m="5" style={{ padding: "20px", backgroundColor: "#BAC5BE", borderRadius: "10px", boxShadow: "0 0 20px black" }}>
                <Heading 
                    m="5" 
                    align="center" 
                    size="8" 
                    weight="bold" 
                    style={{ textShadow: "2px 2px 3px teal" }}>
                        {product.name}
                </Heading>
                <Flex justify="between" m="5">
                <Box m="3">
                    <Text>Store: </Text>
                    <HoverCard.Root>
                        <HoverCard.Trigger>
                            <Link href={`/stores/${product.store?.id}`} style={{ textDecoration: "none", color: "teal", fontWeight: "bold" }}>{product.store?.name}</Link>
                        </HoverCard.Trigger>
                        <HoverCard.Content size="1" style={{ backgroundColor: "#f5e8d5" }}>
                            <Text>View Store</Text>
                        </HoverCard.Content>
                    </HoverCard.Root>
                </Box>
                <Box m="3">
                    <Text>Quantity: </Text>
                    {product.available_quantity}
                </Box>
                <Box m="3">
                    <Text>Favorites: </Text>
                    {product.favorites?.length}
                </Box>
                <Box m="3">
                    <Text>Reviews: </Text>
                    {product.reviews?.length}
                </Box>
                <Box m="3">
                    <Text>Price: </Text>
                    ${product.price}
                </Box>
                {
                    product.is_favorited ? 
                        <Button onClick={unfavorite}><FaHeart /></Button>
                        :
                        <Button onClick={favorite}><FaRegHeart /></Button>
                }
                <Box>
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button disabled={product.available_quantity === 0}>{product.available_quantity === 0 ? "Sold Out" : "Add to Cart"}</Button>
                        </Dialog.Trigger>
                        <Dialog.Content style={{ backgroundColor: "#BAC5BE"}}>
                            <Dialog.Title align="center" m="3">Customization</Dialog.Title>
                            <Dialog.Description align="center" m="3">Add an optional customization message for the creator</Dialog.Description>
                            <TextField.Root
                                id="customization"
                                placeholder="Add customization message..."
                                type="text"
                                value={customMessage}
                                onChange={e => setCustomMessage(e.target.value)}
                                style={{ backgroundColor: "#f5e8d5"}} m="3" />
                            <Box align="center">
                                <Dialog.Close>
                                    <Button m="3" onClick={addToCart}>Add to Cart</Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button m="3" color="red">Cancel</Button>
                                </Dialog.Close>
                            </Box>
                        </Dialog.Content>
                    </Dialog.Root>
                </Box>
                </Flex>
                <Flex justify="between" m="5">
                <Box m="3" style={{ fontSize: "1.1rem", lineHeight: "1.5", maxWidth: "60%" }}>
                    {product.description}
                </Box>
                <Box m="3">
                    <img src={product.image_path} style={{ maxWidth: "500px", maxHeight: "400px", width: "100%", height: "auto", borderRadius: "15px" }} />
                </Box>
                </Flex>
                <Box>
                    <Reviews product={product} refresh={refresh} />
                </Box>
            </Card>
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