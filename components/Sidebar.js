import { Box, Card, Flex } from "@radix-ui/themes";
import Link from "next/link";

export function Sidebar({ activePath, profile }) {
    const hasStore = profile?.store && profile.store?.id

    const links = [
        { path: "/profile", label: "Favorites" },
        { path: "/profile/cart", label: "Cart" },
        { path: "/profile/orders", label: "Order History" },
        { path: "/profile/payment", label: "Payment Methods" }
    ];

    if (hasStore) {
        links.push(
            { path: `/stores/${profile.store.id}`, label: "My Store" },
            { path: "/products/new", label: "Add New Product" }
        )
    } else {
        links.push({ path: "/stores/new", label: "Create Your Store" })
    }

    return (
        <Card style={{ backgroundColor: "#BAC5BE", paddingRight: "40px", height: "550px" }}>
            <Flex direction="column" gap="5" mt="7" ml="7">
                {links.map(({ path, label }) => (
                    <Link key={path} href={path} style={{ textDecoration: "none", color: "inherit" }}>
                        <Box
                            p="3"
                            style={{
                                borderLeft: activePath === path ? "3px solid teal" : "transparent",
                                fontWeight: activePath === path ? "bold" : "normal",
                                color: activePath === path ? "teal" : "inherit",
                                fontSize: activePath === path ? "18px" : "16px"
                            }}
                        >
                            {label}
                        </Box>
                    </Link>
                ))}
            </Flex>
        </Card>
    );
}