import { AlertDialog, Box, Button, Card, Container, Heading, Select, Text, TextField } from "@radix-ui/themes";
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
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

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

         if (product.name && product.description && product.price && product.quantity && product.category) {
         addProduct(product).then(res => {
            router.push(`/products/${res.id}`)
         })
        } else {setIsAlertDialogOpen(true)}
       }

    return (
        <Container>
            <Card m="5" style={{ padding: "20px", backgroundColor: "#BAC5BE", borderRadius: "10px", boxShadow: "0 0 20px black" }}>
            <Heading m="5" align="center" size="8" weight="bold" style={{ textShadow: "2px 2px 3px teal" }}>Add New Product</Heading>
            <Box m="3">
                <Text>Name: </Text>
                <TextField.Root
                    id="productName"
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={product.productName}
                    style={{ backgroundColor: "#f5e8d5"}} m="3"
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
                    style={{ backgroundColor: "#f5e8d5"}} m="3"
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
                    style={{ backgroundColor: "#f5e8d5"}} m="3"
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
                    style={{ backgroundColor: "#f5e8d5"}} m="3"
                     />
            </Box>
            <Box m="3">
                <Text>Category: </Text>
                <Select.Root 
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}>
                    <Select.Trigger placeholder="Select Category" style={{ backgroundColor: "#f5e8d5"}} />
                    <Select.Content style={{ backgroundColor: "#f5e8d5"}}>
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
                    style={{ backgroundColor: "#f5e8d5"}} m="3"
                     />
                {product.id && <TextField.Root type="hidden" name="product" value={product.id} />}
                {productImage && (
                    <Box>
                        <img src={productImage} alt="product image preview" style={{ maxWidth: "200px" }} />
                    </Box>
                )}
            </Box>

            <Box m="3" align="center">
                <Button m="4" onClick={saveProduct}>Save</Button>
                <Button m="4" color="red" onClick={() => router.back()}>Cancel</Button>
            </Box>

            <AlertDialog.Root open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                <AlertDialog.Content style={{ backgroundColor: "#f5e8d5"}}>
                    <AlertDialog.Title m="3" align="center">Missing Information</AlertDialog.Title>
                    <AlertDialog.Description m="3" align="center">Please Complete all fields</AlertDialog.Description>
                    <Box align="center" m="3">
                        <AlertDialog.Cancel>
                            <Button  onClick={() => setIsAlertDialogOpen(false)} >Continue</Button>
                        </AlertDialog.Cancel>
                    </Box>
                </AlertDialog.Content>
            </AlertDialog.Root>

            </Card>
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