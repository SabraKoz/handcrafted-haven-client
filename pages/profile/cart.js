import { Box, Flex, Heading } from "@radix-ui/themes";
import { Sidebar } from "../../components/sidebar";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/state";
import { useEffect, useState } from "react";
import { getCart } from "../../data/orders";

export default function Cart() {
    const { profile } = useAppContext()
    const router = useRouter()
    const [cart, setCart] = useState({})

    const refresh = () => {
        getCart().then(cartData => {
            if (cartData) {
                setCart(cartData)
            }
        })
    }

    useEffect(() => {
        refresh()
    }, [])

    return (
        <Flex>
            <Sidebar activePath={router.pathname} profile={profile} />
            <Box m="7">
                <Heading m="5" align="center" size="8" weight="bold" style={{ color: "skyblue", textShadow: "2px 2px 2px gray" }}>Your Cart</Heading>
                {cart.items?.map(product => {
                    return (
                        <Box key={product.id}>{product.product.name} - ${product.product.price}</Box>
                    )
                })}
            </Box>
        </Flex>
    )
}

Cart.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}