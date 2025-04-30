import { Container, Heading } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProductById } from "../../../data/products";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";


export default function ProductDetail() {
    const router = useRouter()
    const { id } = router.query
    const [product, setProduct] = useState({})

    const refresh = () => {
        getProductById(id).then(data => {
            if(data) {
                setProduct(data)
            }
        })
    }

    useEffect(() => {
        if (id) {
            refresh()
        }
    }, [id])

    return (
        <Container>
            <Heading>{product.name}</Heading>
        </Container>
    )
}

ProductDetail.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar/>
            {page}
        </Layout>
    )
}