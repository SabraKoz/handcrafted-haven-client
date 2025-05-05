import { Box, Button, Container, Dialog, Flex, Heading, Table, Text } from "@radix-ui/themes";
import { Sidebar } from "../../components/sidebar";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/state";
import { useEffect, useState } from "react";
import { getCart, removeProductFromOrder } from "../../data/orders";
import { FaTrash } from "react-icons/fa"
import OrderPayment from "../../components/orderpayment";

export default function Cart(payment = {}) {
    const { profile } = useAppContext()
    const router = useRouter()
    const [cart, setCart] = useState({})

    const refresh = () => {
        getCart().then(cartData => {
            if (cartData) {
                setCart(cartData)
            } else {{ }}
        })
    }

    useEffect(() => {
        refresh()
    }, [cart])

    const deleteProductFromOrder = (productId) => {
        removeProductFromOrder(productId).then(() => {
            refresh()
        })
    }

    return (
        <Flex>
            <Sidebar activePath={router.pathname} profile={profile} />
            <Container m="7">
                <Heading m="5" align="center" size="8" weight="bold" style={{ color: "skyblue", textShadow: "2px 2px 2px gray" }}>{profile.first_name}'s Cart</Heading>
                <Box>
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
                                <Table.Cell>
                                    <Button color="red" onClick={() => deleteProductFromOrder(product.id)}>
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
                            <Table.ColumnHeaderCell>{ }</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                </Table.Root>
                </Box>
                <Box m="9">
                    {cart.items && cart.items.length > 0 ? (
                        <Box>
                            <OrderPayment payment={payment} cart={cart} refresh={refresh} />
                        </Box>
                    ) : ""}
                </Box>
            </Container>
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