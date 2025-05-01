import { useEffect, useState } from "react";
import { getOrders } from "../../data/orders";
import { getPayments } from "../../data/payments";
import { Box, Flex, Heading } from "@radix-ui/themes";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { Sidebar } from "../../components/sidebar";
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
    }, [])

    return (
        <Flex>
            <Sidebar activePath={router.pathname} profile={profile} />
            <Box m="7">
                <Heading m="5" align="center" size="8" weight="bold" style={{ color: "skyblue", textShadow: "2px 2px 2px gray" }}>Order History</Heading>
                {orders.map(order => (
                    <Box key={order.id}>{order.completed_on} - ${order.total}</Box>
                ))}
                {payments.map(payment => (
                    payment.merchant
                ))}
            </Box>
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