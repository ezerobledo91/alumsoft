// Traer Grupos
const getAllGrupos = async () => {
    let response = await fetch("http://localhost:5000/api/grupo/", {
        method: 'GET',
    })

    let result = await response.json()
    return result
}

// Guardar Grupo
const saveGrupo = async (data) => {
    let response = await fetch("http://localhost:5000/api/grupo/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    })

    let result = await response.json()
    return result
}

// Eliminar Grupo
const deleteGrupo = async (id) => {
    let response = await fetch(`http://localhost:5000/api/grupo/${id}`, {
        method: 'DELETE',
    })

    let result = await response.json()
    return result
}

// Actualizar Grupo
const updateGrupo = async (entidad) => {
    console.log()
    const { _id, ...others } = entidad
    let response = await fetch(`http://localhost:5000/api/grupo/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(others),
    })

    let result = await response.json()
    return result
}

export { saveGrupo, getAllGrupos, deleteGrupo, updateGrupo }