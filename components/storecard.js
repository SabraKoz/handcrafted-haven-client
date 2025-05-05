import { Card, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";


export function StoreCard({ store }) {

    return (
        <Card m="2" style={{
            backgroundColor: "skyblue",
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
        }}
        onMouseEnter={(event) => {
            event.currentTarget.style.transform = "scale(1.01)";
            event.currentTarget.style.boxShadow = "0px 0px 20px gray"
        }}
        onMouseLeave={(event) => {
            event.currentTarget.style.transform = "scale(1)";
            event.currentTarget.style.boxShadow = "none"
        }}>
            <Heading>
                <Link href={`stores/${store.id}`} style={{ textDecoration: "none", color: "black" }}>{store.name}</Link>
            </Heading>
            <Text as="div" style={{ color: "black" }}>Owner: {store.owner_name}</Text>
            <Text as="div" style={{ color: "black" }}>{store.description}</Text>
        </Card>
    )
}