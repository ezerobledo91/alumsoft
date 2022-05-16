// Traer Piezas
const getAllPiezas = async () => {
    let response = await fetch("http://localhost:5000/api/pieza/", {
        method: 'GET',
    })

    let result = await response.json()
    return result
}

// Guardar Pieza
const savePieza = async (data) => {
    let response = await fetch("http://localhost:5000/api/pieza/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    })

    let result = await response.json()
    return result
}

// Eliminar Pieza
const deletePieza = async (id) => {
    let response = await fetch(`http://localhost:5000/api/pieza/${id}`, {
        method: 'DELETE',
    })

    let result = await response.json()
    return result
}

// Actualizar Pieza
const updatePieza = async (entidad) => {
    console.log()
    const { _id, ...others } = entidad
    let response = await fetch(`http://localhost:5000/api/pieza/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(others),
    })

    let result = await response.json()
    return result
}

export { savePieza, getAllPiezas, deletePieza, updatePieza }