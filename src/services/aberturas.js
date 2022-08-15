// Traer Aberturas
const getAllAberturas = async () => {
    let response = await fetch("http://localhost:5000/api/abertura/", {
        method: 'GET',
    })

    let result = await response.json()
    return result
}

// Guardar Abertura
const saveAbertura = async (data) => {
    let response = await fetch("http://localhost:5000/api/abertura/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    })

    let result = await response.json()
    return result
}

// Eliminar Abertura
const deleteAbertura = async (id) => {
    let response = await fetch(`http://localhost:5000/api/abertura/${id}`, {
        method: 'DELETE',
    })

    let result = await response.json()
    return result
}

// Actualizar Abertura
const updateAbertura = async (entidad) => {
    const { _id, ...others } = entidad
    // console.log(entidad)
    let response = await fetch(`http://localhost:5000/api/abertura/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(others),
    })

    let result = await response.json()
    return result
}

export { saveAbertura, getAllAberturas, deleteAbertura, updateAbertura }