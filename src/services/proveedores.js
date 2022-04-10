
const saveProveedor = async (data) => {
    let response = await fetch("http://localhost:5000/api/proveedor/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    })

    let result = await response.json()
    return result
}


export { saveProveedor }