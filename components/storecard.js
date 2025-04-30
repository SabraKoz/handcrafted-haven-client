import { Card, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";


export function StoreCard({ store }) {

    return (
        <Card>
            <Heading>
                <Link href={`stores/${store.id}`}>{store.name}</Link>
            </Heading>
            <Text>{store.description}</Text>
        </Card>
    )
}