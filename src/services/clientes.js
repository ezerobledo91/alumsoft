// Traer Clientes
const getAllClientes = async () => {
    let response = await fetch("http://localhost:5000/api/cliente/", {
        method: 'GET',
    })

    let result = await response.json()
    return result
}

// Guardar Cliente
const saveCliente = async (data) => {
    let response = await fetch("http://localhost:5000/api/cliente/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    })

    let result = await response.json()
    return result
}

// Eliminar Cliente
const deleteCliente = async (id) => {
    let response = await fetch(`http://localhost:5000/api/cliente/${id}`, {
        method: 'DELETE',
    })

    let result = await response.json()
    return result
}

export { saveCliente, getAllClientes, deleteCliente }