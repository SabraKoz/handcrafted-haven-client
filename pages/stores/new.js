import { AlertDialog, Box, Button, Card, Container, Heading, Text, TextField } from "@radix-ui/themes";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { useAppContext } from "../../context/state";
import { useRouter } from "next/router";
import { addStore } from "../../data/stores";
import { useState } from "react";


export default function NewStore(store = {}) {
    const { profile, setProfile } = useAppContext()
    const router = useRouter()
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

    const saveStore = () => {
        const store = {
            name: storeName.value,
            description: description.value
        }

        if (store.name && store.description) {
        addStore(store).then(res => {
            setProfile({ ...profile, store: res })
            router.push(`/stores/${res.id}`)
        })
        } else {setIsAlertDialogOpen(true)}
    }

    return (
        <Container>
            <Card m="5" style={{ padding: "20px", backgroundColor: "#BAC5BE", borderRadius: "10px", boxShadow: "0 0 20px black" }}>
                <Heading m="5" align="center" size="8" weight="bold" style={{ textShadow: "2px 2px 3px teal" }}>Create Your Store</Heading>
                <Box m="3">
                    <Text>Name: </Text>
                    <TextField.Root
                        id="storeName"
                        placeholder="Name"
                        type="text"
                        name="name"
                        value={store.storeName}
                        style={{ backgroundColor: "#f5e8d5" }} m="3"
                    />
                </Box>
                <Box m="3">
                    <Text>Description: </Text>
                    <TextField.Root
                        id="description"
                        placeholder="Description"
                        type="text"
                        name="description"
                        value={store.description}
                        style={{ backgroundColor: "#f5e8d5" }} m="3"
                    />
                </Box>
                <Box m="3" align="center">
                    <Button m="4" onClick={saveStore}>Save</Button>
                    <Button m="4" color="red" onClick={() => router.back()}>Cancel</Button>
                </Box>

                <AlertDialog.Root open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                    <AlertDialog.Content style={{ backgroundColor: "#f5e8d5" }}>
                        <AlertDialog.Title m="3" align="center">Missing Information</AlertDialog.Title>
                        <AlertDialog.Description m="3" align="center">Please Complete all fields</AlertDialog.Description>
                        <Box align="center" m="3">
                            <AlertDialog.Cancel>
                                <Button onClick={() => setIsAlertDialogOpen(false)} >Continue</Button>
                            </AlertDialog.Cancel>
                        </Box>
                    </AlertDialog.Content>
                </AlertDialog.Root>

            </Card>
        </Container>
    )
}

NewStore.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}