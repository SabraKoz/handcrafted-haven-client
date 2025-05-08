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

export function addStore(store) {
    return fetch(`http://localhost:8000/stores`, {
        method: "POST",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(store)
    }).then(res => res.json())
}

export function editStore(id, store) {
    return fetch(`http://localhost:8000/stores/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(store)
    }).then(res => {
        if (res.status === 204) {
            return null
        }
        return res.text()
    })
}
