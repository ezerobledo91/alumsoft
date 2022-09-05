// Traer Vidrios
const getAllVidrios = async () => {
    let response = await fetch("http://localhost:5000/api/vidrio/", {
        method: 'GET',
    })

    let result = await response.json()
    return result
}

// Guardar Vidrio
const saveVidrio = async (data) => {
    let response = await fetch("http://localhost:5000/api/vidrio/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    })

    let result = await response.json()
    return result
}

// Eliminar Vidrio
const deleteVidrio = async (id) => {
    let response = await fetch(`http://localhost:5000/api/vidrio/${id}`, {
        method: 'DELETE',
    })

    let result = await response.json()
    return result
}

// Actualizar Vidrio
const updateVidrio= async (entidad) => {
    const { _id, ...others } = entidad
    let response = await fetch(`http://localhost:5000/api/vidrio/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(others),
    })

    let result = await response.json()
    return result
}


// Actualizar Vidrio
const updateVidrioLote= async (porcentaje) => {
    let response = await fetch(`http://localhost:5000/api/vidrio/updateall/${porcentaje}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    })

    let result = await response.json()
    return result
}

export { saveVidrio, getAllVidrios, deleteVidrio, updateVidrio,updateVidrioLote}