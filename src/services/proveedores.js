// Traer Proveedores
const getAllProveedores = async () => {
    let response = await fetch("http://localhost:5000/api/proveedor/", {
        method: 'GET',
    })

    let result = await response.json()
    return result
}

// Get Proveedor By Categoria
const getByCategoria = async (categoria) => {
    let response = await fetch(`http://localhost:5000/api/proveedor/?categoria=${categoria}`, {
        method: 'GET',
    })

    let result = await response.json()
    return result
}


// Guardar Proveedor
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

// Eliminar Proveedor
const deleteProveedor = async (id) => {
    let response = await fetch(`http://localhost:5000/api/proveedor/${id}`, {
        method: 'DELETE',
    })

    let result = await response.json()
    return result
}

// Actualizar Proveedor
const updateProveedor = async (entidad) => {
    const { _id, ...others } = entidad
    let response = await fetch(`http://localhost:5000/api/proveedor/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(others),
    })

    let result = await response.json()
    return result
}

export { saveProveedor, getAllProveedores, deleteProveedor, updateProveedor,getByCategoria }