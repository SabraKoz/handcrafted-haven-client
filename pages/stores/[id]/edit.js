import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { editStore, getStoreById } from "../../../data/stores";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";
import { Box, Button, Container, Heading, Text, TextField } from "@radix-ui/themes";
import { useAppContext } from "../../../context/state";

export default function EditStore() {
    const [store, setStore] = useState({})
    const router = useRouter()
    const { id } = router.query
    const { profile } = useAppContext()

    useEffect(() => {
        if (id && profile) {
            getStoreById(id).then(storeData => {
                setStore({
                    name: storeData.name || "",
                    description: storeData.description || ""
                })
            })
        }
    }, [id, profile])

    const updateStore = () => {
        const updatedStore = {
            name: store.name,
            description: store.description
        }

        editStore(id, updatedStore).then(() => {
            router.push(`/stores/${id}`)
        })
    }

    return (
        <Container>
            <Box>
            <Heading>Edit Store</Heading>
            <Box>
                <Text>Name: </Text>
                <TextField.Root
                    id="name"
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={store?.name || ""}
                    onChange={(e) => setStore(prev => ({ ...prev, name: e.target.value}))}
                />
            </Box>
            <Box>
                <Text>Description: </Text>
                <TextField.Root 
                    id="description"
                    placeholder="Description"
                    type="text"
                    name="description"
                    value={store?.description || ""}
                    onChange={(e) => setStore(prev => ({ ...prev, description: e.target.value}))}
                />
            </Box>
            <Box>
                <Button m="4" onClick={updateStore}>Save</Button>
                <Button m="4" onClick={() => router.back()}>Cancel</Button>
            </Box>
            </Box>
        </Container>
    )
}

EditStore.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar/>
            {page}
        </Layout>
    )
}