import { Box, Card, Heading, Inset } from "@radix-ui/themes";
import Link from "next/link";


export function ProductCard({ product, img_src, noButtons }) {

    return (
        <Card>
            <Inset>
                <img src={img_src} />
            </Inset>
            <Heading>{product.name}</Heading>
            <Box>
                {noButtons ? <>
                    {product.name} - ${product.price}
                    </> :
                    <Link href={`/products/${product.id}`}>{product.name} - ${product.price}</Link>
                    }
            </Box>
        </Card>
    )
}