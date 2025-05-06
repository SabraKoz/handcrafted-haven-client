import { Box, Button, Card, Container, Heading, Text, TextField } from "@radix-ui/themes";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { useAppContext } from "../../context/state";
import { useRouter } from "next/router";
import { addStore } from "../../data/stores";


export default function NewStore(store = {}) {
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
            <Card m="5" style={{ padding: "20px", backgroundColor: "#BAC5BE", borderRadius: "10px", boxShadow: "2px 2px 10px gray" }}>
            <Heading m="5" align="center" size="8" weight="bold" style={{ color: "teal", textShadow: "1px 1px 2px black"}}>Create Your Store</Heading>
            <Box m="3">
                <Text>Name: </Text>
                <TextField.Root
                    id="storeName"
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={store.storeName}
                    style={{ backgroundColor: "#f5e8d5"}} m="3"
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
                    style={{ backgroundColor: "#f5e8d5"}} m="3"              
                />
            </Box>
            <Box m="3" align="center">
                <Button m="4" onClick={saveStore}>Save</Button>
                <Button m="4" color="red" onClick={() => router.back()}>Cancel</Button>
            </Box>
            </Card>
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