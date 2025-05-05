import { Box, Button, Container, Heading, Select, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { addProduct, getAllCategories } from "../../data/products";


export default function NewProduct(product = {}) {
    const router = useRouter()
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [productImage, setProductImage] = useState(null)

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
        getAllCategories().then(data => setCategories(data))
    }, [])

    const saveProduct = () => {
         const product = {
            name: productName.value,
            description: description.value,
            price: price.value,
            quantity: quantity.value,
            category: selectedCategory
         }

         if (productImage) {
            product.image_path = productImage
         }

         addProduct(product).then(res => {
            router.push(`/products/${res.id}`)
         })
       }

    return (
        <Container>
            <Box>
            <Heading m="5" align="center" size="8" weight="bold" style={{ color: "skyblue", textShadow: "2px 2px 2px gray"}}>Add New Product</Heading>
            <Box m="3">
                <Text>Name: </Text>
                <TextField.Root
                    id="productName"
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={product.productName}
                />
            </Box>
            <Box m="3">
                <Text>Description: </Text>
                <TextField.Root
                    id="description"
                    placeholder="Description"
                    type="text"
                    name="description"
                    value={product.description}
                     />
            </Box>
            <Box m="3">
                <Text>Price: </Text>
                <TextField.Root
                    id="price"
                    placeholder="Price"
                    type="number"
                    name="price"
                    value={product.price}
                     />
            </Box>
            <Box m="3">
                <Text>Quantity: </Text>
                <TextField.Root
                    id="quantity"
                    placeholder="Quantity"
                    type="number"
                    name="quantity"
                    value={product.quantity}
                     />
            </Box>
            <Box m="3">
                <Text>Category: </Text>
                <Select.Root 
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}>
                    <Select.Trigger placeholder="Select Category" />
                    <Select.Content>
                        <Select.Group>
                            {categories.map(category => {
                                return (<Select.Item value={category.id} key={category.id}>{category.name}</Select.Item>)
                            })}
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </Box>
            <Box m="3">
                <Text>Image: </Text>
                <TextField.Root
                    type="file"
                    id="image_path"
                    onChange={createProductImageString}
                     />
                {product.id && <TextField.Root type="hidden" name="product" value={product.id} />}
                {productImage && (
                    <Box>
                        <img src={productImage} alt="product image preview" style={{ maxWidth: "200px" }} />
                    </Box>
                )}
            </Box>
            <Box>
                <Button m="4" onClick={saveProduct}>Save</Button>
                <Button m="4" color="red" onClick={() => router.back()}>Cancel</Button>
            </Box>
            </Box>
        </Container>
    )
}

NewProduct.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar/>
            {page}
        </Layout>
    )
}