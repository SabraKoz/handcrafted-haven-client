import { Box, Button, Flex, Heading, Table } from "@radix-ui/themes";
import { Sidebar } from "../../components/sidebar";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/state";
import { useEffect, useState } from "react";
import { completeCurrentOrder, getCart, removeProductFromOrder } from "../../data/orders";
import { FaTrash } from "react-icons/fa"
import { getPayments } from "../../data/payments";

export default function Cart() {
    const { profile } = useAppContext()
    const router = useRouter()
    const [cart, setCart] = useState({})
    const [paymentTypes, setPaymentTypes] = useState([])

    const refresh = () => {
        getCart().then(cartData => {
            if (cartData) {
                setCart(cartData)
            }
        })
    }

    useEffect(() => {
        refresh()
        getPayments().then(paymentData => {
            if (paymentData) {
                setPaymentTypes(paymentData)
            }
        })
    }, [])

    const deleteProductFromOrder = (productId) => {
        removeProductFromOrder(productId).then(() => {
            refresh()
        })
    }

    const completeOrder = (paymentTypeId) => {
        completeCurrentOrder(cart.id, paymentTypeId).then(() => {
            router.push("/profile/orders")
        })
    }

    return (
        <Flex>
            <Sidebar activePath={router.pathname} profile={profile} />
            <Box m="7">
                <Heading m="5" align="center" size="8" weight="bold" style={{ color: "skyblue", textShadow: "2px 2px 2px gray" }}>Your Cart</Heading>
                <Table.Root m="9" variant="surface">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Remove Product</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {cart.items?.map(product => (
                        <Table.Body key={product.id}>
                            <Table.Row>
                                <Table.RowHeaderCell>{product.product.name}</Table.RowHeaderCell>
                                <Table.Cell>${product.product.price}</Table.Cell>
                                <Table.Cell justify="center">
                                    <Button
                                        onClick={() => deleteProductFromOrder(product.id)}
                                        style={{ backgroundColor: "red" }}>
                                        <FaTrash />
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Total Price</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>${cart.total}</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                </Table.Root>
                <Box m="9">
                    {cart.items && cart.items.length > 0 ? (
                        <Button onClick={completeOrder}>Complete Order</Button>
                    ) : ""}
                </Box>
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