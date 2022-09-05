// Traer Accesorios
const getAllAccesorios = async () => {
    let response = await fetch("http://localhost:5000/api/accesorio/", {
        method: 'GET',
    })

    let result = await response.json()
    return result
}

// Guardar Accesorio
const saveAccesorio = async (data) => {
    let response = await fetch("http://localhost:5000/api/accesorio/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    })

    let result = await response.json()
    return result
}

// Eliminar Accesorio
const deleteAccesorio = async (id) => {
    let response = await fetch(`http://localhost:5000/api/accesorio/${id}`, {
        method: 'DELETE',
    })

    let result = await response.json()
    return result
}

// Actualizar Accesorio
const updateAccesorio= async (entidad) => {
    console.log()
    const { _id, ...others } = entidad
    let response = await fetch(`http://localhost:5000/api/accesorio/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(others),
    })

    let result = await response.json()
    return result
}


// Actualizar Accesorio
const updateAccesorioLote= async (porcentaje) => {
    let response = await fetch(`http://localhost:5000/api/accesorio/updateall/${porcentaje}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    })

    let result = await response.json()
    return result
}
export { saveAccesorio, getAllAccesorios, deleteAccesorio, updateAccesorio,updateAccesorioLote}