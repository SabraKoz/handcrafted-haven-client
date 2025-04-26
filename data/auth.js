export function login(user) {
    return fetch(`http://localhost:8000/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}

export function register(user) {
    return fetch(`http://localhost:8000/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}

export function getUserProfile() {
    return fetch(`http://localhost:8000/profile`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    })
}