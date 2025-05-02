import { Box, Button, Container, Heading, Text, TextField } from "@radix-ui/themes";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { useAppContext } from "../../context/state";
import { useRouter } from "next/router";
import { addStore } from "../../data/stores";


export default function NewStore() {
    const { profile, setProfile } = useAppContext()
    const router = useRouter()

    const saveStore = () => {
        const store = {
            name: storeName.value,
            description: description.value
        }

        addStore(store).then(res => {
            setProfile({ ...profile, store: res })
            router.push(`/stores/${res.id}`)
        })
    }

    return (
        <Container>
            <Box>
            <Heading>Create Your Store</Heading>
            <Box>
                <Text>Name: </Text>
                <TextField.Root
                    id="storeName"
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={store.storeName}
                />
            </Box>
            <Box>
                <Text>Description: </Text>
                <TextField.Root
                    id="description"
                    placeholder="Description"
                    type="text"
                    name="description"
                    value={store.description}                
                />
            </Box>
            <Box>
                <Button m="4" onClick={saveStore}>Save</Button>
                <Button m="4" onClick={() => router.back()}>Cancel</Button>
            </Box>
            </Box>
        </Container>
    )
}

NewStore.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar/>
            {page}
        </Layout>
    )
}