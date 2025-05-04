import { Box, Button, Dialog, Flex, Heading, Table, Text, TextField } from "@radix-ui/themes";
import { Sidebar } from "../../components/sidebar";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/state";
import { useEffect, useState } from "react";
import { addPayment, deletePayment, getPayments } from "../../data/payments";

export default function Payments(payment = {}) {
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

    const addNewPayment = () => {
        const payment = {
            merchant: merchant.value,
            number: number.value,
            expiration: expiration.value,
            address: address.value
        }

        addPayment(payment).then(() => {
            refresh()
        })
    }

    const removePayment = (paymentId) => {
        deletePayment(paymentId).then(() => {
            refresh()
        })
    }

    return (
        <Flex>
            <Sidebar activePath={router.pathname} profile={profile} />
            <Box m="7">
                <Heading m="5" align="center" size="8" weight="bold" style={{ color: "skyblue", textShadow: "2px 2px 2px gray" }}>Your Payment Types</Heading>
                <Box>
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button m="4">Add Payment Type</Button>
                        </Dialog.Trigger>
                        <Dialog.Content>
                            <Dialog.Title align="center" m="3">Add New Payment Type</Dialog.Title>
                            <Dialog.Description align="center" m="3">Complete all fields</Dialog.Description>
                            <Flex direction="column" gap="3">
                                <label>
                                    <Text>Merchant Name</Text>
                                    <TextField.Root
                                        value={payment.merchant}
                                     />
                                </label>
                                <label>
                                    <Text>Card Number</Text>
                                    <TextField.Root
                                        value={payment.number} />
                                </label>
                                <label>
                                    <Text>Expiration Date</Text>
                                    <TextField.Root
                                        value={payment.expiration} />
                                </label>
                                <label>
                                    <Text>Address</Text>
                                    <TextField.Root
                                        value={payment.address} />
                                </label>
                            </Flex>

                            <Flex>
                                <Dialog.Close>
                                    <Button>Cancel</Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button onClick={addNewPayment}>Save Payment</Button>
                                </Dialog.Close>
                            </Flex>
                        </Dialog.Content>
                    </Dialog.Root>
                </Box>
                <Table.Root variant="surface">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Merchant Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Card Number</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Expiration Date</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {payments.map(payment => (
                        <Table.Body key={payment.id}>
                            <Table.Row>
                                <Table.RowHeaderCell>{payment.merchant}</Table.RowHeaderCell>
                                <Table.Cell>{payment.number}</Table.Cell>
                                <Table.Cell>{payment.expiration}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table.Root>
            </Box>
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