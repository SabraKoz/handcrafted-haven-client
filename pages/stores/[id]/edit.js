import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { editStore, getStoreById } from "../../../data/stores";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";
import { Container, Heading } from "@radix-ui/themes";

export default function EditStore() {
    const [store, setStore] = useState({})
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id) {
            getStoreById(id).then(storeData => {
                setStore(storeData)
            })
        }
    }, [id])

    const saveStore = () => {
        editStore({
            id: store.id,
            name: name.current.value,
            description: description.current.value
        }).then(() => {
            router.push(`/stores/${store.id}`)
        })
    }

    return (
        <Container>
            <Heading>Edit Store</Heading>
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