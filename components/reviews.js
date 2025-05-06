import { Box, Button, Card, Text, TextArea } from "@radix-ui/themes"
import { deleteReview, reviewProduct } from "../data/products"
import { useState } from "react"
import { FaTrash } from "react-icons/fa"
import { useAppContext } from "../context/state"

export default function Reviews({ product, refresh }) {
    const { profile } = useAppContext()
    const [newReview, setNewReview] = useState("")

    const saveReview = () => {
        const reviewObj = {
            review: newReview
        }

        reviewProduct(product.id, reviewObj).then(() => {
            setNewReview("")
            refresh()
        })
    }

    const removeReview = () => {
        deleteReview(product.id).then(() => {
            refresh()
        })
    }

    return (
        <Box m="9" style={{ padding: "30px", border: "2px solid teal", borderRadius: "10px", backgroundColor: "#f5e8d5" }}>
            <Text weight="bold" size="4">Reviews:</Text>
            <Box m="2">
                <TextArea
                    id="review"
                    placeholder="Review this product..."
                    type="text"
                    value={newReview}
                    onChange={(event) => setNewReview(event.target.value)}
                     />
                <Button onClick={saveReview} m="2" disabled={!newReview.trim()} >Post Review</Button>
            </Box>
            {product.reviews?.map(review => (
                        <Card key={review.id} m="2" style={{ border: "1px solid teal", backgroundColor: "#BAC5BE" }}>
                            <Box style={{ display: "flex", justifyContent: "space-between" }}><Text weight="medium">{review.user?.first_name}</Text></Box>
                            <Box m="2">"{review.review}"</Box>
                            {review.user?.id === profile?.id && (
                                <Button onClick={() => removeReview()} style={{ position: "absolute", right: "25px", top: "25px", backgroundColor: "red" }}><FaTrash /></Button>
                            )}
                        </Card>
                    ))}
        </Box>
    )
}