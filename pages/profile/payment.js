import { Button, Card, Container, Flex, Heading, Table } from "@radix-ui/themes";
import { Sidebar } from "../../components/Sidebar";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/state";
import { useEffect, useState } from "react";
import { deletePayment, getPayments } from "../../data/payments";
import { FaTrash } from "react-icons/fa"

export default function Payments() {
    const router = useRouter()
    const { profile } = useAppContext()
    const [payments, setPayments] = useState([])

    const refresh = () => {
        getPayments().then(data => {
            setPayments(data)
        })
    }

    useEffect(() => {
        refresh()
    }, [profile])

    const removePayment = (paymentId) => {
        deletePayment(paymentId).then(() => {
            refresh()
        })
    }

    return (
        <Flex>
            <Sidebar activePath={router.pathname} profile={profile} />
            <Container m="7">
                <Card m="5" style={{ padding: "20px", backgroundColor: "#BAC5BE", borderRadius: "10px", boxShadow: "2px 2px 10px gray" }}>
                <Heading m="5" align="center" size="8" weight="bold" style={{ color: "teal", textShadow: "1px 1px 2px black" }}>{profile.first_name}'s Payment Methods</Heading>
                
                <Table.Root variant="surface" m="6" style={{ backgroundColor: "#f5e8d5"}}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Merchant Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Card Number</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Expiration Date</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Address</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Remove Payment</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {payments.map(payment => (
                        <Table.Body key={payment.id}>
                            <Table.Row>
                                <Table.RowHeaderCell>{payment.merchant}</Table.RowHeaderCell>
                                <Table.Cell>{payment.number}</Table.Cell>
                                <Table.Cell>{payment.expiration}</Table.Cell>
                                <Table.Cell>{payment.address}</Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => removePayment(payment.id)} color="red">
                                        <FaTrash />
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table.Root>
                </Card>
            </Container>
        </Flex>
    )
}

Payments.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}