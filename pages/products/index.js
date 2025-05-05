import { Box, Container, Grid, Heading } from "@radix-ui/themes";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";
import { getAllCategories, getAllProducts } from "../../data/products";
import { ProductCard } from "../../components/ProductCard";

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
            <Heading m="5" align="center" size="8" weight="bold" style={{ color: "skyblue", textShadow: "2px 2px 2px gray"}}>Products</Heading>
            <Grid columns="4" gap="3">
                {products.map(product => (
                    <ProductCard product={product} key={product.id} img_src={product.image_path} />
                ))}
            </Grid>
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