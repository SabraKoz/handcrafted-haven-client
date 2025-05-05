import { AlertDialog, Box, Button, Card, Heading, Inset } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/router";


export function ProductCard({ product, removeProduct, img_src, noButtons, isOwner = false }) {

    const router = useRouter()

    return (
        <Card m="2" style={{
            backgroundColor: "",
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
        }}
            onMouseEnter={(event) => {
                event.currentTarget.style.transform = "scale(1.01)";
                event.currentTarget.style.boxShadow = "0px 0px 20px skyblue"
            }}
            onMouseLeave={(event) => {
                event.currentTarget.style.transform = "scale(1)";
                event.currentTarget.style.boxShadow = "none"
            }}
        >
            <Inset>
                <img src={img_src} style={{ width: "100%", height: "100%", borderRadius: "15px" }} />
            </Inset>
            <Heading mt="2"><Link href={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>{product.name}</Link></Heading>
            <Box>
                ${product.price}
            </Box>
            <Box>
                {isOwner && !noButtons ?
                    <Box>
                        <Button m="3" onClick={() => router.push(`/products/${product.id}/edit`)}>Edit</Button>
                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <Button m="3">Delete</Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content>
                                <AlertDialog.Title>Delete Product</AlertDialog.Title>
                                <AlertDialog.Description>Are you sure you want to permanently delete "{product.name}"?</AlertDialog.Description>
                                <Box>
                                    <AlertDialog.Cancel>
                                        <Button m="3">Cancel</Button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action>
                                        <Button m="3" color="red" onClick={() => removeProduct(product.id)}>Delete</Button>
                                    </AlertDialog.Action>
                                </Box>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                    </Box> : <></>}
            </Box>
        </Card>
    )
}