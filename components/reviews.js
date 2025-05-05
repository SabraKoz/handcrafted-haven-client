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
        <Box m="9" style={{ padding: "30px", border: "3px solid skyblue", borderRadius: "10px" }}>
            <Text weight="medium">Reviews:</Text>
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
                        <Card key={review.id} m="2">
                            <Box style={{ display: "flex", justifyContent: "space-between" }}><Text weight="bold">{review.user?.first_name}</Text></Box>
                            <Box m="2">"{review.review}"</Box>
                            {review.user?.id === profile?.id && (
                                <Button onClick={() => removeReview()} style={{ position: "absolute", right: "25px", top: "25px", backgroundColor: "red" }}><FaTrash /></Button>
                            )}
                        </Card>
                    ))}
        </Box>
    )
}