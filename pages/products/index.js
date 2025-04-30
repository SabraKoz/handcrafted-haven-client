import { Box, Container, Heading } from "@radix-ui/themes";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";
import { getAllCategories, getAllProducts } from "../../data/products";
import { ProductCard } from "../../components/productcard";


export default function Products() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories().then(data => {
            setCategories(data)
        })
        getAllProducts().then(data => {
            setProducts(data)
        })
    }, [])

    return (
        <Container>
            <Heading m="5">Products</Heading>
            <Box>
                {products.map(product => (
                    <ProductCard product={product} key={product.id} img_src={`http://localhost:8000${product.image_path}`} />
                ))}
            </Box>
        </Container>
    )
}

Products.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}