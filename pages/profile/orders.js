import { useEffect, useState } from "react";
import { getOrders } from "../../data/orders";
import { getPayments } from "../../data/payments";
import { Card, Container, Flex, Heading, Table } from "@radix-ui/themes";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { Sidebar } from "../../components/Sidebar";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/state";

export default function Orders() {
    const { profile } = useAppContext()
    const router = useRouter()
    const [orders, setOrders] = useState([])
    const [payments, setPayments] = useState([])

    useEffect(() => {
        getOrders().then(orderData => {
            if (orderData) {
                setOrders(orderData)
            }
        })
        getPayments().then(paymentData => {
            setPayments(paymentData)
        })
    }, [profile])

    return (
        <Flex>
            <Sidebar activePath={router.pathname} profile={profile} />
            <Container m="7">
                <Card m="5" style={{ padding: "20px", backgroundColor: "#BAC5BE", borderRadius: "10px", boxShadow: "0 0 20px black" }}>
                <Heading m="5" align="center" size="8" weight="bold" style={{ textShadow: "2px 2px 3px teal" }}>{profile.first_name}'s Order History</Heading>
                <Table.Root variant="surface" m="6" style={{ backgroundColor: "#f5e8d5"}}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Order Number</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Payment Method</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {orders.map(order => (
                        <Table.Body key={order.id}>
                            <Table.Row>
                                <Table.RowHeaderCell>{order.id}</Table.RowHeaderCell>
                                <Table.Cell>{order.completed_on}</Table.Cell>
                                <Table.Cell>${order.total}</Table.Cell>
                                <Table.Cell>{order.payment.merchant}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table.Root>
                </Card>
            </Container>
        </Flex>
    )
}

Orders.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}