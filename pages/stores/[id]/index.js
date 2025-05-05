import { useRouter } from "next/router";
import { useAppContext } from "../../../context/state";
import { useEffect, useState } from "react";
import { getStoreById } from "../../../data/stores";
import { Box, Button, Container, Dialog, Flex, Grid, Heading, Link, Text } from "@radix-ui/themes";
import { ProductCard } from "../../../components/ProductCard";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";
import { deleteProduct } from "../../../data/products";
import StoreOwnerButtons from "../../../components/StoreOwnerButtons";


export default function StoreDetail() {
    const { profile } = useAppContext()
    const router = useRouter()
    const { id } = router.query
    const [store, setStore] = useState({})
    const [isOwner, setIsOwner] = useState(false)

    const refresh = () => {
        getStoreById(id).then(storeData => {
            if (storeData) {
                setStore(storeData)
            }
        })
    }

    useEffect(() => {
        if (id) {
          refresh()
        }
        if (parseInt(id) === profile.store?.id) {
            setIsOwner(true)
        }
    }, [id, profile])

    const removeProduct = (productId) => {
        deleteProduct(productId).then(refresh)
    }

    const ownerButtons = () => {
        return (
            <StoreOwnerButtons store={store} id={id} profile={profile} refresh={refresh} />
        )
    }

    return (
        <Container>
            <Box m="2">
                <Heading m="5" align="center" size="8" weight="bold" style={{ color: "skyblue", textShadow: "2px 2px 2px gray"}}>{store.name}</Heading>
                {isOwner ? ownerButtons() : ""}
                <Text m="2">{store.description}</Text>
                <Text m="2">Creator: {store.owner_name}</Text>
                <Grid columns="4" gap="3">
                    {store.store_products?.map(product => (
                        <ProductCard 
                            product={product} 
                            key={product.id} 
                            isOwner={isOwner} 
                            removeProduct={removeProduct}
                            noButtons={false}
                            img_src={`http://localhost:8000${product.image_path}`} 
                            />
                    ))}
                </Grid>
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