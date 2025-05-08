export function getPayments() {
    return fetch(`http://localhost:8000/payments`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export function addPayment(payment) {
    return fetch(`http://localhost:8000/payments`, {
        method: "POST",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payment)
    }).then(res => res.json())
}

