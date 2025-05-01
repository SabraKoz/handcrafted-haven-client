export function getOrders() {
    return fetch(`http://localhost:8000/orders`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export function completeCurrentOrder(orderId, paymentId) {
    return fetch(`http://localhost:8000/orders/${orderId}`, {
        method: "PUT",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"payment": paymentId})
    }).then(res => {
        if (res.status === 204) {
            return null
        }
        return res.text()
    })
}

export function getCart() {
    return fetch(`http://localhost:8000/orders/cart`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export function addProductToOrder(id) {
    return fetch(`http://localhost:8000/orders/cart`, {
        method: "POST",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"product": id})
    }).then(res => res.json())
}

export function removeProductFromOrder(id) {
    return fetch(`http://localhost:8000/orders/cart/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    }).then(res => {
        if (res.status === 204) {
            return null
        }
        return res.text()
    })
}
