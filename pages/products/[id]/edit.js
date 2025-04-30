import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/state";
import { editProduct, getAllCategories, getProductById } from "../../../data/products";
import { Box, Button, Container, Heading, Select, Text, TextField } from "@radix-ui/themes";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";


export default function EditProduct() {
    const router = useRouter()
    const [product, setProduct] = useState({})
    const { profile } = useAppContext()
    const { id } = router.query
    const [productImage, setProductImage] = useState(null)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    useEffect(() => {
        if (id && profile) {
            getProductById(id).then(data => {
                setProduct({
                    name: data.name || "",
                    description: data.description || "",
                    price: data.price || "",
                    quantity: data.quantity || "",
                    category: data.category || ""
                })
            })
        }
    }, [id, profile])

    useEffect(() => {
        if (product?.category) {
            setSelectedCategory(product.category.id)
        }
    }, [product])

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createProductImageString = (event) => {
        if (event.target.files && event.target.files[0]) {
            getBase64(event.target.files[0], (base64ImageString) => {
                setProductImage(base64ImageString)
            })
        }
    }

    useEffect(() => {
        getAllCategories().then(catData => setCategories(catData))
    }, [])

    const updateProduct = () => {
        const updatedProduct = {
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            category: selectedCategory
        }

        if (productImage) {
            product.image_path = productImage
        }

        editProduct(id, updatedProduct).then(() => {
            router.push(`/products/${id}`)
        })
    }

    return (
        <Container>
            <Box>
                <Heading>Edit Product</Heading>
                <Box>
                    <Text>Name: </Text>
                    <TextField.Root
                        id="name"
                        placeholder="Name"
                        type="text"
                        name="name"
                        value={product?.name || ""}
                        onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
                    />
                </Box>
                <Box>
                    <Text>Description: </Text>
                    <TextField.Root
                        id="description"
                        placeholder="Description"
                        type="text"
                        name="description"
                        value={product?.description || ""}
                        onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
                    />
                </Box>
                <Box>
                    <Text>Price: </Text>
                    <TextField.Root
                        id="price"
                        placeholder="Price"
                        type="number"
                        name="price"
                        value={product?.price || ""}
                        onChange={(e) => setProduct(prev => ({ ...prev, price: e.target.value }))}
                    />
                </Box>
                <Box>
                    <Text>Quantity: </Text>
                    <TextField.Root
                        id="quantity"
                        placeholder="Quantity"
                        type="number"
                        name="quantity"
                        value={product?.quantity || ""}
                        onChange={(e) => setProduct(prev => ({ ...prev, quantity: e.target.value }))}
                    />
                </Box>
                <Box>
                    <Text>Category: </Text>
                    <Select.Root
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}>
                        <Select.Trigger />
                        <Select.Content>
                            <Select.Group>
                                {categories.map(category => {
                                    return (<Select.Item value={category.id} key={category.id}>{category.name}</Select.Item>)
                                })}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </Box>
                <Box>
                    <Text>Image: </Text>
                    <TextField.Root
                        type="file"
                        id="image_path"
                        onChange={createProductImageString}
                    />
                    {product?.id && <TextField.Root type="hidden" name="product" value={product.id} />}
                    {productImage && (
                        <Box>
                            <img src={productImage} alt="product image preview" style={{ maxWidth: "200px" }} />
                        </Box>
                    )}
                </Box>
                <Box>
                    <Button m="4" onClick={updateProduct}>Save</Button>
                    <Button m="4" onClick={() => router.back()}>Cancel</Button>
                </Box>
            </Box>
        </Container>
    )
}

EditProduct.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}