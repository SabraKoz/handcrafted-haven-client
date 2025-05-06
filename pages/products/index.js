import { Box, Card, Container, Flex, Grid, Heading, Select, Text } from "@radix-ui/themes";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";
import { getAllCategories, getAllProducts } from "../../data/products";
import { ProductCard } from "../../components/ProductCard";

export default function Products() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [sortOrder, setSortOrder] = useState("")

    useEffect(() => {
        getAllCategories().then(data => {
            setCategories(data)
        })

        let query = ""

        if (selectedCategory) {
            query += `?category=${selectedCategory}`
        }

        if (sortOrder) {
            query += selectedCategory ? `&sort=${sortOrder}` : `?sort=${sortOrder}`
        }

        if (query) {
            fetch(`http://localhost:8000/products${query}`)
                .then(res => res.json())
                .then(data => setProducts(data))
        } else {
            getAllProducts().then(data => {
                setProducts(data)
            })
        }
    }, [selectedCategory, sortOrder])

    return (
        <Container>
            <Card m="5" style={{ padding: "20px", backgroundColor: "#BAC5BE", borderRadius: "10px", boxShadow: "2px 2px 10px gray" }}>
            <Heading m="5" align="center" size="8" weight="bold" style={{ color: "teal", textShadow: "1px 1px 2px black" }}>Products</Heading>
            <Flex justify="between" align="center" m="7">
                <Box>
                    <Text size="4" weight="medium" m="3">Filter by Category: </Text>
                    <Select.Root defaultValue="all" onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)} >
                        <Select.Trigger style={{backgroundColor: "#f5e8d5"}}>
                            {selectedCategory ? categories.find(category => category.id === selectedCategory)?.name : "Select a category"}
                        </Select.Trigger>
                        <Select.Content style={{backgroundColor: "#f5e8d5"}}>
                            <Select.Group >
                                <Select.Item value="all" >Select a Category</Select.Item>
                                {categories.map(category => (
                                    <Select.Item key={category.id} value={category.id}>
                                        {category.name}
                                    </Select.Item>
                                ))}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </Box>
                <Box>
                    <Text size="4" weight="medium" m="3" >Filter by Price: </Text>
                    <Select.Root defaultValue="all" onValueChange={(value) => setSortOrder(value === "all" ? null : value)}>
                        <Select.Trigger style={{backgroundColor: "#f5e8d5"}}>
                            {sortOrder ? (sortOrder === "low" ? "Price: Low to High" : "Price: High to Low") : "Sort by Price"}
                        </Select.Trigger>
                        <Select.Content style={{backgroundColor: "#f5e8d5"}}>
                            <Select.Group>
                                <Select.Item value="all">Sort by Price</Select.Item>
                                <Select.Item value="low">Price: Low to High</Select.Item>
                                <Select.Item value="high">Price: High to Low</Select.Item>
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </Box>
            </Flex>
            <Grid columns="4" gap="3">
                {products.map(product => (
                    <ProductCard product={product} key={product.id} img_src={product.image_path} />
                ))}
            </Grid>
            </Card>
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