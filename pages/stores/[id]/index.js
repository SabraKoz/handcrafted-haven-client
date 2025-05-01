import { useRouter } from "next/router";
import { useAppContext } from "../../../context/state";
import { useEffect, useState } from "react";
import { getStoreById } from "../../../data/stores";
import { Box, Container, Heading, Text } from "@radix-ui/themes";
import { ProductCard } from "../../../components/productcard";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";
import { deleteProduct } from "../../../data/products";


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

    return (
        <Container>
            <Box>
                <Heading>{store.name}</Heading>
                <Text>{store.description}</Text>
                <Text>Creator: {store.owner_name}</Text>
                <Box>
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