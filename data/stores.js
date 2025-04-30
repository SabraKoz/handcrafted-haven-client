export function getAllStores() {
    return fetch(`http://localhost:8000/stores`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export function getStoreById(id) {
    return fetch(`http://localhost:8000/stores/${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

