import { Box, Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { addPayment } from "../data/payments";
import { completeCurrentOrder } from "../data/orders";
import { useRouter } from "next/router";

export default function OrderPayment({ payment, cart }) {
    const router = useRouter()

    const handleCompleteOrder = () => {
       const payment = {
        merchant: merchant.value,
        number: number.value,
        expiration: expiration.value,
        address: address.value
       }

       addPayment(payment).then((newPayment) => {
            return completeCurrentOrder(cart.id, newPayment.id)
       }).then(() => {
        router.push("/profile/orders")
       })
    }
    
    return (
        <Box>
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button m="4" align="center">Complete Order</Button>
                </Dialog.Trigger>
                <Dialog.Content style={{ backgroundColor: "#BAC5BE" }}>
                    <Dialog.Title align="center" m="3">Add Payment Method</Dialog.Title>
                    <Dialog.Description align="center" m="3">Complete all fields to complete your order</Dialog.Description>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text>Merchant Name</Text>
                            <TextField.Root
                                id="merchant"
                                placeholder="Merchant Name"
                                type="text"
                                value={payment.merchant}
                                style={{ backgroundColor: "#f5e8d5"}} m="3"
                            />
                        </label>
                        <label>
                            <Text>Card Number</Text>
                            <TextField.Root
                                id="number"
                                placeholder="Card Number"
                                type="text"
                                value={payment.number}
                                style={{ backgroundColor: "#f5e8d5"}} m="3" />
                        </label>
                        <label>
                            <Text>Expiration Date</Text>
                            <TextField.Root
                                id="expiration"
                                placeholder="YYYY-MM-DD"
                                type="text"
                                value={payment.expiration}
                                style={{ backgroundColor: "#f5e8d5"}} m="3" />
                        </label>
                        <label>
                            <Text>Shipping and Billing Address</Text>
                            <TextField.Root
                                id="address"
                                placeholder="Address"
                                type="text"
                                value={payment.address}
                                style={{ backgroundColor: "#f5e8d5"}} m="3" />
                        </label>
                    </Flex>

                    <Box align="center" m="3">
                        <Dialog.Close>
                            <Button m="4" onClick={handleCompleteOrder}>Complete Order</Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button m="4" color="red">Cancel</Button>
                        </Dialog.Close>
                    </Box>
                </Dialog.Content>
            </Dialog.Root>
        </Box>
    )
}