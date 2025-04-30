import { useRouter } from "next/router";
import { useAppContext } from "../../../context/state";
import { useEffect, useState } from "react";
import { getStoreById } from "../../../data/stores";
import { Box, Container, Heading, Text } from "@radix-ui/themes";
import { ProductCard } from "../../../components/productcard";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";


export default function StoreDetail() {
    const router = useRouter()
    const { id } = router.query
    const [store, setStore] = useState({})
    const [isOwner, setIsOwner] = useState(false)

    useEffect(() => {
        if (id) {
            getStoreById(id).then(storeData => {
                if (storeData) {
                    setStore(storeData)
                }
            })
        }
    }, [id])

    return (
        <Container>
            <Box>
                <Heading>{store.name}</Heading>
                <Text>{store.description}</Text>
                <Text>Creator: {store.owner_name}</Text>
                <Box>
                    {store.store_products?.map(product => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </Box>
            </Box>
        </Container>
    )
}

StoreDetail.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar/>
            {page}
        </Layout>
    )
}