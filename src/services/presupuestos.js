// Traer Presupuestos
const getAllPresupuestos = async () => {
    let response = await fetch("http://localhost:5000/api/presupuesto/", {
        method: 'GET',
    })

    let result = await response.json()
    return result
}

// Guardar Presupuesto
const savePresupuesto = async (data) => {
    let response = await fetch("http://localhost:5000/api/presupuesto/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    })

    let result = await response.json()
    return result
}

// Eliminar Presupuesto
const deletePresupuesto = async (id) => {
    let response = await fetch(`http://localhost:5000/api/presupuesto/${id}`, {
        method: 'DELETE',
    })

    let result = await response.json()
    return result
}

// Actualizar Presupuesto
const updatePresupuesto = async (entidad) => {
    const { _id, ...others } = entidad
    // console.log(entidad)
    let response = await fetch(`http://localhost:5000/api/presupuesto/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(others),
    })

    let result = await response.json()
    return result
}

export { savePresupuesto, getAllPresupuestos, deletePresupuesto, updatePresupuesto}