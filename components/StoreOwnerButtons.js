import { Box, Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { editStore } from "../data/stores";
import { useRef } from "react";
import { useRouter } from "next/router";

export default function StoreOwnerButtons({ store, id, refresh }) {
    const router = useRouter()
    const nameRef = useRef(null)
    const descriptionRef = useRef(null)

    const updateStore = () => {
        const updatedStore = {
            name: nameRef.current.value,
            description: descriptionRef.current.value
        }

        editStore(id, updatedStore).then(() => {
            refresh()
        })
    }

    return (
        <Box align="center">
            <Button m="3" onClick={() => router.push("/products/new")} >Add New Product</Button>

            <Dialog.Root>
                <Dialog.Trigger>
                    <Button m="3">Edit Store</Button>
                </Dialog.Trigger>
                <Dialog.Content style={{ backgroundColor: "#BAC5BE"}}>
                    <Dialog.Title align="center" m="3">Edit Store</Dialog.Title>
                    <Dialog.Description align="center" m="3">Change your store name and/or description</Dialog.Description>
                    <Flex direction="column" gap="3">
                        <Box>
                            <Text>Name: </Text>
                            <TextField.Root
                                id="name"
                                placeholder="Name"
                                type="text"
                                name="name"
                                defaultValue={store?.name || ""}
                                ref={nameRef}
                                style={{ backgroundColor: "#f5e8d5"}} m="3"
                            />
                        </Box>
                        <Box>
                            <Text>Description: </Text>
                            <TextField.Root
                                id="description"
                                placeholder="Description"
                                type="text"
                                name="description"
                                defaultValue={store?.description || ""}
                                ref={descriptionRef}
                                style={{ backgroundColor: "#f5e8d5"}} m="3"
                            />
                        </Box>
                    </Flex>
                    <Box align="center">
                    <Dialog.Close>
                        <Button m="4" onClick={updateStore}>Save</Button>
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