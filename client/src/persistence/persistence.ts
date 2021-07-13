export const requestToken = (email: string, password: string) => {
    console.log(email, password);

    return fetch('http://localhost:8080/api/v0/authenticate', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(res => res.json());
};
