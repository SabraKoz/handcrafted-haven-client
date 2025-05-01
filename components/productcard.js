import { Box, Button, Card, Heading, Inset } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/router";


export function ProductCard({ product, removeProduct, img_src, noButtons, isOwner = false }) {

    const router = useRouter()

    return (
        <Card>
            <Inset>
                <img src={img_src} style={{ width: "50%", height: "50%", borderRadius: "15px" }} />
            </Inset>
            <Heading><Link href={`/products/${product.id}`}>{product.name}</Link></Heading>
            <Box>
                ${product.price}
            </Box>
            <Box>
                {isOwner && !noButtons ? 
                <Box>
                    <Button m="2" onClick={() => router.push(`/products/${product.id}/edit`)}>Edit</Button>
                    <Button m="2" onClick={() => removeProduct(product.id)}>Delete</Button>
                </Box> : <></>}
            </Box>
        </Card>
    )
}