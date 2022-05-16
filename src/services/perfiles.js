// Traer Perfiles
const getAllPerfiles = async () => {
    let response = await fetch("http://localhost:5000/api/perfil/", {
        method: 'GET',
    })

    let result = await response.json()
    return result
}

// Guardar Perfil
const savePerfil = async (data) => {
    let response = await fetch("http://localhost:5000/api/perfil/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    })

    let result = await response.json()
    return result
}

// Eliminar Perfil
const deletePerfil = async (id) => {
    let response = await fetch(`http://localhost:5000/api/perfil/${id}`, {
        method: 'DELETE',
    })

    let result = await response.json()
    return result
}

// Actualizar Perfil
const updatePerfil = async (entidad) => {
    console.log()
    const { _id, ...others } = entidad
    let response = await fetch(`http://localhost:5000/api/perfil/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(others),
    })

    let result = await response.json()
    return result
}

export { savePerfil, getAllPerfiles, deletePerfil, updatePerfil }