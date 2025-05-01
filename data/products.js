export function getAllProducts() {
    return fetch(`http://localhost:8000/products`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export function getAllCategories() {
    return fetch(`http://localhost:8000/productcategories`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export function getProductById(id) {
    return fetch(`http://localhost:8000/products/${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export function addProduct(product) {
    return fetch(`http://localhost:8000/products`, {
        method: "POST",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    }).then(res => res.json())
}

export function editProduct(id, product) {
    return fetch(`http://localhost:8000/products/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    }).then(res => {
        if (res.status === 204) {
            return null
        }
        return res.text()
    })
}

export function deleteProduct(id) {
    return fetch(`http://localhost:8000/products/${id}`, {
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

export function reviewProduct(productId, review) {
    return fetch(`http://localhost:8000/products/${productId}/review`, {
        method: "POST",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    }).then(res => res.json())
}

export function favoriteProduct(productId) {
    return fetch(`http://localhost:8000/products/${productId}/favorite`, {
        method: "POST",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.status === 201) {
            return null
        }
        return res.text()
    })
}

export function unfavoriteProduct(productId) {
    return fetch(`http://localhost:8000/products/${productId}/favorite`, {
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

export function getFavoritedProducts() {
    return fetch(`http://localhost:8000/products/favorited`, {
        method: "GET",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}
