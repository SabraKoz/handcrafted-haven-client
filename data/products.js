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

